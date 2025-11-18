import { OrderEditor } from "@/components";
import { createOrder } from "@/db/mutations";
import { useRouter } from "expo-router";

export default function NewOrderScreen() {
  const router = useRouter();

  return (
    <OrderEditor
      mode="create"
      onSubmit={async (payload) => {
        await createOrder(payload.items, payload.placement!);
        router.replace("/(tabs)");
      }}
    />
  );
}
