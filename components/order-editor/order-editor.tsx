// components/order-editor/order-editor.tsx
import { ItemDialog, OrderActionHeader, OrderCard } from "@/components";
import { KeyboardAvoidingView, Platform } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";
import { useOrderForm } from "./use-order-form";

type Props = {
  mode: "create" | "edit";
  initial?: Parameters<typeof useOrderForm>[0]["initial"];
  onSubmit: Parameters<typeof useOrderForm>[0]["onSubmit"];
};

export function OrderEditor({ mode, initial, onSubmit }: Props) {
  const insets = useSafeAreaInsets();

  const form = useOrderForm({ initial, onSubmit });

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
        <OrderActionHeader
          selectedTable={form.state.placement}
          handleAddPerson={form.addItem}
          loading={form.loading}
          handleCompleteOrder={form.submit}
          handleTableSelect={form.setPlacement}
        />

        <ScrollView
          showsVerticalScrollIndicator={false}
          marginTop="$lg"
          marginBottom="$xl"
          contentContainerStyle={{ gap: "$lg" }}
        >
          {form.state.items.map((item, idx) => (
            <OrderCard
              key={item.id}
              index={idx}
              selectedDish={item.main_dish}
              selectedToppings={item.toppings}
              selectedDrinks={item.drinks}
              note={item.note}
              onNoteChange={(index, text) => form.updateNote(index, text)}
              openDialog={(type, index) => form.openDialog(type, index)}
              removeOrder={(index) => form.removeItem(index)}
            />
          ))}
        </ScrollView>

        <ItemDialog
          visible={form.dialogState !== null}
          type={form.dialogState?.type ?? "dish"}
          selected={form.selectedDialogValue}
          onSelect={form.selectFromDialog}
          onClose={form.closeDialog}
        />
      </YStack>
    </KeyboardAvoidingView>
  );
}
