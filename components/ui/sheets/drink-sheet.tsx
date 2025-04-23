import { Drink } from "@/app/new-order";
import { useDrinks } from "@/db/queries";
import { Button, Sheet, Spinner, Text, XStack, YStack } from "tamagui";

interface DrinkSheetProps {
    selected: Drink[];
    onSelect: (srink: Drink) => void;
    onClose: () => void;
}

export function DrinkSheet({
    selected,
    onSelect,
    onClose,
}: DrinkSheetProps) {
    const { data: drinks, isLoading: loadingDrinks } = useDrinks();

    if (loadingDrinks) return (
        <YStack padding="$3" gap="$4" alignItems="center">
            <Spinner size="large" color="$accent" />
        </YStack>
    )

    return (
        <Sheet
            open
            onOpenChange={(v: boolean) => !v && onClose()}
            modal
            dismissOnSnapToBottom
            snapPoints={[90]}
        >
            <Sheet.Overlay />
            <Sheet.Frame
                backgroundColor="white"
                padding="$4"
                borderTopLeftRadius="$4"
                borderTopRightRadius="$4"
            >
                <Text fontSize="$6" fontWeight="600" marginBottom="$4" color="$text">
                    Wähle Getränke
                </Text>

                <XStack flexWrap="wrap" gap="$2">
                    {drinks?.map((drinks) => (
                        <Button
                            key={drinks.id}
                            onPress={() => onSelect(drinks)}
                        >
                            {drinks.name}
                        </Button>
                    ))}
                </XStack>
            </Sheet.Frame>
        </Sheet>
    );
}
