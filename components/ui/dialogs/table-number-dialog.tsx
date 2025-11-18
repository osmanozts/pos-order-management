// TableNumberDialog.tsx
import { Placement, PlacementIcon } from "@/models";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Modal } from "react-native";
import { ScrollView, Stack, Text, YStack } from "tamagui";
import { CustomButton } from "../buttons";

interface Props {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onSelect: (value: Placement) => void;
}

const renderPlacementIcon = (icon: PlacementIcon) => {
  switch (icon) {
    case "table":
      return (
        <Text color="$accent">
          <MaterialIcons name="table-restaurant" size={24} />
        </Text>
      );
    case "takeaway":
      return (
        <Text color="$accent">
          <FontAwesome5 name="walking" size={20} />
        </Text>
      );
    case "bar":
      return (
        <Text color="$accent">
          <MaterialIcons name="local-bar" size={24} />
        </Text>
      );
    case "none":
    default:
      return null;
  }
};

export const TableNumberDialog = ({ isOpen, setIsOpen, onSelect }: Props) => {
  const tables: Placement[] = [
    { text: "1", icon: "table" },
    { text: "2", icon: "table" },
    { text: "3", icon: "table" },
    { text: "4", icon: "table" },
    { text: "5", icon: "table" },
    { text: "6", icon: "table" },
    { text: "7", icon: "table" },
    { text: "8", icon: "table" },
    { text: "9", icon: "table" },
    { text: "10", icon: "table" },
    { text: "Zum Mitnehmen", icon: "takeaway" },
  ];

  return (
    <Modal
      animationType="fade"
      transparent
      visible={isOpen}
      onRequestClose={() => setIsOpen(false)}
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
          <ScrollView showsVerticalScrollIndicator={false}>
            <YStack gap="$sm" alignItems="center">
              {tables.map((table) => (
                <CustomButton
                  key={table.text}
                  outlined
                  fullWidth
                  onPress={() => {
                    onSelect(table);
                    setIsOpen(false);
                  }}
                >
                  {renderPlacementIcon(table.icon)}
                  {table.text}
                </CustomButton>
              ))}
            </YStack>
          </ScrollView>

          <CustomButton marginTop="$md" info onPress={() => setIsOpen(false)}>
            Schließen
          </CustomButton>
        </YStack>
      </Stack>
    </Modal>
  );
};
