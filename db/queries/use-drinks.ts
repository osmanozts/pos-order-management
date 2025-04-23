import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";

const fetchDrinks = async () => {
  const { data, error } = await supabase.from("drinks").select("*");

  if (error) throw new Error(error.message);
  return data;
};

export const useDrinks = () => {
  return useQuery({
    queryKey: ["drinks"],
    queryFn: fetchDrinks,
    staleTime: 1000 * 60 * 5,
  });
};
