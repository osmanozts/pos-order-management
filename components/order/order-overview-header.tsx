import { MaterialIcons } from "@expo/vector-icons";
import { Spinner, Text, XStack } from "tamagui";
import { CustomButton } from "../ui";
import dayjs from "dayjs";
import { SingleOrder, updateOrderState } from "@/db";
import { useRouter } from "expo-router";

interface OrderOverviewHeaderProps {
    order: SingleOrder;
    isLoading: boolean;
    refetch: () => void;
}


export function OrderOverviewHeader(props: OrderOverviewHeaderProps) {
    const router = useRouter();

    return (<XStack justifyContent="space-between" alignItems="center" marginTop="$sm">
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

        <XStack gap="$sm">
            <CustomButton width="$sm" info icon={!props.isLoading ? <Text ><MaterialIcons name="edit" size={24} /></Text> : undefined} alignSelf="flex-end" backgroundColor="$successBg" onPress={() => router.replace(`/edit-order/${JSON.stringify(props.order)}`)}>
                {props.isLoading && <Spinner color="$invertedText" />}
            </CustomButton>

            <CustomButton width="$sm" icon={!props.isLoading ? <Text><MaterialIcons name="forward" size={24} /></Text> : undefined} alignSelf="flex-end" backgroundColor="$successBg" color="$success" onPress={() => updateOrderState(props.order.id, "DONE", props.refetch)}>
                {props.isLoading && <Spinner color="$invertedText" />}
            </CustomButton>
        </XStack>
    </XStack >);
}