import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";

const fetchMainDishes = async () => {
  const { data, error } = await supabase.from("main_dishes").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const useMainDishes = () => {
  return useQuery({
    queryKey: ["main_dishes"],
    queryFn: fetchMainDishes,
    staleTime: 1000 * 60 * 5,
  });
};
