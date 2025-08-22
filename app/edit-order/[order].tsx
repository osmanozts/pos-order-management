import {
  CustomButton,
  ItemDialog,
  OrderCard,
  TableNumberDialog,
} from "@/components";
import { SingleOrder } from "@/db";
import { updateOrder } from "@/db/mutations";
import { Dish, Drink, OrderItem, Placement } from "@/models";
import { Topping } from "@/models/topping";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useLocalSearchParams, useRouter } from "expo-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Spinner, Text, XStack, YStack } from "tamagui";
import { updateOrderItem } from "./services/update-order-item";

type DialogState = {
  type: "dish" | "topping" | "drink";
  index: number;
} | null;

export default function EditOrderIndex() {
  const { order } = useLocalSearchParams<{ order: string }>();
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
  const [isTableDialogOpen, setIsTableDialogOpen] = useState<boolean>(false);
  const [selectedTable, setSelectedTable] = useState<Placement>();
  const [dialogState, setDialogState] = useState<DialogState>(null);

  useEffect(() => {
    const orderObject: SingleOrder = JSON.parse(order);
    setOrderId(orderObject.id);

    const mappedOrderItems: OrderItem[] = orderObject.order_items.map(
      (item) => {
        return {
          main_dish: item.main_dish,
          toppings: Array.from(item.toppings.values())
            .map((t) => t?.values!)
            .filter(Boolean),
          drinks: Array.from(item.drinks.values())
            .map((d) => d?.values!)
            .filter(Boolean),
          note: item.note ?? undefined,
        };
      },
    );

    setOrderItems(mappedOrderItems);
    setSelectedTable({ text: orderObject.placement, icon: <></> });
  }, [order]);

  const [loading, setLoading] = useState(false);

  const openDialog = useCallback(
    (type: "dish" | "topping" | "drink", index: number) => {
      setDialogState({ type, index });
    },
    [],
  );

  const closeDialog = useCallback(() => {
    setDialogState(null);
  }, []);

  const handleOrderItemUpdate = useCallback(
    <K extends keyof OrderItem>(
      key: K,
      value: OrderItem[K] extends (infer U)[] ? U : OrderItem[K],
      append: boolean = false,
    ) => {
      setOrderItems((prev) =>
        updateOrderItem(prev, dialogState, key, value, append),
      );
    },
    [dialogState],
  );

  const handleAddPerson = useCallback(() => {
    setOrderItems((prev) => [
      ...prev,
      { main_dish: null, toppings: [], drinks: [] },
    ]);
  }, []);

  const handleRemovePerson = useCallback((index: number) => {
    setOrderItems((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const handleCompleteOrder = useCallback(async () => {
    if (!selectedTable) {
      alert("Wähle zuerst eine Position / Tischnummer aus!");
    } else {
      setLoading(true);
      try {
        if (orderId) {
          await updateOrder(orderId, orderItems, selectedTable).then(() => {
            router.replace("/(tabs)");
          });
        } else throw new Error("orderId fehlt");
      } catch (e) {
        throw e;
      } finally {
        setLoading(false);
      }
    }
  }, [orderItems, selectedTable]);

  const handleCancel = useCallback(() => {
    router.replace("/(tabs)");
  }, [router]);

  const handleTableSelect = useCallback(
    (value: { text: string; icon: React.JSX.Element }) => {
      setSelectedTable(value);
    },
    [],
  );

  const selectedDialogItem = useMemo(() => {
    if (!dialogState) return null;
    const item = orderItems[dialogState.index];
    if (!item) return null;
    switch (dialogState.type) {
      case "dish":
        return item.main_dish;
      case "topping":
        return item.toppings;
      case "drink":
        return item.drinks;
      default:
        return null;
    }
  }, [dialogState, orderItems]);

  const handleItemSelect = useCallback(
    (item: Dish | Topping | Drink) => {
      if (!dialogState) return;
      if (dialogState.type === "dish") {
        handleOrderItemUpdate("main_dish", item as Dish);
      } else if (dialogState.type === "topping") {
        handleOrderItemUpdate("toppings", item as Topping, true);
      } else if (dialogState.type === "drink") {
        handleOrderItemUpdate("drinks", item as Drink, true);
      }
    },
    [dialogState, handleOrderItemUpdate],
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <YStack
        flex={1}
        backgroundColor="$bgPrimary"
        paddingTop={insets.top}
        paddingHorizontal="$lg"
        gap="$4"
        background="$bgSecondary"
      >
        <YStack gap="$lg">
          <XStack gap="$md" justifyContent="space-between">
            <CustomButton flex={1} onPress={() => setIsTableDialogOpen(true)}>
              {selectedTable?.icon}
              <Text
                fontSize="$lg"
                fontWeight="600"
                color="$invertedText"
                marginLeft="$sm"
              >
                {!selectedTable ? "Position wählen" : selectedTable.text}
              </Text>
            </CustomButton>
            <CustomButton flex={1} onPress={handleAddPerson}>
              <MaterialIcons name="person-add" size={20} color="white" />
              <Text
                fontSize="$lg"
                fontWeight="600"
                color="white"
                marginLeft="$sm"
              >
                Hinzufügen
              </Text>
            </CustomButton>
          </XStack>
          <XStack gap="$md" justifyContent="space-between">
            <CustomButton
              flex={1}
              success
              disabled={loading}
              onPress={handleCompleteOrder}
            >
              {loading ? (
                <Spinner size="small" color="$accent" />
              ) : (
                <XStack>
                  <MaterialIcons name="mode-edit" size={20} color="white" />
                  <Text
                    fontSize="$lg"
                    fontWeight="600"
                    color="$invertedText"
                    marginLeft="$sm"
                  >
                    Bearbeiten
                  </Text>
                </XStack>
              )}
            </CustomButton>
            <CustomButton flex={1} onPress={handleCancel}>
              <MaterialIcons name="cancel" size={20} color="white" />
              <Text
                fontSize="$lg"
                fontWeight="600"
                color="$invertedText"
                marginLeft="$sm"
              >
                Abbrechen
              </Text>
            </CustomButton>
          </XStack>
        </YStack>

        <ScrollView
          showsVerticalScrollIndicator={false}
          marginTop="$lg"
          marginBottom="$xl"
          contentContainerStyle={{ gap: "$lg" }}
        >
          {orderItems.map((item, idx) => (
            <OrderCard
              key={idx}
              index={idx}
              selectedDish={item.main_dish || null}
              selectedToppings={item.toppings}
              selectedDrinks={item.drinks}
              note={item.note}
              onNoteChange={(index, text) => {
                setOrderItems((prev) => {
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
        <TableNumberDialog
          isOpen={isTableDialogOpen}
          setIsOpen={setIsTableDialogOpen}
          onSelect={handleTableSelect}
        />
        <ItemDialog
          visible={dialogState !== null}
          type={dialogState?.type ?? "dish"}
          selected={selectedDialogItem}
          onSelect={handleItemSelect}
          onClose={closeDialog}
        />
      </YStack>
    </KeyboardAvoidingView>
  );
}
