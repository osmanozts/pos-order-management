import { PriceOverview } from "@/components";
import { supabase, useFinishedOrders } from "@/db";
import { useFocusEffect } from "@react-navigation/native";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Text, XStack, YStack } from "tamagui";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const DEFAULT_PFAND = 0.25;

const Checkout = () => {
  const insets = useSafeAreaInsets();
  const scrollRef = useRef<ScrollView>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / (SCREEN_WIDTH * 0.8 + 16));
    setCurrentIndex(index);
  };

  const { data: orders, refetch, isLoading } = useFinishedOrders();

  useEffect(() => {
    const orderChannel = supabase
      .channel("order_paid_state_listener")
      .on(
        "postgres_changes",
        { event: "UPDATE", schema: "public", table: "orders" },
        () => {
          refetch();
        },
      )
      .subscribe();

    return () => {
      orderChannel.unsubscribe();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  const getItemTotals = (orderItem: any) => {
    const isPaid = orderItem.state === "PAID";

    const dish = isPaid ? 0 : orderItem.main_dish?.price ?? 0;

    const toppings = isPaid
      ? 0
      : orderItem.toppings.reduce(
          (sum: number, t: any) => sum + (t.values?.price ?? 0),
          0,
        );

    const drinksSum = isPaid
      ? 0
      : orderItem.drinks.reduce(
          (sum: number, d: any) => sum + (d.values?.price ?? 0),
          0,
        );

    const pfand = isPaid
      ? 0
      : orderItem.drinks.reduce((sum: number, drink: any) => {
          const hasPfand = drink?.values.has_pfand;
          if (!hasPfand) return sum + 0;
          return sum + DEFAULT_PFAND;
        }, 0);

    const subtotal = dish + toppings + drinksSum;
    const grand = subtotal + pfand;
    return { dish, toppings, drinksSum, pfand, subtotal, grand };
  };

  return (
    <YStack
      flex={1}
      backgroundColor="$bgPrimary"
      paddingTop={insets.top}
      paddingHorizontal="$md"
      gap="$md"
    >
      {orders && orders.length > 0 && (
        <XStack
          justifyContent="center"
          alignItems="center"
          marginVertical="$lg"
          gap="$xs"
        >
          {orders.map((_, index) => (
            <YStack
              key={index}
              width="$xxs"
              height="$xxs"
              borderRadius="$round"
              backgroundColor={currentIndex === index ? "$accent" : "grey"}
            />
          ))}
        </XStack>
      )}

      {orders && orders.length > 0 ? (
        <ScrollView
          ref={scrollRef}
          horizontal
          onScroll={handleScroll}
          scrollEventThrottle={16}
          contentContainerStyle={{
            flexGrow: 1,
          }}
          showsHorizontalScrollIndicator={false}
        >
          <ScrollView
            contentContainerStyle={{
              flexDirection: "row",
              flexWrap: "nowrap",
              gap: "$lg",
              paddingBottom: "$lg",
            }}
            showsVerticalScrollIndicator={false}
          >
            {orders.map((order, index) => {
              const totals = order.order_items.reduce(
                (acc: any, item: any) => {
                  const t = getItemTotals(item);
                  acc.subtotal += t.subtotal;
                  acc.pfand += t.pfand;
                  acc.grand += t.grand;
                  return acc;
                },
                { subtotal: 0, pfand: 0, grand: 0 },
              );

              return (
                <PriceOverview
                  key={index}
                  order={order}
                  isLoading={isLoading}
                  refetch={() => refetch()}
                  totals={totals}
                  getItemTotals={getItemTotals}
                />
              );
            })}
          </ScrollView>
        </ScrollView>
      ) : (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Text fontWeight="bold" fontSize={26} color="$textSecondary">
            Keine offenen Rechnungen
          </Text>
        </YStack>
      )}
    </YStack>
  );
};

export default Checkout;
