import { deleteOrder, SingleOrder } from "@/db";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import { Spinner, Text, XStack } from "tamagui";
import { CustomButton } from "../ui";
import dayjs from "dayjs";

interface PriceOverviewHeaderProps {
    order: SingleOrder;
    totalPrice: number;
    isLoading: boolean;
    refetch: () => void;
}


export function PriceOverviewHeader(props: PriceOverviewHeaderProps) {
    return (<XStack justifyContent="space-between" marginTop="$sm" alignItems="center">
        <XStack gap="$md">
            <XStack gap="$xs">
                <MaterialIcons name="table-restaurant" size={24} color="grey" />
                <Text fontSize="$xl" fontWeight="400" color="$textSecondary">
                    {props.order.placement}
                </Text>
            </XStack>

            <XStack gap="$xs">
                <MaterialIcons name="timelapse" size={24} color="grey" />
                <Text fontSize="$xl" fontWeight="400" color="$textSecondary">
                    {dayjs(props.order.created_at).format("HH:mm")}
                </Text>
            </XStack>
        </XStack>

        <XStack gap="$md" alignItems="center">
            <XStack gap="$xs">
                <Text color="$accent"><FontAwesome5 name="coins" size={20} /></Text>
                <Text fontSize="$xl" fontWeight="700" color="$textSecondary">
                    {props.totalPrice}€
                </Text>
            </XStack>

            <CustomButton width="$sm" icon={<Text><FontAwesome5 name="trash" size={20} /></Text>} alignSelf="flex-end" backgroundColor="$accentBg" color="$accent" onPress={() => deleteOrder(props.order.id, props.refetch)}>
                {props.isLoading && <Spinner color="$invertedText" />}
            </CustomButton>
        </XStack>
    </XStack>);
}