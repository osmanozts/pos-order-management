import { MaterialIcons } from "@expo/vector-icons";
import { Text, XStack } from "tamagui";
import { CustomButton } from "../ui";

interface OrderCardHeaderProps {
    index: number;
    removeOrder: (index: number) => void;
}


export function OrderCardHeader(props: OrderCardHeaderProps) {
    return (<XStack justifyContent="space-between" gap="$md">
        <XStack alignItems="center" gap="$md">
            <MaterialIcons name="person" size={20} color="grey" />
            <Text fontSize="$xl" fontWeight="700" color="$textDisabled">
                {props.index + 1}
            </Text>
        </XStack>

        <CustomButton width="$sm" backgroundColor="$accentBg" icon={<Text color="$accent"><MaterialIcons name="close" size={24} /></Text>} alignSelf="flex-end" onPress={() => props.removeOrder(props.index)} />
    </XStack>);
}