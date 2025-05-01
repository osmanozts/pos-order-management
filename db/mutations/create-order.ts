import { OrderItem, Placement } from "@/models";
import { supabase } from "../supabase";
import { Database } from "../types";

function getLocalFormattedTimestamp() {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  const seconds = String(now.getSeconds()).padStart(2, "0");
  const milliseconds = String(now.getMilliseconds()).padStart(3, "0");

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}.${milliseconds}`;
}

export async function createOrder(
  orderItems: OrderItem[],
  placement: Placement
) {
  // 1. Bestellung erstellen
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert([
      { placement: placement.text, created_at: getLocalFormattedTimestamp() },
    ])
    .select("*")
    .single();

  if (orderError || !order) {
    console.error("Fehler beim Erstellen der Bestellung:", orderError);
    return;
  }

  // 2. OrderItems erstellen
  const orderItemsInserts = orderItems.map((item, index) => ({
    order_id: order.id,
    main_dish_id: item.main_dish?.id,
    note: item.note,
    index: index,
  }));

  const { data: orderItemsResult, error: orderItemsError } = await supabase
    .from("order_items")
    .insert(orderItemsInserts)
    .select("id");

  if (orderItemsError || !orderItemsResult) {
    console.error("Fehler beim Erstellen der Order Items:", orderItemsError);
    return;
  }

  // 3. Toppings und Drinks pro OrderItem verknüpfen
  await Promise.all(
    orderItems.map(async (item, index) => {
      const orderItemId = orderItemsResult[index].id;

      // Toppings einfügen
      if (item.toppings.length > 0) {
        const toppingRows = item.toppings.map((topping) => ({
          order_item_id: orderItemId,
          topping_id: topping.id,
        }));

        const { error: toppingError } = await supabase
          .from("order_item_toppings")
          .insert(toppingRows);

        if (toppingError) {
          console.error(
            `Fehler bei Toppings für OrderItem ${orderItemId}:`,
            toppingError
          );
        }
      }

      // Drinks einfügen
      if (item.drinks.length > 0) {
        const drinkRows = item.drinks.map((drink) => ({
          order_item_id: orderItemId,
          drink_id: drink.id,
        }));

        const { error: drinkError } = await supabase
          .from("order_item_drinks")
          .insert(drinkRows);

        if (drinkError) {
          console.error(
            `Fehler bei Drinks für OrderItem ${orderItemId}:`,
            drinkError
          );
        }
      }
    })
  );

  const { error: signalError } = await supabase
    .from("order_insert_done")
    .insert([{ order_id: order.id }]);

  if (signalError) {
    console.error("Fehler beim Signal für vollständige Order:", signalError);
  }
}
