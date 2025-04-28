import { Text, XStack, YStack } from "tamagui";
import { Utensils, CupSoda, Plus } from "@tamagui/lucide-icons";

const iconMap = {
    dish: Utensils,
    topping: Plus,
    drink: CupSoda,
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
    const Icon = iconMap[type];

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
                <Icon size={18} color="#F85F6A" />
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
