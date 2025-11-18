import { supabase } from "../supabase";

export async function deleteOrder(id: string, refetch?: () => void) {
  const { error } = await supabase.from("orders").delete().eq("id", id);
  if (error) throw error;
  if (refetch) refetch();
}
