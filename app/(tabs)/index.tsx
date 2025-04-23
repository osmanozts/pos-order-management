// index.ts
import { CustomButton, OrderOverview } from "@/components";
import { useNavigation, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { ScrollView, YStack } from "tamagui";
import { useOrders } from "@/db";

const OrderTaking = () => {
    const router = useRouter()
    const insets = useSafeAreaInsets();
    const { data: orders } = useOrders()

    return (
        <YStack
            flex={1}
            backgroundColor="$bgPrimary"
            paddingTop={insets.top}
            paddingHorizontal="$4"
            gap="$4"
        >
            <CustomButton marginBottom="$4" onPress={() => router.replace("/new-order")}>Bestellung hinzufügen</CustomButton>

            <ScrollView contentContainerStyle={{ gap: "$6" }}>
                {orders?.map((order) => <OrderOverview order={order} />)}
            </ScrollView>
        </YStack>
    );
};

export default OrderTaking;
