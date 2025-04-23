import { useMainDishes } from "@/db/queries";
import { Dish } from "@/models";
import { Button, Sheet, Spinner, Text, XStack, YStack } from "tamagui";

interface DishSheetProps {
    selected: Dish | null;
    onSelect: (dish: Dish) => void;
    onClose: () => void;
}

export function DishSheet({
    selected,
    onSelect,
    onClose,
}: DishSheetProps) {
    const { data: mainDishes, isLoading: loadingDishes } = useMainDishes();

    if (loadingDishes) return (
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
            snapPoints={[90]}>
            <Sheet.Overlay />
            <Sheet.Frame
                backgroundColor="white"
                padding="$4"
                borderTopLeftRadius="$4"
                borderTopRightRadius="$4"
            >
                <Text fontSize="$6" fontWeight="600" marginBottom="$4" color="$text">
                    Wähle ein Hauptgericht
                </Text>

                <XStack flexWrap="wrap" gap="$2">
                    {mainDishes?.map((dish) => (
                        <Button
                            key={dish.id}
                            onPress={() => onSelect(dish)}
                        >
                            {dish.name}
                        </Button>
                    ))}
                </XStack>
            </Sheet.Frame>
        </Sheet>
    );
}
