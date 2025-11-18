import { FontAwesome5, MaterialCommunityIcons } from "@expo/vector-icons";
import { Text, XStack, YStack } from "tamagui";

const iconColor = '#F85F6A';

const iconMap = {
    dish: <FontAwesome5 name="utensils" color={iconColor} size={18} />,
    topping: <FontAwesome5 name="plus" color={iconColor} size={18} />,
    drink: <MaterialCommunityIcons name="bottle-soda-classic-outline" color={iconColor} size={32} />,
};

interface OrderCardRowProps {
    label: string;
    value: string;
    onPress: () => void;
    type: "dish" | "topping" | "drink";
}

export function OrderCardRow({
    label,
    value,
    onPress,
    type,
}: OrderCardRowProps) {
    const returnIcon = () => iconMap[type];

    return (
        <XStack
            borderRadius="$radiusMd"
            borderWidth={1}
            borderColor="$borderLight"
            paddingVertical="$md"
            paddingHorizontal="$lg"
            backgroundColor="$surfaceSecondary"
            alignItems="center"
            gap="$md"
            pressStyle={{ scale: 0.95 }}
            onPress={onPress}
        >
            <YStack
                width="$buttonSm"
                height="$buttonSm"
                backgroundColor="$accentBg"
                borderRadius="$radiusMd"
                alignItems="center"
                justifyContent="center"
            >
                {returnIcon()}
            </YStack>

            <YStack flex={1}>
                <Text fontSize="$md" fontWeight="$3" color="$textSecondary">
                    {label}
                </Text>
                <Text fontSize="$lg" fontWeight="$2" color="$textSecondary">
                    {value}
                </Text>
            </YStack>
        </XStack>
    );
}
