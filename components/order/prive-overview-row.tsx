import { Text, XStack, YStack } from "tamagui";

interface Props {
    label: string;
    value: string;
    price: number;
    type: "dish" | "drink";
}

export function PriceOverviewRow({ label, value, price, type }: Props) {
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
                <Text color="$accent" fontSize="$md" fontWeight="$bold" >
                    {price} €
                </Text>
            </YStack>

            <YStack flex={1}>
                <Text fontSize="$md" fontWeight="$regular" color="$textSecondary">
                    {label}
                </Text>

                <Text fontSize="$lg" fontWeight="$regular" color="$textSecondary">
                    {value}
                </Text>

            </YStack>
        </XStack>
    );
}
