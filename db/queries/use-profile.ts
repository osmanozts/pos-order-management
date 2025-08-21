import { useQuery } from "@tanstack/react-query";
import { supabase } from "../supabase";

const fetchProfile = async (email: string) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("email", email)
    .single();

  if (error) throw new Error(error.message);
  return data;
};

export const useProfile = (email: string) => {
  return useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchProfile(email),
    staleTime: 1000 * 60 * 5,
  });
};
