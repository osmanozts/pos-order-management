import { deleteOrder } from "@/db";
import { FontAwesome5 } from "@expo/vector-icons";
import React, { useState } from "react";
import { Spinner, Stack, Text } from "tamagui";
import { ConfirmDeleteDialog } from "../dialogs";
import { CustomButton } from "./custom-button";

export const DeleteOrderButton = ({
  id,
  isLoading,
  refetch,
}: {
  id: string;
  refetch: () => void;
  isLoading: boolean;
}) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  return (
    <Stack>
      <CustomButton
        danger
        iconOnly
        disabled={isLoading}
        alignSelf="flex-end"
        onPress={() => setIsDialogVisible(true)}
        icon={
          isLoading ? (
            <Spinner size="small" color="$invertedText" />
          ) : (
            <FontAwesome5 name="trash" size={20} />
          )
        }
      />

      <ConfirmDeleteDialog
        visible={isDialogVisible}
        onCancel={() => setIsDialogVisible(false)}
        onDelete={async () => {
          await deleteOrder(id, refetch);
          setIsDialogVisible(false);
        }}
      />
    </Stack>
  );
};
