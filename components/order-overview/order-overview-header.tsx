import { SingleOrder, updateOrderState } from "@/db";
import { MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useRouter } from "expo-router";
import { Spinner, Text, XStack } from "tamagui";
import { CustomButton } from "../ui";

interface OrderOverviewHeaderProps {
  order: SingleOrder;
  isLoading: boolean;
  refetch: () => void;
}

export function OrderOverviewHeader(props: OrderOverviewHeaderProps) {
  const router = useRouter();

  return (
    <XStack justifyContent="space-between" alignItems="center" marginTop="$sm">
      <XStack gap="$md">
        <XStack gap="$xs" alignItems="center">
          <Text color="$textSecondary">
            <MaterialIcons name="table-restaurant" size={24} />
          </Text>
          <Text fontSize="$xl" fontWeight="400" color="$textSecondary">
            {props.order.placement}
          </Text>
        </XStack>

        <XStack gap="$xs" alignItems="center">
          <Text color="$textSecondary">
            <MaterialIcons name="timelapse" size={24} />
          </Text>
          <Text fontSize="$xl" fontWeight="400" color="$textSecondary">
            {dayjs(props.order.created_at).format("HH:mm")}
          </Text>
        </XStack>
      </XStack>

      <XStack gap="$sm">
        <CustomButton
          outlined
          iconOnly
          disabled={props.isLoading}
          alignSelf="flex-end"
          onPress={() => router.replace(`/edit-order/${props.order.id}`)}
          icon={
            props.isLoading ? (
              <Spinner size="small" />
            ) : (
              <MaterialIcons name="edit" size={20} />
            )
          }
        />

        <CustomButton
          success
          iconOnly
          disabled={props.isLoading}
          alignSelf="flex-end"
          onPress={() =>
            updateOrderState(props.order.id, "DONE", props.refetch)
          }
          icon={
            props.isLoading ? (
              <Spinner size="small" />
            ) : (
              <MaterialIcons name="forward" size={20} />
            )
          }
        />
      </XStack>
    </XStack>
  );
}
