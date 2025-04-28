import { Dish, Drink, Topping } from "@/models";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Input, Separator, Stack, Text, TextArea, XStack, YStack } from "tamagui";
import { OrderCardRow } from "./order-card-row";
import { CustomButton } from "../ui";
import { StickyNote, X } from "@tamagui/lucide-icons";

interface OrderCardProps {
    index: number;
    selectedDish: Dish | null;
    selectedToppings: Topping[] | null;
    selectedDrinks: Drink[] | null;
    note: string | undefined;
    onNoteChange: (index: number, note: string) => void;
    openDialog: (type: "dish" | "topping" | "drink", index: number) => void;
    removeOrder: (index: number) => void;
}

export function OrderCard({
    index,
    selectedDish,
    selectedToppings,
    selectedDrinks,
    note,
    onNoteChange,
    openDialog,
    removeOrder
}: OrderCardProps) {
    return (
        <YStack
            borderRadius="$radiusLg"
            backgroundColor="$surface"
            padding="$xl"
            gap="$lg"
            borderWidth={1}
            borderColor="#ECECEC"
            shadowColor="rgba(0,0,0,0.06)"
            shadowOffset={{ width: 0, height: 6 }}
            shadowRadius={16}
        >
            <XStack justifyContent="space-between" gap="$md">
                <XStack alignItems="center" gap="$md">
                    <MaterialIcons name="person" size={20} color="grey" />
                    <Text fontSize="$xl" fontWeight="700" color="$textDisabled">
                        {index + 1}
                    </Text>
                </XStack>

                <CustomButton
                    width="$sm"
                    backgroundColor="$accentBg"
                    icon={<X size={24} color="$accent" />}
                    alignSelf="flex-end"
                    onPress={() => removeOrder(index)} />
            </XStack>

            <Separator borderColor="$borderLight" />

            <YStack gap="$md">
                <OrderCardRow
                    label="Hauptgericht"
                    value={`${selectedDish?.name ?? "Nicht ausgewählt"} ${selectedDish?.size ? `(${selectedDish.size})` : ""
                        }`}
                    type="dish"
                    onPress={() => openDialog("dish", index)}
                />
                <OrderCardRow
                    label="Toppings"
                    value={
                        selectedToppings?.length
                            ? selectedToppings.map((t) => `- ${t.name}`).join(",\n")
                            : "Keine"
                    }
                    type="topping"
                    onPress={() => openDialog("topping", index)}
                />
                <OrderCardRow
                    label="Getränke"
                    value={
                        selectedDrinks?.length
                            ? selectedDrinks.map((d) => d.name).join(",\n")
                            : "Keine"
                    }
                    type="drink"
                    onPress={() => openDialog("drink", index)}
                />

                <XStack
                    flex={1}
                    paddingVertical="$md"
                    paddingHorizontal="$lg"
                    backgroundColor="$surfaceSecondary"
                    borderRadius="$radiusMd"
                    borderWidth={1}
                    borderColor="$borderLight">
                    <Stack
                        width="$buttonSm"
                        height="$buttonSm"
                        backgroundColor="$accentBg"
                        borderRadius="$radiusMd"
                        alignItems="center"
                        justifyContent="center"
                    >
                        <StickyNote size={18} color="#F85F6A" />
                    </Stack>
                    <Input onChangeText={(text) => onNoteChange(index, text)} borderWidth={0} height="$sm" placeholder="Füge eine Notiz hinzu..." flex={1} color="$textSecondary" />
                </XStack>
            </YStack>
        </YStack>
    );
}
