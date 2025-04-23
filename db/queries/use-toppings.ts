import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";

const fetchToppings = async () => {
  const { data, error } = await supabase.from("toppings").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const useToppings = () => {
  return useQuery({
    queryKey: ["toppings"],
    queryFn: fetchToppings,
    staleTime: 1000 * 60 * 5,
  });
};
