import { SingleOrder, updateOrderItemState } from "@/db";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { Separator, Spinner, Stack, Text, XStack, YStack } from "tamagui";
import { CustomButton } from "../ui";
import { Totals } from "./price-block";
import { PriceOverviewHeader } from "./price-overview-header";
import { PriceOverviewRow } from "./prive-overview-row";
import { FontAwesome5 } from "@expo/vector-icons";

interface Props {
  order: SingleOrder;
  totals: Totals;
  isLoading: boolean;
  refetch: () => void;
  getItemTotals: (orderItem: any) => {
    dish: number;
    toppings: number;
    drinksSum: number;
    pfand: number;
    subtotal: number;
    grand: number;
  };
}

export function PriceOverview({
  order,
  totals,
  isLoading,
  refetch,
  getItemTotals,
}: Props) {
  return (
    <YStack
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
      <PriceOverviewHeader
        order={order}
        isLoading={isLoading}
        refetch={refetch}
        grandTotal={totals.grand}
        totals={totals}
      />

      <Separator borderColor="$borderDark" marginVertical="$xs" />

      {order.order_items.map((orderItem, index) => {
        const { dish, toppings, drinksSum, pfand, subtotal, grand } =
          getItemTotals(orderItem);

        const isDone = orderItem.state === "DONE";

        return (
          <YStack key={index} gap="$lg">
            <XStack justifyContent="space-between" alignItems="center">
              <XStack gap="$lg" alignItems="center">
                <XStack gap="$xs" alignItems="center">
                  <MaterialIcons name="person" size={20} color="grey" />
                  <Text fontSize="$xl" fontWeight="700" color="$textSecondary">
                    Person {index + 1}
                  </Text>
                </XStack>

                {orderItem.state === "PAID" && (
                  <Stack
                    borderRadius="$xs"
                    backgroundColor="$accentBg"
                    padding="$xs"
                  >
                    <Text color="$accent" fontSize={14}>
                      Bezahlt
                    </Text>
                  </Stack>
                )}
              </XStack>

              <CustomButton
                success={isDone}
                outlined={!isDone}
                icon={
                  orderItem.state === "DONE" ? (
                    <MaterialIcons name="check-circle" size={20} />
                  ) : (
                    <FontAwesome5 name="undo-alt" size={20} />
                  )
                }
                alignSelf="flex-end"
                onPress={() =>
                  updateOrderItemState(
                    orderItem.id,
                    orderItem.state === "DONE" ? "PAID" : "DONE",
                    refetch,
                  )
                }
              >
                {isLoading && <Spinner color="$invertedText" />}
              </CustomButton>
            </XStack>

            <YStack gap="$md">
              <PriceOverviewRow
                label="Hauptgericht"
                value={`${orderItem.main_dish?.name ?? "Nicht ausgewählt"} ${
                  orderItem.main_dish?.size
                    ? `(${orderItem.main_dish.size})`
                    : ""
                }`}
                price={dish}
                type="dish"
              />

              {toppings > 0 && (
                <PriceOverviewRow
                  label="Extras"
                  value={
                    toppings
                      ? orderItem.toppings
                          .filter((d: any) => (d.values?.price ?? 0) > 0)
                          .map((d: any) => d.values?.name)
                          .join(",\n")
                      : "Keine"
                  }
                  price={toppings}
                  type="dish"
                />
              )}

              {(drinksSum > 0 || pfand > 0) && (
                <PriceOverviewRow
                  label="Getränke"
                  value={
                    orderItem.drinks?.length
                      ? orderItem.drinks
                          .map((d: any) => d.values?.name)
                          .join(",\n")
                      : "Keine"
                  }
                  price={drinksSum}
                  type="drink"
                  pfand={pfand}
                />
              )}

              <XStack
                marginTop="$lg"
                gap="$lg"
                justifyContent="flex-end"
                alignItems="center"
              >
                {pfand > 0 && (
                  <>
                    <Text fontWeight="$bold">{subtotal.toFixed(2)} €</Text>
                  </>
                )}
                {pfand > 0 && (
                  <>
                    <Text color="$textSecondary">+ Pfand:</Text>
                    <Text fontWeight="$bold">{pfand.toFixed(2)} €</Text>
                  </>
                )}
                <Text color="$textSecondary">=</Text>
                <Text fontWeight="$bold" color="$accent">
                  {grand.toFixed(2)} €
                </Text>
              </XStack>
            </YStack>

            {index < order.order_items.length - 1 && (
              <Separator borderColor="$borderDark" marginTop="$lg" />
            )}
          </YStack>
        );
      })}
    </YStack>
  );
}
