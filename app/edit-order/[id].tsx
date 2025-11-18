import { CustomButton, OrderEditor, toFormState } from "@/components";
import { useOrderById } from "@/db";
import { updateOrder } from "@/db/mutations";
import { useLocalSearchParams, useRouter } from "expo-router";
import { ActivityIndicator } from "react-native";
import { Text, YStack } from "tamagui";

export default function EditOrderScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { data: order, error, isLoading } = useOrderById(id);

  if (isLoading) {
    return (
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$bgPrimary"
      >
        <ActivityIndicator color="#F85F6A" />
      </YStack>
    );
  }

  if (error) {
    return (
      <YStack
        flex={1}
        justifyContent="center"
        alignItems="center"
        gap="$md"
        backgroundColor="$bgPrimary"
      >
        <Text color="$error" fontWeight="600">
          Beim Laden der Bestellung ist ein Fehler aufgetreten.
        </Text>
        <Text color="$textSecondary">
          {(error as any)?.message ?? "Bitte versuche es erneut."}
        </Text>
        <CustomButton
          secondary
          onPress={() => {
            router.replace("/(tabs)");
          }}
        >
          Zurück
        </CustomButton>
      </YStack>
    );
  }

  if (order) {
    return (
      <OrderEditor
        mode="edit"
        initial={toFormState(order)}
        onSubmit={async (formPayload) => {
          await updateOrder(id, formPayload.items, {
            text: order?.placement ?? "",
            icon: "none",
          });
          router.replace("/(tabs)");
        }}
      />
    );
  }

  return (
    <YStack flex={1} justifyContent="center" alignItems="center" backgroundColor="$bgPrimary">
      <Text color="$textSecondary">Keine Daten gefunden.</Text>
      <CustomButton secondary onPress={() => router.replace("/(tabs)")}>
        Zurück
      </CustomButton>
    </YStack>
  );
}
