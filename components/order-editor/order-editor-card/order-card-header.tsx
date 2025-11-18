import { CustomButton } from "@/components/ui";
import { MaterialIcons } from "@expo/vector-icons";
import { Text, XStack } from "tamagui";

interface OrderCardHeaderProps {
  index: number;
  removeOrder: (index: number) => void;
}

export function OrderCardHeader(props: OrderCardHeaderProps) {
  return (
    <XStack justifyContent="space-between" gap="$md" alignItems="center">
      <XStack alignItems="center" gap="$md">
        <Text color="$textSecondary">
          <MaterialIcons name="person" size={20} />
        </Text>

        <Text fontSize="$xl" fontWeight="700" color="$disabledText">
          {props.index + 1}
        </Text>
      </XStack>

      <CustomButton
        danger
        iconOnly
        onPress={() => props.removeOrder(props.index)}
        icon={<MaterialIcons name="close" size={20} />}
      />
    </XStack>
  );
}
