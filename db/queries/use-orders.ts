import { QueryData } from "@supabase/supabase-js";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";

const orders = supabase
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
      main_dish:main_dishes!main_dish_id(id, name, price, size),
      toppings:order_item_toppings!order_item_id(
        id,
        values: toppings!topping_id(id, name, price)   
      ),
      drinks:order_item_drinks!order_item_id(
        id,
        values: drinks!drink_id(id, name, price, has_pfand)       
      )
    )
  `,
  )
  .order("index", { referencedTable: "order_items", ascending: true })
  .eq("state", "IN_PROGRESS");

const finsihedOrders = supabase
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
      main_dish:main_dishes!main_dish_id(id, name, price, size),
      toppings:order_item_toppings!order_item_id(
        id,
        values: toppings!topping_id(id, name, price)  
      ),
      drinks:order_item_drinks!order_item_id(
        id,
        values: drinks!drink_id(id, name, price, has_pfand)      
      )
    )
  `,
  )
  .order("index", { referencedTable: "order_items", ascending: true })
  .eq("state", "DONE");

const single_order = supabase
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
  .eq("state", "IN_PROGRESS")
  .single();

export type Orders = QueryData<typeof orders>;
export type SingleOrder = QueryData<typeof single_order>;

const fetchOrders = async () => {
  const { data, error } = await orders;
  if (error) throw new Error(error.message);
  return data;
};

const fetchFinishedOrders = async () => {
  const { data, error } = await finsihedOrders;
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

export const useFinishedOrders = () => {
  return useQuery({
    queryKey: ["finishedOrders"],
    queryFn: fetchFinishedOrders,
    staleTime: 1000 * 60 * 5,
  });
};
