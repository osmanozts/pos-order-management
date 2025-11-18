import { Dish, Drink, Topping } from "@/models";
import { FontAwesome5 } from "@expo/vector-icons";
import { Input, Separator, Stack, Text, XStack, YStack } from "tamagui";
import { OrderCardHeader } from "./order-card-header";
import { OrderCardRow } from "./order-card-row";

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
  removeOrder,
}: OrderCardProps) {
  return (
    <YStack
      borderRadius="$radiusLg"
      backgroundColor="$surface"
      padding="$xl"
      gap="$lg"
      borderWidth={1}
      borderColor="$borderLight"
      shadowColor="$shadow"
      shadowOffset={{ width: 0, height: 6 }}
      shadowRadius={16}
    >
      <OrderCardHeader
        index={index}
        removeOrder={removeOrder}
      ></OrderCardHeader>

      <Separator borderColor="$borderLight" />

      <YStack gap="$md">
        <OrderCardRow
          label="Hauptgericht"
          value={`${selectedDish?.name ?? "Nicht ausgewählt"} ${
            selectedDish?.size ? `(${selectedDish.size})` : ""
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
          borderColor="$borderLight"
        >
          <Stack
            width="$buttonSm"
            height="$buttonSm"
            backgroundColor="$accentBg"
            borderRadius="$radiusMd"
            alignItems="center"
            justifyContent="center"
          >
            <Text color="$accent">
              <FontAwesome5 name="sticky-note" size={24} />
            </Text>
          </Stack>
          <Input
            value={note}
            onChangeText={(text) => onNoteChange(index, text)}
            borderWidth={0}
            height="$sm"
            placeholder="Füge eine Notiz hinzu..."
            flex={1}
            color="$textSecondary"
          />
        </XStack>
      </YStack>
    </YStack>
  );
}
