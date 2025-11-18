import { Text, XStack, YStack } from "tamagui";

interface Props {
  label: string;
  value: string;
  price: number;
  type: "dish" | "drink";
  pfand?: number;
}

export function PriceOverviewRow({ label, value, price, type, pfand = 0 }: Props) {
  const showPfand = type === "drink" && pfand > 0;

  return (
    <YStack
      borderRadius="$radiusMd"
      borderWidth={1}
      borderColor="$borderLight"
      padding="$lg"
      backgroundColor="$surfaceSecondary"
      gap="$sm"
    >
      <XStack alignItems="center" gap="$md">
        <YStack
          width="$buttonSm"
          height="$buttonSm"
          backgroundColor="$accentBg"
          borderRadius="$radiusMd"
          alignItems="center"
          justifyContent="center"
        >
          <Text color="$accent" fontSize="$md" fontWeight="$bold">
            {price.toFixed(2)} €
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

      {showPfand && (
        <XStack justifyContent="flex-end" gap="$xs">
          <Text color="$textSecondary">Pfand:</Text>
          <Text fontWeight="$bold">{pfand.toFixed(2)} €</Text>
        </XStack>
      )}
    </YStack>
  );
}
