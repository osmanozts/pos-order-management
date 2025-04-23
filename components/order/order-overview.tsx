import { SingleOrder } from "@/db";
import { ScrollView, Separator, Stack, Text, YStack } from "tamagui";

interface OrderOverview {
    order: SingleOrder;
}

export function OrderOverview({ order }: OrderOverview) {
    return (
        <YStack
            backgroundColor="$surface"
            borderRadius="$4"
            padding="$5"
            gap="$2"
            shadowColor="rgba(0,0,0,0.05)"
            shadowOffset={{ width: 0, height: 1 }}
            shadowRadius={3}
            borderWidth={1}
            borderColor="$borderLight"
        >

            {order.order_items.map((order, index) => (
                <Stack>
                    <Text fontSize="$6" fontWeight="600" color="$text">
                        Person {index + 1}
                    </Text>
                    <Text fontSize="$6" fontWeight="400" color="$text">
                        Hauptgericht: {order.main_dish?.name}
                    </Text>

                    {order.toppings.map((topping) =>
                        <Text fontSize="$6" fontWeight="400" color="$text">
                            {topping.values?.name}
                        </Text>
                    )
                    }
                    {order.drinks.map((drink) =>
                        <Text fontSize="$6" fontWeight="400" color="$text">
                            {drink.values?.name}
                        </Text>
                    )
                    }
                    <Separator marginVertical="$4" />
                </Stack>
            ))
            }



        </YStack>
    )
}