import { Dish } from "./dish";
import { Drink } from "./drink";
import { Topping } from "./topping";

export interface OrderItem {
  main_dish: Dish | null;
  toppings: Topping[];
  drinks: Drink[];
  note?: string;
}
