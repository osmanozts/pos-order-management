import { Modal, ActivityIndicator } from "react-native";
import { Stack, Text, ScrollView, XStack, YStack, Button } from "tamagui";
import { useDrinks, useMainDishes, useToppings } from "@/db/queries";
import { Dish, Drink, Topping } from "@/models";
import { DialogSelector } from "./dialog-selector";
import { useEffect, useState } from "react";
import { CategoryChip, CustomButton } from "../buttons";
import { ChipSelection } from "../chip-selection";
import { Enums } from "@/db";

interface Props {
    visible: boolean;
    onClose: () => void;
    selected: Dish | Topping[] | Drink[] | null;
    onSelect: (item: Dish | Topping | Drink) => void;
    type: "dish" | "topping" | "drink"
}

type Categories = Enums<"main_dish_type"> | Enums<"topping_type"> | Enums<"drink_type">

export const ItemDialog = ({ visible, type, onClose, selected, onSelect }: Props) => {
    const [items, setItems] = useState<Dish[] | Topping[] | Drink[]>();
    const [selectedCategory, setSelectedCategory] = useState<Categories>();

    const { data: mainDishes } = useMainDishes();
    const { data: toppings } = useToppings();
    const { data: drinks } = useDrinks();

    useEffect(() => {
        switch (type) {
            case "dish":
                setItems(mainDishes);
                setSelectedCategory("menu");
                break;
            case "topping":
                setItems(toppings);
                setSelectedCategory("topping");
                break;
            case "drink":
                setItems(drinks);
                setSelectedCategory("alcohol_free");
                break;
            default: return;
        }
    }, [type, mainDishes, toppings, drinks]);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={visible}
            onRequestClose={onClose}
        >
            <Stack
                flex={1}
                backgroundColor="rgba(0,0,0,0.5)"
                alignItems="center"
                justifyContent="center"
                paddingHorizontal="$lg"
            >
                <YStack
                    backgroundColor="$surface"
                    padding="$lg"
                    borderRadius="$radiusMd"
                    width="100%"
                    maxWidth={400}
                    maxHeight="80%"
                >
                    <ChipSelection type={type} selected={selectedCategory ?? "menu"} onSelect={(category) => setSelectedCategory(category as Categories)} />


                    <ScrollView showsVerticalScrollIndicator={false} height="$xxl">
                        <YStack gap="$sm" >
                            {items?.map((item) => {
                                let isSelected = false;
                                if (type === "dish" && selected && !Array.isArray(selected)) {
                                    isSelected = selected.id === item.id;
                                }
                                if ((type === "topping" || type === "drink") && Array.isArray(selected)) {
                                    isSelected = selected.some((s) => s.id === item.id);
                                }
                                if (item.category === selectedCategory)
                                    return (
                                        <DialogSelector
                                            key={item.id}
                                            item={item}
                                            isSelected={isSelected}
                                            onSelect={(d) => onSelect(d)}
                                            type={type}
                                        />
                                    );
                            })}
                        </YStack>
                    </ScrollView>

                    <CustomButton marginTop="$md" success onPress={onClose}>Schließen</CustomButton>
                </YStack>
            </Stack>
        </Modal>
    );
};
