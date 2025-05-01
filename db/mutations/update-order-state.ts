import { supabase } from "../supabase";
import { Enums } from "../types";

export async function updateOrderState(
  id: string,
  state: Enums<"OrderStatus">,
  refetch: () => void
) {
  const { error } = await supabase
    .from("orders")
    .update({ state: state })
    .eq("id", id);
  if (error) throw error;

  const { error: orderItemsError } = await supabase
    .from("order_items")
    .update({ state: state })
    .eq("order_id", id);
  if (orderItemsError) throw orderItemsError;

  refetch();
}
