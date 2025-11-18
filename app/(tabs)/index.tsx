import { CustomButton, OrderOverview } from "@/components";
import { supabase, useOrders } from "@/db";
import { useFocusEffect } from "@react-navigation/native";
import { useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, Text, XStack, YStack } from "tamagui";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Kitchen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  const scrollRef = useRef<ScrollView>(null);

  const [currentIndex, setCurrentIndex] = useState(0);
  const handleScroll = (event: any) => {
    const x = event.nativeEvent.contentOffset.x;
    const index = Math.round(x / (SCREEN_WIDTH * 0.8 + 16));
    setCurrentIndex(index);
  };

  const { data: orders, refetch, isLoading } = useOrders();

  useEffect(() => {
    const insertChannel = supabase
      .channel("order_insert_done_listener")
      .on(
        "postgres_changes",
        { event: "INSERT", schema: "public", table: "order_insert_done" },
        () => {
          refetch();
        },
      )
      .subscribe();

    return () => {
      insertChannel.unsubscribe();
    };
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      refetch();
    }, []),
  );

  return (
    <YStack
      flex={1}
      backgroundColor="$bgPrimary"
      paddingTop={insets.top}
      paddingHorizontal="$md"
      gap="$md"
    >
      <CustomButton
        marginBottom="$md"
        onPress={() => router.replace("/new-order")}
      >
        Neue Bestellung
      </CustomButton>

      {orders && orders.length > 0 && (
        <XStack
          justifyContent="center"
          alignItems="center"
          marginBottom="$sm"
          gap="$xs"
        >
          {orders.map((order, index) => {
            const isActive = currentIndex === index;
            return (
              <YStack
                key={index}
                width="$s"
                height="$s"
                borderRadius="$round"
                alignItems="center"
                justifyContent="center"
                backgroundColor={isActive ? "$accent" : "$surfaceActive"}
              >
                <Text color={isActive ? "$invertedText" : "text"}>
                  {order.placement}
                </Text>
              </YStack>
            );
          })}
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
            {orders?.map((order, index) => (
              <OrderOverview
                key={index}
                order={order}
                isLoading={isLoading}
                refetch={() => refetch()}
              />
            ))}
          </ScrollView>
        </ScrollView>
      ) : (
        <YStack flex={1} justifyContent="center" alignItems="center">
          <Text fontWeight="bold" fontSize={26} color="$textSecondary">
            Keine offenen Bestellungen
          </Text>
        </YStack>
      )}
    </YStack>
  );
};

export default Kitchen;
