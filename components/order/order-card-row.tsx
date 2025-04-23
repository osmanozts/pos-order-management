import { Text, YStack } from "tamagui";

export function OrderCardRow({
    label,
    value,
    onPress,
}: {
    label: string;
    value: string;
    onPress: () => void;
}) {
    return (
        <YStack minHeight="$3" gap="$2" borderColor="$accent" borderWidth={1} padding="$4" borderRadius="$2" onPress={onPress} pressStyle={{ opacity: 0.6 }}>
            <Text fontSize="$5" color="$textSecondary">
                {label}:
            </Text>
            <Text fontSize="$4" color="$text">
                {value}
            </Text>
        </YStack>
    );
}