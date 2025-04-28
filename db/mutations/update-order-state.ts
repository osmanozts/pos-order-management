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
  else refetch();
}
