import { CustomButton, DishSheet, DrinkSheet, OrderCard, TableNumberSheet, ToppingSheet } from "@/components";
import { createOrder } from "@/db/mutations";
import { Dish, Drink, OrderItem, Placement } from "@/models";
import { Topping } from "@/models/topping";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, XStack, YStack } from "tamagui";

export default function NewOrderIndex() {
    const router = useRouter()
    const insets = useSafeAreaInsets();

    const [isTableSheetOpen, setIsTableSheetOpen] = useState<boolean>(false);
    const [selectedTable, setSelectedTable] = useState<Placement>();

    const [orderItems, setOrderItems] = useState<OrderItem[]>([
        { main_dish: null, toppings: [], drinks: [] },
    ]);

    const [activeOrderItemIndex, setActiveOrderItemIndex] = useState<number | null>(null);
    const [activeDishSheet, setActiveDishSheet] = useState<number | null>(null);
    const [activeToppingSheet, setActiveToppingSheet] = useState<number | null>(null);
    const [activeDrinkSheet, setActiveDrinkSheet] = useState<number | null>(null);

    const openDishSheet = (index: number) => {
        setActiveOrderItemIndex(index);
        setActiveDishSheet(index);
    };

    const openToppingSheet = (index: number) => {
        setActiveOrderItemIndex(index);
        setActiveToppingSheet(index);
    };

    const openDrinkSheet = (index: number) => {
        setActiveOrderItemIndex(index);
        setActiveDrinkSheet(index);
    };

    const handleDishSelect = (dish: Dish) => {
        if (activeOrderItemIndex === null) return;

        setOrderItems((prev) =>
            prev.map((item, idx) =>
                idx === activeOrderItemIndex
                    ? { ...item, main_dish: dish }
                    : item
            )
        );

        setActiveDishSheet(null);
        setActiveOrderItemIndex(null);
    };

    const handleToppingSelect = (topping: Topping) => {
        if (activeOrderItemIndex === null) return;

        setOrderItems((prev) =>
            prev.map((item, idx) =>
                idx === activeOrderItemIndex
                    ? { ...item, toppings: [...item.toppings, topping] }
                    : item
            )
        );

        setActiveDishSheet(null);
        setActiveOrderItemIndex(null);
    };

    const handleDrinkSelect = (drinks: Drink) => {
        if (activeOrderItemIndex === null) return;

        setOrderItems((prev) =>
            prev.map((item, idx) =>
                idx === activeOrderItemIndex
                    ? { ...item, drinks: [...item.drinks, drinks] }
                    : item
            )
        );

        setActiveDishSheet(null);
        setActiveOrderItemIndex(null);
    };

    return (
        <YStack
            flex={1}
            backgroundColor="$bgPrimary"
            paddingTop={insets.top}
            paddingHorizontal="$4"
            gap="$4"
            background="$bgSecondary"
        >

            <CustomButton onPress={() => setIsTableSheetOpen(true)} icon={selectedTable?.icon}>
                {!selectedTable ? 'Tischnummer wählen' : selectedTable.text}
            </CustomButton>

            <CustomButton
                onPress={() =>
                    setOrderItems([...orderItems, { main_dish: null, toppings: [], drinks: [] }])
                }
                icon={<MaterialIcons name="add" size={24} color="white" />}
            >
                Person hinzufügen
            </CustomButton>

            <XStack justifyContent="space-between">
                <CustomButton
                    backgroundColor="$success"
                    onPress={() => createOrder(orderItems, selectedTable!)}
                    icon={<MaterialIcons name="check" size={24} color='white' />}>
                    Abschließen
                </CustomButton>
                <CustomButton
                    backgroundColor="$error"
                    onPress={() => router.replace("/(tabs)")}
                    icon={<MaterialIcons name="cancel" size={24} color='white' />}>
                    Abbrechen
                </CustomButton>
            </XStack>

            <ScrollView showsVerticalScrollIndicator={false} marginTop="$4" marginBottom="$10" contentContainerStyle={{ gap: '$4' }}>
                {orderItems.map((item, idx) => (
                    <OrderCard
                        key={idx}
                        index={idx}
                        selectedDish={item.main_dish || null}
                        selectedToppings={item.toppings}
                        selectedDrinks={item.drinks}
                        onOpenDishSheet={openDishSheet}
                        openToppingSheet={openToppingSheet}
                        openDrinkSheet={openDrinkSheet}
                    />
                ))}

            </ScrollView>

            <TableNumberSheet isOpen={isTableSheetOpen} setIsOpen={setIsTableSheetOpen} onSelect={(value: { text: string, icon: React.JSX.Element }) => setSelectedTable(value)} />
            {activeDishSheet !== null && (
                <DishSheet
                    selected={orderItems[activeOrderItemIndex ?? 0]?.main_dish ?? null}
                    onSelect={handleDishSelect}
                    onClose={() => {
                        setActiveDishSheet(null);
                        setActiveOrderItemIndex(null);
                    }}
                />
            )}
            {activeToppingSheet !== null && (
                <ToppingSheet
                    selected={orderItems[activeOrderItemIndex ?? 0]?.toppings ?? []}
                    onSelect={handleToppingSelect}
                    onClose={() => {
                        setActiveToppingSheet(null);
                        setActiveOrderItemIndex(null);
                    }}
                />
            )}
            {activeDrinkSheet !== null && (
                <DrinkSheet
                    selected={orderItems[activeOrderItemIndex ?? 0]?.drinks ?? []}
                    onSelect={handleDrinkSelect}
                    onClose={() => {
                        setActiveDrinkSheet(null);
                        setActiveOrderItemIndex(null);
                    }}
                />
            )}
        </YStack>
    );
}
