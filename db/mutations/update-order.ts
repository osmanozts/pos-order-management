import { OrderItem, Placement } from "@/models";
import { createOrder } from "./create-order";
import { deleteOrder } from "./delete-order";

export async function updateOrder(
  orderId: string,
  orderItems: OrderItem[],
  placement: Placement,
) {
  if (!orderId) {
    console.error("updateOrder: orderId fehlt");
    return;
  }

  await deleteOrder(orderId);
  await createOrder(orderItems, placement);

  return { orderId };
}
