import { Button, Text, View, XStack, YStack } from "tamagui";
import { Utensils, PlusCircle, CupSoda } from "@tamagui/lucide-icons";
import { OrderCardRow } from "./order-card-row";
import { Dish, Drink, Topping } from "@/models";

interface OrderCardProps {
    index: number;
    selectedDish: Dish | null;
    selectedToppings: Topping[] | null;
    selectedDrinks: Drink[] | null;
    onOpenDishSheet: (index: number) => void;
    openToppingSheet: (index: number) => void;
    openDrinkSheet: (index: number) => void;
}

export function OrderCard({
    index,
    selectedDish,
    selectedToppings,
    selectedDrinks,
    onOpenDishSheet,
    openToppingSheet,
    openDrinkSheet,
}: OrderCardProps) {
    return (
        <YStack
            backgroundColor="$surface"
            borderRadius="$4"
            padding="$3"
            gap="$3"
            shadowColor="rgba(0,0,0,0.05)"
            shadowOffset={{ width: 0, height: 1 }}
            shadowRadius={3}
            borderWidth={1}
            borderColor="$borderLight"
        >
            <Text fontSize="$6" fontWeight="600" color="$text">
                Person {index + 1}
            </Text>

            <OrderCardRow
                label="Hauptgericht"
                value={`${selectedDish?.name ?? '-'}  ${selectedDish?.size ?? '-'}`}
                onPress={() => onOpenDishSheet(index)}
            />

            <OrderCardRow
                label="Toppings"
                value={
                    selectedToppings && selectedToppings.length > 0
                        ? selectedToppings.map((t) => t.name).join(", ")
                        : "Keine ausgewählt"
                }
                onPress={() => openToppingSheet(index)}
            />

            <OrderCardRow
                label="Getränke"
                value={
                    selectedDrinks && selectedDrinks.length > 0
                        ? selectedDrinks.map((d) => d.name).join(", ")
                        : "Keine ausgewählt"
                }
                onPress={() => openDrinkSheet(index)}
            />
        </YStack>
    );
}
