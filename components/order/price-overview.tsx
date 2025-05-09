import { deleteOrder, SingleOrder, updateOrderItemState } from "@/db";
import { FontAwesome5 } from "@expo/vector-icons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import dayjs from "dayjs";
import { Separator, Spinner, Stack, Text, XStack, YStack } from "tamagui";
import { CustomButton } from "../ui";
import { PriceOverviewRow } from "./prive-overview-row";

interface Props {
    order: SingleOrder;
    totalPrice: number;
    isLoading: boolean;
    refetch: () => void;
}

export function PriceOverview({ order, totalPrice, isLoading, refetch }: Props) {

    return (
        <YStack
            borderRadius="$radiusLg"
            backgroundColor="$surface"
            padding="$xl"
            gap="$xl"
            borderWidth={1}
            borderColor="$borderLight"
            shadowColor="rgba(0,0,0,0.06)"
            shadowOffset={{ width: 0, height: 6 }}
            shadowRadius={16}
            width="$xxl"
            maxWidth="$xxxl"
        >
            <XStack justifyContent="space-between" marginTop="$sm" alignItems="center">
                <XStack gap="$md">
                    <XStack gap="$xs">
                        <MaterialIcons name="table-restaurant" size={24} color="grey" />
                        <Text fontSize="$xl" fontWeight="400" color="$textSecondary">
                            {order.placement}
                        </Text>
                    </XStack>

                    <XStack gap="$xs">
                        <MaterialIcons name="timelapse" size={24} color="grey" />
                        <Text fontSize="$xl" fontWeight="400" color="$textSecondary">
                            {dayjs(order.created_at).format("HH:mm")}
                        </Text>
                    </XStack>
                </XStack>

                <XStack gap="$md" alignItems="center">
                    <XStack gap="$xs">
                        <Text color="$accent"><FontAwesome5 name="coins" size={20} /></Text>
                        <Text fontSize="$xl" fontWeight="700" color="$textSecondary">
                            {totalPrice}€
                        </Text>
                    </XStack>

                    <CustomButton
                        width="$sm"
                        icon={<Text><FontAwesome5 name="trash" size={20} /></Text>}
                        alignSelf="flex-end"
                        backgroundColor="$accentBg"
                        color="$accent"
                        onPress={() => deleteOrder(order.id, refetch)}>
                        {isLoading && <Spinner color="$invertedText" />}
                    </CustomButton>
                </XStack>
            </XStack>

            <Separator borderColor="$borderDark" marginVertical="$xs" />

            {
                order.order_items.map((orderItem, index) => {
                    const totalDishPrice = orderItem.main_dish?.price ?? 0;
                    const totalToppingPrice = orderItem.toppings.reduce((sum, topping) => sum + (topping.values?.price ?? 0), 0);
                    const totalDrinkPrice = orderItem.drinks.reduce((sum, drink) => sum + (drink.values?.price ?? 0), 0);

                    return (
                        <YStack key={index} gap="$lg">
                            <XStack justifyContent="space-between">
                                <XStack gap="$lg" alignItems="center">
                                    <XStack gap="$xs">
                                        <MaterialIcons name="person" size={20} color="grey" />
                                        <Text fontSize="$xl" fontWeight="700" color="$textSecondary">
                                            {index + 1}
                                        </Text>
                                    </XStack>
                                    <XStack gap="$xs">
                                        <Text color="$accent"><FontAwesome5 name="coins" size={20} /></Text>
                                        <Text fontSize="$xl" fontWeight="700" color="$textSecondary">
                                            {totalDishPrice + totalToppingPrice + totalDrinkPrice} €
                                        </Text>
                                    </XStack>
                                    {orderItem.state === "PAID" && (
                                        <Stack borderRadius="$xs" backgroundColor="$accentBg" padding="$xs">
                                            <Text color="$accent" fontSize={14}>
                                                Bezahlt
                                            </Text>
                                        </Stack>
                                    )}
                                </XStack>

                                <CustomButton
                                    width="$sm"
                                    backgroundColor={(orderItem.state !== "DONE") ? "$accentBg" : "$successBg"}
                                    color={(orderItem.state !== "DONE") ? "$accent" : "$success"}
                                    icon={orderItem.state === "DONE" ? <Text><MaterialIcons name="check-circle" size={20} /></Text> : <Text><MaterialIcons name="close" size={20} /></Text>}
                                    alignSelf="flex-end"
                                    onPress={() => updateOrderItemState(orderItem.id, orderItem.state === "DONE" ? "PAID" : "DONE", refetch)}>
                                    {isLoading && <Spinner color="$invertedText" />}
                                </CustomButton>
                            </XStack>


                            <YStack gap="$md">
                                <PriceOverviewRow
                                    label="Hauptgericht"
                                    value={`${orderItem.main_dish?.name ?? "Nicht ausgewählt"} ${orderItem.main_dish?.size ? `(${orderItem.main_dish.size})` : ""}`}
                                    price={totalDishPrice}
                                    type="dish"
                                />
                                {(totalToppingPrice > 0) && (
                                    <PriceOverviewRow
                                        label="Extras"
                                        value={
                                            totalToppingPrice
                                                ? orderItem.toppings.filter(d => (d.values?.price ?? 0) > 0).map((d) => d.values?.name).join(",\n")
                                                : "Keine"
                                        }
                                        price={totalToppingPrice}
                                        type="drink"
                                    />
                                )}
                                {(totalDrinkPrice > 0) && (
                                    <PriceOverviewRow
                                        label="Getränke"
                                        value={
                                            orderItem.drinks?.length
                                                ? orderItem.drinks.map((d) => d.values?.name).join(",\n")
                                                : "Keine"
                                        }
                                        price={totalDrinkPrice}
                                        type="drink"
                                    />
                                )}
                            </YStack>

                            {index < order.order_items.length - 1 && (
                                <Separator borderColor="$borderDark" marginTop="$lg" />
                            )}
                        </YStack>)
                })
            }
        </YStack >
    );
}

