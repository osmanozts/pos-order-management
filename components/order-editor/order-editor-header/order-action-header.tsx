import { CustomButton, TableNumberDialog } from "@/components/ui";
import { Placement } from "@/models";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useCallback, useState } from "react";
import { Spinner, Text, XStack, YStack } from "tamagui";

interface OrderActionHeaderProps {
  selectedTable: Placement | undefined;
  handleAddPerson: () => void;
  loading: boolean;
  handleCompleteOrder: () => void;
  handleTableSelect: (value: Placement) => void;
}

export function OrderActionHeader({
  selectedTable,
  loading,
  handleAddPerson,
  handleCompleteOrder,
  handleTableSelect,
}: OrderActionHeaderProps) {
  const router = useRouter();
  const [isTableDialogOpen, setIsTableDialogOpen] = useState<boolean>(false);

  const handleCancel = useCallback(() => {
    router.replace("/(tabs)");
  }, [router]);

  return (
    <YStack gap="$lg">
      <XStack gap="$md" justifyContent="space-between">
        <CustomButton
          outlined
          flex={1}
          onPress={() => setIsTableDialogOpen(true)}
          icon={<MaterialIcons name="table-restaurant" size={20} />}
        >
          {!selectedTable ? "Position wählen" : selectedTable.text}
        </CustomButton>

        <CustomButton
          outlined
          flex={1}
          onPress={handleAddPerson}
          icon={<MaterialIcons name="person-add" size={20} />}
        >
          Hinzufügen
        </CustomButton>
      </XStack>

      <XStack gap="$md" justifyContent="space-between">
        <CustomButton
          flex={1}
          success
          disabled={loading}
          onPress={handleCompleteOrder}
          icon={
            !loading ? (
              <MaterialIcons name="check-circle" size={20} />
            ) : undefined
          }
        >
          {loading ? (
            <Spinner size="small" color="$invertedText" />
          ) : (
            <Text fontSize="$lg" fontWeight="600" color="$invertedText">
              Abschließen
            </Text>
          )}
        </CustomButton>

        <CustomButton
          danger
          flex={1}
          onPress={handleCancel}
          icon={<MaterialIcons name="cancel" size={20} />}
        >
          Abbrechen
        </CustomButton>
      </XStack>

      <TableNumberDialog
        isOpen={isTableDialogOpen}
        setIsOpen={setIsTableDialogOpen}
        onSelect={handleTableSelect}
      />
    </YStack>
  );
}
