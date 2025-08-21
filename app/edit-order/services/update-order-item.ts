import { OrderItem } from "@/models";

type DialogState = {
  type: "dish" | "topping" | "drink";
  index: number;
} | null;

/**
 * Aktualisiert die OrderItems basierend auf dem aktuellen DialogState.
 */
export function updateOrderItem<K extends keyof OrderItem>(
  orderItems: OrderItem[],
  dialogState: DialogState,
  key: K,
  value: OrderItem[K] extends (infer U)[] ? U : OrderItem[K],
  append: boolean = false
): OrderItem[] {
  if (!dialogState) return orderItems;
  const index = dialogState.index;

  return orderItems.map((item, idx) => {
    if (idx !== index) return item;
    const currentValue = item[key];

    if (Array.isArray(currentValue) && append) {
      const exists = currentValue.some((v) => {
        if (typeof v === "object" && v !== null && typeof value === "object") {
          return (v as any).id === (value as any).id;
        }
        return v === value;
      });

      if (exists) {
        return {
          ...item,
          [key]: currentValue.filter((v) => {
            if (
              typeof v === "object" &&
              v !== null &&
              typeof value === "object"
            ) {
              return (v as any).id !== (value as any).id;
            }
            return v !== value;
          }) as OrderItem[K],
        };
      } else {
        return {
          ...item,
          [key]: [...currentValue, value] as OrderItem[K],
        };
      }
    } else {
      return {
        ...item,
        [key]: value,
      };
    }
  });
}
