import { Enums } from "@/db";
import { CupSoda, Plus, StickyNote, Utensils } from "@tamagui/lucide-icons";
import { Text, XStack, YStack } from "tamagui";

const iconMap = {
    dish: Utensils,
    topping: Plus,
    drink: CupSoda,
    note: StickyNote
};

interface OrderOverviewRowProps {
    label: string;
    value: string;
    type: "dish" | "topping" | "drink" | "note";
}

export function OrderOverviewRow({ label, value, type }: OrderOverviewRowProps) {
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
