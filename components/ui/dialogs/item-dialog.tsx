import { Enums } from "@/db";
import { useDrinks, useMainDishes, useToppings } from "@/db/queries";
import { Dish, Drink, Topping } from "@/models";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { Modal } from "react-native";
import { ScrollView, Stack, YStack } from "tamagui";
import { CustomButton } from "../buttons";
import { ChipSelection } from "../chip-selection";
import { DialogSelector } from "./dialog-selector";

interface Props {
  visible: boolean;
  onClose: () => void;
  selected: Dish | Topping[] | Drink[] | null;
  onSelect: (item: Dish | Topping | Drink) => void;
  type: "dish" | "topping" | "drink";
}

type Categories =
  | Enums<"main_dish_type">
  | Enums<"topping_type">
  | Enums<"drink_type">;

export const ItemDialog = memo(function ItemDialog({
  visible,
  type,
  onClose,
  selected,
  onSelect,
}: Props) {
  const [selectedCategory, setSelectedCategory] = useState<Categories>();

  const { data: mainDishes } = useMainDishes();
  const { data: toppings } = useToppings();
  const { data: drinks } = useDrinks();

  useEffect(() => {
    if (!visible) return;
    if (type === "dish") setSelectedCategory("menu");
    if (type === "topping") setSelectedCategory("topping");
    if (type === "drink") setSelectedCategory("alcohol_free");
  }, [visible, type]);

  const items: Array<Dish | Topping | Drink> = useMemo(() => {
    switch (type) {
      case "dish":
        return mainDishes ?? [];
      case "topping":
        return toppings ?? [];
      case "drink":
        return drinks ?? [];
      default:
        return [];
    }
  }, [type, mainDishes, toppings, drinks]);

  const filteredItems = useMemo(() => {
    if (!selectedCategory) return items;
    return items.filter((i: any) => i.category === selectedCategory);
  }, [items, selectedCategory]);

  const selectedSet = useMemo(() => {
    if (!selected) return null;
    if (type === "dish" && !Array.isArray(selected)) {
      return new Set([selected.name]);
    }
    if ((type === "topping" || type === "drink") && Array.isArray(selected)) {
      return new Set(selected.map((s) => s.name));
    }
    return null;
  }, [selected, type]);

  const handleSelect = useCallback(
    (d: Dish | Topping | Drink) => onSelect(d),
    [onSelect],
  );

  return (
    <Modal
      animationType="fade"
      transparent
      visible={visible}
      onRequestClose={onClose}
    >
      <Stack
        flex={1}
        backgroundColor="$overlay"
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
          gap="$md"
        >
          <ChipSelection
            type={type}
            selected={(selectedCategory as any) ?? "menu"}
            onSelect={(category) => setSelectedCategory(category as Categories)}
          />

          <ScrollView showsVerticalScrollIndicator={false} height="$xxl">
            <YStack gap="$sm">
              {filteredItems.map((item: any) => {
                const isSelected = !!selectedSet && selectedSet.has(item.name);

                return (
                  <MemoDialogSelector
                    key={item.id}
                    item={item}
                    isSelected={isSelected}
                    onSelect={handleSelect}
                    type={type}
                  />
                );
              })}
            </YStack>
          </ScrollView>

          <CustomButton marginTop="$md" info onPress={onClose}>
            Schließen
          </CustomButton>
        </YStack>
      </Stack>
    </Modal>
  );
});

const MemoDialogSelector = memo(DialogSelector);
