import { Dish, Drink, Topping } from "@/models";
import { FontAwesome5, MaterialCommunityIcons, MaterialIcons } from "@expo/vector-icons";
import { Check, PlusCircle } from "@tamagui/lucide-icons";
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
                return <Text fontSize="$iconXs" color="$accent"><FontAwesome5 name="utensils" /></Text>;
            case "topping":
                return <Text fontSize="$iconXs" color="$accent"><FontAwesome5 name="plus" /></Text>;
            case "drink":
                return <Text fontSize="$iconXs" color="$accent"><MaterialCommunityIcons name="bottle-soda-classic-outline" /></Text>;
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
                    <Text fontSize="$iconMd" color="$textSecondary"><MaterialIcons name="check-circle" /></Text>
                ) : (
                    <Text fontSize="$iconMd" color="$textSecondary"><FontAwesome5 name="plus" /></Text>
                )}
            </XStack>
        </Card >
    );
});