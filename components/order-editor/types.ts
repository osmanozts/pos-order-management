import { Dish, Drink, Placement } from "@/models";
import { Topping } from "@/models/topping";

export type OrderFormItem = {
  id: string;
  main_dish: Dish | null;
  toppings: Topping[];
  drinks: Drink[];
  note?: string;
};

export type OrderFormState = {
  items: OrderFormItem[];
  placement?: Placement;
};
