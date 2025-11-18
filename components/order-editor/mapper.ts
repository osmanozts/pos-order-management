import { SingleOrder } from "@/db";
import { OrderFormItem, OrderFormState } from "./types";

function isNotNull<T>(value: T | null | undefined): value is T {
  return value !== null && value !== undefined;
}

export function toFormState(order: SingleOrder): OrderFormState {
  return {
    placement: { text: order.placement, icon: "none" },
    items: order.order_items.map<OrderFormItem>((oi) => ({
      id: oi.id,
      main_dish: oi.main_dish ?? null,
      toppings:
        oi.toppings?.map((t) => t.values ?? null).filter(isNotNull) ?? [],
      drinks:
        oi.drinks
          ?.map((d) => {
            const v = d.values;
            if (!v) return null;

            return {
              id: v.id,
              name: v.name,
              price: v.price,
              has_pfand: v.has_pfand ?? false,
              category: (v as any).category ?? null,
              created_at: (v as any).created_at ?? new Date().toISOString(),
            };
          })
          .filter(isNotNull) ?? [],
      note: oi.note ?? undefined,
    })),
  };
}
