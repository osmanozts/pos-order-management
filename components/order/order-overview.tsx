import { SingleOrder, updateOrderItemState, updateOrderState } from "@/db";
import { Utensils, CupSoda, Plus, Save, CheckCircle2, Forward, CheckCheck, Cross, X } from "@tamagui/lucide-icons";
import { Separator, Text, XStack, YStack, Stack, Spinner } from "tamagui";
import { OrderOverviewRow } from "./order-overview-row";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { CustomButton } from "../ui";
import dayjs from 'dayjs';

const iconMap = {
    dish: Utensils,
    topping: Plus,
    drink: CupSoda,
};

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
            borderColor="#ECECEC"
            shadowColor="rgba(0,0,0,0.06)"
            shadowOffset={{ width: 0, height: 6 }}
            shadowRadius={16}
            width="$xxl" // oder maxWidth="$20"
            maxWidth="$xxxl"
        >

            <XStack justifyContent="space-between" alignItems="center" marginTop="$sm">
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

                <CustomButton
                    width="$sm"
                    icon={!isLoading ? <Forward size={24} /> : undefined}
                    alignSelf="flex-end"
                    backgroundColor="$successBg"
                    color="$success"
                    onPress={() => updateOrderState(order.id, "DONE", refetch)}>
                    {isLoading && <Spinner color="$invertedText" />}
                </CustomButton>
            </XStack>

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
                            icon={!(orderItem.state === "DONE") ? <CheckCheck size={24} /> : <X size={24} />}
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
                        <OrderOverviewRow
                            label="Toppings"
                            value={
                                orderItem.toppings?.length
                                    ? orderItem.toppings.map((t) => `- ${t.values?.name}`).join(",\n")
                                    : "Keine"
                            }
                            type="topping"
                        />

                        {orderItem.drinks.length > 0 && (
                            <OrderOverviewRow
                                label="Getränke"
                                value={
                                    orderItem.drinks?.length
                                        ? orderItem.drinks.map((d) => d.values?.name).join(",\n")
                                        : "Keine"
                                }
                                type="drink"
                            />
                        )}

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

                    {/* Optional Separator zwischen Personen */}
                    {index < order.order_items.length - 1 && (
                        <Separator borderColor="$borderDark" marginTop="$lg" />
                    )}
                </YStack>
            ))}
        </YStack>
    );
}

