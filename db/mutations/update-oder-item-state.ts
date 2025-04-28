import { supabase } from "../supabase";
import { Enums } from "../types";

export async function updateOrderItemState(
  id: string,
  state: Enums<"OrderStatus">,
  refetch: () => void
) {
  const { error } = await supabase
    .from("order_items")
    .update({ state: state })
    .eq("id", id);
  if (error) throw error;
  else refetch();
}
