import { SingleOrder, updateOrderState } from "@/db";
import { FontAwesome5, MaterialIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { Spinner, Text, XStack, YStack } from "tamagui";
import { CustomButton } from "../ui";
import { DeleteOrderButton } from "../ui/buttons/delete-order-button";
import { PriceBlock, Totals } from "./price-block";

interface PriceOverviewHeaderProps {
  order: SingleOrder;
  grandTotal: number;
  isLoading: boolean;
  totals: Totals;
  refetch: () => void;
}

export function PriceOverviewHeader(props: PriceOverviewHeaderProps) {
  return (
    <YStack gap="$lg">
      <XStack
        justifyContent="space-between"
        marginTop="$sm"
        alignItems="center"
      >
        <XStack gap="$md" alignItems="center">
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

        <XStack gap="$sm" alignItems="center">
          <CustomButton
            outlined
            iconOnly
            disabled={props.isLoading}
            alignSelf="flex-end"
            onPress={() =>
              updateOrderState(props.order.id, "IN_PROGRESS", props.refetch)
            }
            icon={
              props.isLoading ? (
                <Spinner size="small" color="$text" />
              ) : (
                <FontAwesome5 name="undo-alt" size={20} />
              )
            }
          />

          <DeleteOrderButton
            id={props.order.id}
            isLoading={props.isLoading}
            refetch={props.refetch}
          />
        </XStack>
      </XStack>

      <PriceBlock totals={props.totals} />
    </YStack>
  );
}
