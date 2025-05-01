

import { CustomButton, ItemDialog, OrderCard, TableNumberSheet } from "@/components";
import { createOrder } from "@/db/mutations";
import { Dish, Drink, OrderItem, Placement } from "@/models";
import { Topping } from "@/models/topping";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useRouter } from "expo-router";
import { useCallback, useMemo, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Spinner, Text, XStack, YStack } from "tamagui";
import { updateOrderItem } from "./services/update-order-item";
import { KeyboardAvoidingView, Platform } from "react-native";

type DialogState = {
    type: 'dish' | 'topping' | 'drink';
    index: number;
} | null;

export default function NewOrderIndex() {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const [orderItems, setOrderItems] = useState<OrderItem[]>([
        { main_dish: null, toppings: [], drinks: [] },
    ]);
    const [isTableSheetOpen, setIsTableSheetOpen] = useState<boolean>(false);
    const [selectedTable, setSelectedTable] = useState<Placement>();
    const [dialogState, setDialogState] = useState<DialogState>(null);

    const [loading, setLoading] = useState(false)

    const openDialog = useCallback((type: 'dish' | 'topping' | 'drink', index: number) => {
        setDialogState({ type, index });
    }, []);

    const closeDialog = useCallback(() => {
        setDialogState(null);
    }, []);

    const handleOrderItemUpdate = useCallback(<K extends keyof OrderItem>(
        key: K,
        value: OrderItem[K] extends (infer U)[] ? U : OrderItem[K],
        append: boolean = false
    ) => {
        setOrderItems(prev => updateOrderItem(prev, dialogState, key, value, append));
    }, [dialogState]);

    const handleAddPerson = useCallback(() => {
        setOrderItems(prev => [...prev, { main_dish: null, toppings: [], drinks: [] }]);
    }, []);

    const handleRemovePerson = useCallback((index: number) => {
        setOrderItems(prev => prev.filter((_, i) => i !== index));
    }, []);

    const handleCompleteOrder = useCallback(async () => {
        if (!selectedTable) {
            alert("Wähle zuerst eine Position / Tischnummer aus!");
        } else {
            setLoading(true);
            try {
                await createOrder(orderItems, selectedTable).then(() => {
                    router.replace("/(tabs)")
                });
            } catch (e) {
                throw e;
            }
            finally {
                setLoading(false)
            }

        }
    }, [orderItems, selectedTable]);

    const handleCancel = useCallback(() => {
        router.replace("/(tabs)");
    }, [router]);

    const handleTableSelect = useCallback((value: { text: string, icon: React.JSX.Element }) => {
        setSelectedTable(value);
    }, []);

    const selectedDialogItem = useMemo(() => {
        if (!dialogState) return null;
        const item = orderItems[dialogState.index];
        if (!item) return null;
        switch (dialogState.type) {
            case "dish": return item.main_dish;
            case "topping": return item.toppings;
            case "drink": return item.drinks;
            default: return null;
        }
    }, [dialogState, orderItems]);

    const handleItemSelect = useCallback((item: Dish | Topping | Drink) => {
        if (!dialogState) return;
        if (dialogState.type === "dish") {
            handleOrderItemUpdate("main_dish", item as Dish);
        } else if (dialogState.type === "topping") {
            handleOrderItemUpdate("toppings", item as Topping, true);
        } else if (dialogState.type === "drink") {
            handleOrderItemUpdate("drinks", item as Drink, true);
        }
    }, [dialogState, handleOrderItemUpdate]);

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={{ flex: 1 }}>
            <YStack
                flex={1}
                backgroundColor="$bgPrimary"
                paddingTop={insets.top}
                paddingHorizontal="$lg"
                gap="$4"
                background="$bgSecondary"
            >
                {/* Header-Bereich */}
                <YStack gap="$lg">
                    <XStack gap="$md" justifyContent="space-between">
                        <CustomButton flex={1} onPress={() => setIsTableSheetOpen(true)}>
                            {selectedTable?.icon}
                            <Text fontSize="$lg" fontWeight="600" color="$invertedText" marginLeft="$sm">
                                {!selectedTable ? "Position wählen" : selectedTable.text}
                            </Text>
                        </CustomButton>
                        <CustomButton flex={1} onPress={handleAddPerson}>
                            <MaterialIcons name="person-add" size={20} color="white" />
                            <Text fontSize="$lg" fontWeight="600" color="white" marginLeft="$sm">
                                Hinzufügen
                            </Text>
                        </CustomButton>
                    </XStack>
                    <XStack gap="$md" justifyContent="space-between">
                        <CustomButton
                            flex={1}
                            success
                            disabled={loading}
                            onPress={handleCompleteOrder}>
                            {loading ?
                                <Spinner size="small" color="$accent" />
                                :
                                <XStack>
                                    <MaterialIcons name="check-circle" size={20} color="white" />
                                    <Text fontSize="$lg" fontWeight="600" color="$invertedText" marginLeft="$sm">
                                        Abschließen
                                    </Text>
                                </XStack>
                            }
                        </CustomButton>
                        <CustomButton flex={1} onPress={handleCancel}>
                            <MaterialIcons name="cancel" size={20} color="white" />
                            <Text fontSize="$lg" fontWeight="600" color="$invertedText" marginLeft="$sm">
                                Abbrechen
                            </Text>
                        </CustomButton>
                    </XStack>
                </YStack>

                <ScrollView showsVerticalScrollIndicator={false} marginTop="$lg" marginBottom="$xl" contentContainerStyle={{ gap: '$lg' }}>
                    {orderItems.map((item, idx) => (
                        <OrderCard
                            key={idx}
                            index={idx}
                            selectedDish={item.main_dish || null}
                            selectedToppings={item.toppings}
                            selectedDrinks={item.drinks}
                            note={item.note}
                            onNoteChange={(index, text) => {
                                setOrderItems(prev => {
                                    const updated = [...prev];
                                    updated[index] = {
                                        ...updated[index],
                                        note: text,
                                    };
                                    return updated;
                                });
                            }}
                            openDialog={(type, index) => openDialog(type, index)}
                            removeOrder={(index) => handleRemovePerson(index)}
                        />
                    ))}
                </ScrollView>
                <TableNumberSheet
                    isOpen={isTableSheetOpen}
                    setIsOpen={setIsTableSheetOpen}
                    onSelect={handleTableSelect}
                />
                <ItemDialog
                    visible={dialogState !== null}
                    type={dialogState?.type ?? 'dish'}
                    selected={selectedDialogItem}
                    onSelect={handleItemSelect}
                    onClose={closeDialog}
                />
            </YStack>
        </KeyboardAvoidingView>
    );
}
