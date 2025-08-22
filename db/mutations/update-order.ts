import { OrderItem, Placement } from "@/models";
import { supabase } from "../supabase";
import { Database } from "../types";

type OITInsert = Database["public"]["Tables"]["order_item_toppings"]["Insert"];
type OIDInsert = Database["public"]["Tables"]["order_item_drinks"]["Insert"];

export async function updateOrder(
  orderId: string,
  orderItems: OrderItem[],
  placement?: Placement,
) {
  console.log("orderItems: ", orderItems);
  if (!orderId) {
    console.error("updateOrder: orderId fehlt");
    return;
  }

  const { data: existingItems, error: existingItemsError } = await supabase
    .from("order_items")
    .select("id, index")
    .eq("order_id", orderId)
    .order("index", { ascending: true });

  if (existingItemsError) {
    console.error(
      "Fehler beim Laden bestehender OrderItems:",
      existingItemsError,
    );
    return;
  }

  const indexToOrderItemId = new Map<number, string>();
  (existingItems ?? []).forEach((row) => {
    if (row.index != null) indexToOrderItemId.set(row.index, row.id);
  });

  if (placement?.text) {
    const { error: updateOrderErr } = await supabase
      .from("orders")
      .update({ placement: placement.text })
      .eq("id", orderId);

    if (updateOrderErr) {
      console.error(
        "Fehler beim Aktualisieren der Order (placement):",
        updateOrderErr,
      );
      return;
    }
  }

  const ensuredOrderItemIds: string[] = [];

  for (let index = 0; index < orderItems.length; index++) {
    const item = orderItems[index];
    const existingId = indexToOrderItemId.get(index);

    if (existingId) {
      const { error: updErr } = await supabase
        .from("order_items")
        .update({
          main_dish_id: item.main_dish?.id ?? null,
          note: item.note ?? null,
          index,
        })
        .eq("id", existingId);

      if (updErr) {
        console.error(
          `Fehler beim Aktualisieren von order_item ${existingId}:`,
          updErr,
        );
        return;
      }

      ensuredOrderItemIds.push(existingId);
    } else {
      const { data: inserted, error: insErr } = await supabase
        .from("order_items")
        .insert({
          order_id: orderId,
          main_dish_id: item.main_dish?.id ?? null,
          note: item.note ?? null,
          index,
        })
        .select("id")
        .single();

      if (insErr || !inserted) {
        console.error("Fehler beim Anlegen eines neuen OrderItems:", insErr);
        return;
      }
      ensuredOrderItemIds.push(inserted.id);
    }
  }

  const targetOrderItemIds = ensuredOrderItemIds;
  let existingToppingsByItem = new Map<string, Set<string>>();
  let existingDrinksByItem = new Map<string, Set<number>>();

  if (targetOrderItemIds.length > 0) {
    const [
      { data: existingTops, error: topsErr },
      { data: existingDrs, error: drsErr },
    ] = await Promise.all([
      supabase
        .from("order_item_toppings")
        .select("order_item_id, topping_id")
        .in("order_item_id", targetOrderItemIds),
      supabase
        .from("order_item_drinks")
        .select("order_item_id, drink_id")
        .in("order_item_id", targetOrderItemIds),
    ]);

    if (topsErr || drsErr) {
      console.error(
        "Fehler beim Laden vorhandener Toppings/Drinks:",
        topsErr ?? drsErr,
      );
      return;
    }

    (existingTops ?? []).forEach((r) => {
      if (!r.order_item_id || !r.topping_id) return;
      if (!existingToppingsByItem.has(r.order_item_id)) {
        existingToppingsByItem.set(r.order_item_id, new Set());
      }
      existingToppingsByItem.get(r.order_item_id)!.add(r.topping_id);
    });

    (existingDrs ?? []).forEach((r) => {
      if (!r.order_item_id || r.drink_id == null) return;
      if (!existingDrinksByItem.has(r.order_item_id)) {
        existingDrinksByItem.set(r.order_item_id, new Set());
      }
      existingDrinksByItem.get(r.order_item_id)!.add(r.drink_id);
    });
  }

  const toppingInserts: OITInsert[] = [];
  const drinkInserts: OIDInsert[] = [];

  orderItems.forEach((item, idx) => {
    const orderItemId = ensuredOrderItemIds[idx];

    const haveTops =
      existingToppingsByItem.get(orderItemId) ?? new Set<string>();
    const haveDrs = existingDrinksByItem.get(orderItemId) ?? new Set<number>();

    if (item.toppings?.length) {
      item.toppings.forEach((t) => {
        if (!haveTops.has(t.id)) {
          toppingInserts.push({
            order_item_id: orderItemId,
            topping_id: t.id,
          });
        }
      });
    }

    if (item.drinks?.length) {
      item.drinks.forEach((d) => {
        if (!haveDrs.has(d.id as number)) {
          drinkInserts.push({
            order_item_id: orderItemId,
            drink_id: d.id as number,
          });
        }
      });
    }
  });

  if (toppingInserts.length > 0) {
    const { error } = await supabase
      .from("order_item_toppings")
      .insert(toppingInserts);
    if (error) {
      console.error("Fehler beim Ergänzen neuer Toppings:", error);
      return;
    }
  }

  if (drinkInserts.length > 0) {
    const { error } = await supabase
      .from("order_item_drinks")
      .insert(drinkInserts);
    if (error) {
      console.error("Fehler beim Ergänzen neuer Drinks:", error);
      return;
    }
  }

  const { error: signalError } = await supabase
    .from("order_insert_done")
    .insert([{ order_id: orderId }]);

  if (signalError) {
    console.error("Fehler beim Signal nach Update:", signalError);
  }

  return { orderId };
}
