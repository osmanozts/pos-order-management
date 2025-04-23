import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";
import { QueryData } from "@supabase/supabase-js";

const orders = supabase.from("orders").select(
  `
  placement,
  state,
  order_items(
  main_dish:main_dishes(name, price), 
  toppings:order_item_toppings(values:toppings(name, price)), 
  drinks:order_item_drinks(values:drinks(name, price)))
  `
);

const order = supabase
  .from("orders")
  .select(
    `
  placement,
  state,
  order_items(
  main_dish:main_dishes(name, price), 
  toppings:order_item_toppings(values:toppings(name, price)), 
  drinks:order_item_drinks(values:drinks(name, price)))
  `
  )
  .single();

export type Orders = QueryData<typeof orders>;
export type SingleOrder = QueryData<typeof order>;

const fetchOrders = async () => {
  const { data, error } = await orders;
  if (error) throw new Error(error.message);
  return data;
};

export const useOrders = () => {
  return useQuery({
    queryKey: ["orders"],
    queryFn: fetchOrders,
    staleTime: 1000 * 60 * 5,
  });
};
