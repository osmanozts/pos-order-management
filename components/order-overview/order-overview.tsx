import { SingleOrder, updateOrderItemState } from "@/db";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Separator, Spinner, Stack, Text, XStack, YStack } from "tamagui";
import { CustomButton } from "../ui";
import { OrderOverviewHeader } from "./order-overview-header";
import { OrderOverviewRow } from "./order-overview-row";
import { FontAwesome5 } from "@expo/vector-icons";

interface OrderOverviewProps {
  order: SingleOrder;
  isLoading: boolean;
  refetch: () => void;
}

export function OrderOverview({
  order,
  isLoading,
  refetch,
}: OrderOverviewProps) {
  return (
    <YStack
      key={order.id}
      borderRadius="$radiusLg"
      backgroundColor="$surface"
      padding="$xl"
      gap="$xl"
      borderWidth={1}
      borderColor="$borderLight"
      shadowColor="$shadow"
      shadowOffset={{ width: 0, height: 6 }}
      shadowRadius={16}
      width="$xxl"
      maxWidth="$xxxl"
    >
      <OrderOverviewHeader
        order={order}
        isLoading={isLoading}
        refetch={refetch}
      />

      <Separator borderColor="$borderDark" marginBottom="$sm" />

      {order.order_items.map((orderItem, index) => {
        const isDone = orderItem.state === "DONE";

        return (
          <YStack key={index} gap="$lg">
            <XStack justifyContent="space-between" alignItems="center">
              <XStack gap="$sm" alignItems="center">
                <XStack gap="$xs" alignItems="center">
                  <Text color="$textSecondary">
                    <MaterialIcons name="person" size={24} />
                  </Text>
                  <Text fontSize="$xl" fontWeight="700" color="$textSecondary">
                    {index + 1}
                  </Text>
                </XStack>

                {isDone && (
                  <Stack
                    borderRadius="$radiusSm"
                    backgroundColor="$accentBg"
                    padding="$xs"
                  >
                    <Text color="$accent" fontSize={14}>
                      Fertig
                    </Text>
                  </Stack>
                )}
              </XStack>

              <CustomButton
                iconOnly
                success={!isDone}
                outlined={isDone}
                disabled={isLoading}
                alignSelf="flex-end"
                onPress={() =>
                  updateOrderItemState(
                    orderItem.id,
                    isDone ? "IN_PROGRESS" : "DONE",
                    refetch,
                  )
                }
                icon={
                  isLoading ? (
                    <Spinner
                      size="small"
                      color={isDone ? "$text" : "$invertedText"}
                    />
                  ) : isDone ? (
                    <FontAwesome5 name="undo-alt" size={20} />
                  ) : (
                      <MaterialIcons name="check-circle" size={20} />
                  )
                }
              />
            </XStack>

            <YStack gap="$md">
              <OrderOverviewRow
                label="Hauptgericht"
                value={`${orderItem.main_dish?.name ?? "Nicht ausgewählt"} ${
                  orderItem.main_dish?.size
                    ? `(${orderItem.main_dish.size})`
                    : ""
                }`}
                type="dish"
              />

              {orderItem.toppings.length > 0 && (
                <OrderOverviewRow
                  label="Toppings"
                  value={orderItem.toppings
                    .map((t) => `- ${t.values?.name}`)
                    .join(",\n")}
                  type="topping"
                />
              )}

              {orderItem.note && (
                <OrderOverviewRow
                  label="Notiz"
                  value={orderItem.note}
                  type="note"
                />
              )}
            </YStack>

            <Separator borderColor="$borderDark" marginTop="$lg" />
          </YStack>
        );
      })}

      {order.order_items.map((orderItem, idx) => {
        return (
          orderItem.drinks.length > 0 && (
            <OrderOverviewRow
              key={`drinks-${idx}`}
              label="Getränke"
              value={orderItem.drinks.map((d) => d.values?.name).join(",\n")}
              type="drink"
            />
          )
        );
      })}
    </YStack>
  );
}
