import { Modal } from "react-native";
import { Text, XStack, YStack } from "tamagui";
import { CustomButton } from "../buttons";

interface Props {
  visible: boolean;
  onDelete: () => void;
  onCancel: () => void;
}

export const ConfirmDeleteDialog = ({ visible, onDelete, onCancel }: Props) => {
  return (
    <Modal animationType="fade" transparent visible={visible}>
      <YStack
        flex={1}
        alignItems="center"
        justifyContent="center"
        backgroundColor="$overlay"
      >
        <YStack
          margin="$lg"
          padding="$lg"
          backgroundColor="$surface"
          alignItems="center"
          justifyContent="center"
          borderRadius="$radiusMd"
          gap="$md"
          width="80%"
        >
          <Text fontWeight="bold" fontSize={16} textAlign="center">
            Bist du sicher, dass du dieses Element löschen möchtest?
          </Text>

          <XStack gap="$md" marginTop="$sm">
            <CustomButton ghost onPress={onCancel}>
              Abbrechen
            </CustomButton>

            <CustomButton danger onPress={onDelete}>
              Löschen
            </CustomButton>
          </XStack>
        </YStack>
      </YStack>
    </Modal>
  );
};
