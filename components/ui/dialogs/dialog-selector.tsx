import { Dish, Drink, Topping } from "@/models";
import { Check, Plus, PlusCircle, Utensils, CupSoda } from "@tamagui/lucide-icons";
import { memo } from "react";
import { Card, Text, XStack, YStack } from "tamagui";

interface Props {
    item: Dish | Topping | Drink;
    isSelected: boolean;
    onSelect: (item: Dish | Topping | Drink) => void;
    type: 'dish' | 'topping' | 'drink'
}

export const DialogSelector = memo(function DialogSelector({ item, isSelected, onSelect, type }: Props) {
    const getIcon = () => {
        switch (type) {
            case "dish":
                return <Utensils size="$iconXs" color="$accent" />;
            case "topping":
                return <Plus size="$iconXs" color="$accent" />;
            case "drink":
                return <CupSoda size="$iconXs" color="$accent" />;
            default:
                return null;
        }
    };

    const getLabel = (item: Dish | Topping | Drink) => {
        switch (type) {
            case "dish":
                const dish: Dish = item as Dish;
                return dish.name + " " + (dish.size ?? "");
            case "topping":
                const topping: Topping = item as Topping;
                return topping.name;
            case "drink":
                const drink: Drink = item as Drink;
                return drink.name;
            default:
                return item.name;
        }
    };

    const handlePress = () => onSelect(item);

    return (
        <Card
            key={item.id}
            bordered
            animation="quick"
            pressStyle={{ scale: 0.95, borderColor: "$borderLight" }}
            backgroundColor={isSelected ? "$surfaceHover" : "$surfaceSecondary"}
            borderColor="$borderLight"
            borderWidth={1}
            onPress={handlePress}
        >
            <XStack justifyContent="space-between" alignItems="center" padding="$md">
                <XStack alignItems="center" gap="$sm" flex={1}>
                    <YStack
                        borderRadius="$radiusMd"
                        width="$buttonXs"
                        height="$buttonXs"
                        backgroundColor="$accentBg"
                        alignItems="center"
                        justifyContent="center"
                    >
                        {getIcon()}
                    </YStack>
                    <Text
                        fontSize="$5"
                        fontWeight="$4"
                        color="$textSecondary"
                        flexShrink={1}
                        flexWrap="wrap">
                        {getLabel(item)}
                    </Text>
                </XStack>
                {isSelected ? (
                    <Check size="$iconMedium" color="$textSecondary" />
                ) : (
                    <PlusCircle size="$iconMedium" color="$textSecondary" />
                )}
            </XStack>
        </Card >
    );
});