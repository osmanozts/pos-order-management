import { SingleOrder, updateOrderItemState, updateOrderState } from "@/db";
import { Separator, Text, XStack, YStack, Stack, Spinner } from "tamagui";
import { OrderOverviewRow } from "./order-overview-row";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomButton } from "../ui";
import dayjs from 'dayjs';
import { OrderOverviewHeader } from "./order-overview-header";

interface OrderOverviewProps {
    order: SingleOrder;
    isLoading: boolean;
    refetch: () => void;
}


export function OrderOverview({ order, isLoading, refetch }: OrderOverviewProps) {

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

            <OrderOverviewHeader order={order} isLoading={isLoading} refetch={refetch}></OrderOverviewHeader>

            <Separator borderColor="$borderDark" marginBottom="$sm" />
            {order.order_items.map((orderItem, index) => (
                <YStack key={index} gap="$lg">
                    <XStack justifyContent="space-between" alignItems="center">

                        <XStack gap="$sm" alignItems="center">
                            <XStack gap="$xs">
                                <MaterialIcons name="person" size={24} color="grey" />
                                <Text fontSize="$xl" fontWeight="700" color="$textSecondary">
                                    {index + 1}
                                </Text>
                            </XStack>
                            {orderItem.state === "DONE" && (
                                <Stack borderRadius="$xs" backgroundColor="$accentBg" padding="$xs">
                                    <Text color="$accent" fontSize={14}>
                                        Fertig
                                    </Text>
                                </Stack>
                            )}
                        </XStack>

                        <CustomButton
                            width="$sm"
                            success={!(orderItem.state === "DONE")}
                            backgroundColor={!(orderItem.state === "DONE") ? "$successBg" : "$accentBg"}
                            color={!(orderItem.state === "DONE") ? "$success" : "$accent"}
                            icon={!(orderItem.state === "DONE") ? <Text><MaterialIcons name="check-circle" size={20} /></Text> : <Text><MaterialIcons name="close" size={24} /></Text>}
                            alignSelf="flex-end"
                            onPress={() => updateOrderItemState(orderItem.id, orderItem.state === "IN_PROGRESS" ? "DONE" : "IN_PROGRESS", refetch)}>
                            {isLoading && <Spinner color="$invertedText" />}
                        </CustomButton>
                    </XStack>


                    <YStack gap="$md">
                        <OrderOverviewRow
                            label="Hauptgericht"
                            value={`${orderItem.main_dish?.name ?? "Nicht ausgewählt"} ${orderItem.main_dish?.size ? `(${orderItem.main_dish.size})` : ""}`}
                            type="dish"

                        />
                        {orderItem.toppings.length > 0 && (
                            <OrderOverviewRow
                                label="Toppings"
                                value={orderItem.toppings.map((t) => `- ${t.values?.name}`).join(",\n")}
                                type="topping"
                            />)}

                        {orderItem.note && (
                            <OrderOverviewRow
                                label="Notiz"
                                value={
                                    orderItem.note
                                }
                                type="drink"
                            />
                        )}
                    </YStack>

                    <Separator borderColor="$borderDark" marginTop="$lg" />
                </YStack>
            ))}

            {order.order_items.map((orderItem) => {
                return (

                    orderItem.drinks.length > 0 && (
                        <OrderOverviewRow
                            label="Getränke"
                            value={orderItem.drinks.map((d) => d.values?.name).join(",\n")
                            }
                            type="drink"
                        />
                    )
                )

            })}
        </YStack>
    );
}

