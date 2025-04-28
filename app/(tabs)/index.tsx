import { ScrollView, Text, XStack, YStack } from "tamagui";
import { CustomButton, OrderOverview } from "@/components";
import { useNavigation, useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { supabase, useOrders } from "@/db";
import LottieView from 'lottie-react-native';
import React, { useEffect, useRef, useState } from "react";
import { Dimensions } from "react-native";
import { useFocusEffect } from "@react-navigation/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

const Kitchen = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const animation = useRef<LottieView>(null);

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
            .channel("orders_insert_listener")
            .on(
                "postgres_changes",
                { event: "INSERT", schema: "public", table: "orders" },
                () => {
                    refetch();
                }
            )
            .subscribe();

        const updateChannel = supabase
            .channel("orders_update_listener")
            .on(
                "postgres_changes",
                { event: "UPDATE", schema: "public", table: "orders" },
                () => {
                    refetch();
                }
            )
            .subscribe();

        return () => {
            console.log("UNSUBSCRIBE")
            insertChannel.unsubscribe();
            updateChannel.unsubscribe();
        };
    }, []);

    useFocusEffect(
        React.useCallback(() => {
            console.log("FOKUSS");
            refetch();
        }, [])
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
                color="$invertedText"
            >
                Bestellung hinzufügen
            </CustomButton>

            {orders && orders.length > 0 && (
                <XStack justifyContent="center" alignItems="center" marginBottom="$sm" gap="$xs">
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
                    <LottieView
                        autoPlay
                        ref={animation}
                        style={{
                            width: 400,
                            height: 400,
                        }}
                        source={require('../../assets/animations/empty.json')}
                    />
                    <Text fontWeight="bold" fontSize={26} color="$textSecondary">
                        Keine offenen Bestellungen
                    </Text>
                </YStack>
            )}
        </YStack>
    );
};

export default Kitchen;
