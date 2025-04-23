import { useToppings } from "@/db/queries";
import { Topping } from "@/models";
import { Button, Sheet, Spinner, Text, XStack, YStack } from "tamagui";

interface ToppingSheetProps {
    selected: Topping[];
    onSelect: (topping: Topping) => void;
    onClose: () => void;
}

export function ToppingSheet({
    selected,
    onSelect,
    onClose,
}: ToppingSheetProps) {
    const { data: toppings, isLoading: loadingToppings } = useToppings();

    if (loadingToppings) return (
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
                    Wähle Toppings
                </Text>

                <XStack flexWrap="wrap" gap="$2">
                    {toppings?.map((topping) => (
                        <Button
                            key={topping.id}
                            onPress={() => onSelect(topping)}
                        >
                            {topping.name}
                        </Button>
                    ))}
                </XStack>
            </Sheet.Frame>
        </Sheet>
    );
}
