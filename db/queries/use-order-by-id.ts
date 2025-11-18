// db/hooks/useOrderById.ts
import { QueryData } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { SingleOrder } from "./use-orders";


export async function fetchOrderById(id: string) {
  const { data, error } = await supabase
    .from("orders")
    .select(
      `
      id,
      placement,
      state,
      created_at,
      order_items:order_items!order_id(
        id,
        state,
        note,
        main_dish:main_dishes!main_dish_id(*),
        toppings:order_item_toppings!order_item_id(
          id,
          values: toppings!topping_id(*)
        ),
        drinks:order_item_drinks!order_item_id(
          id,
          values: drinks!drink_id(id, name, price, has_pfand)
        )
      )
    `,
    )
    .eq("id", id)
    .single();

  if (error) throw new Error(error.message);
  return data;
}

export type OrderById = QueryData<SingleOrder>;

export function useOrderById(id: string) {
  return useQuery({
    queryKey: ["orderById", id],
    enabled: !!id,
    queryFn: () => fetchOrderById(id),
  });
}
