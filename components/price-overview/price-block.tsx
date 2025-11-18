import { Text, XStack, YStack } from "tamagui";

export interface Totals {
  subtotal: number;
  pfand: number;
  grand: number;
}

interface PriceBlockProps {
    totals: Totals
}

export function PriceBlock({totals}: PriceBlockProps) {
    return (
        <XStack
        borderRadius="$radiusMd"
        backgroundColor="$surfaceSecondary"
        borderWidth={1}
        borderColor="$borderLight"
        padding="$lg"
        justifyContent="space-between"
        alignItems="center"
        gap="$lg"
      >
        <YStack flex={1} alignItems="center">
          <Text color="$textSecondary" fontSize="$textSm">
            Summe
          </Text>
          <Text fontWeight="$bold" fontSize="$headingSm" color="$text">
            {totals.subtotal.toFixed(2)} €
          </Text>
        </YStack>
        <YStack flex={1} alignItems="center">
          <Text color="$textSecondary" fontSize="$textSm">
            Pfand
          </Text>
          <Text fontWeight="$bold" fontSize="$headingSm" color="$text">
            {totals.pfand.toFixed(2)} €
          </Text>
        </YStack>
        <YStack flex={1} alignItems="center">
          <Text color="$textSecondary" fontSize="$textSm">
            Gesamt
          </Text>
          <Text fontWeight="$bold" fontSize="$headingLg" color="$accent">
            {totals.grand.toFixed(2)} €
          </Text>
        </YStack>
      </XStack>
    )
}