import { Dish, Drink, Topping } from "@/models";
import { useCallback, useMemo, useState } from "react";
import { OrderFormState } from "./types";

type DialogState = { type: "dish" | "topping" | "drink"; index: number } | null;

type Params = {
  initial?: OrderFormState;
  onSubmit: (payload: OrderFormState) => Promise<void> | void;
};

const EMPTY_FORM: OrderFormState = {
  placement: undefined,
  items: [
    {
      id:
        typeof crypto !== "undefined" && crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now()),
      main_dish: null,
      toppings: [],
      drinks: [],
      note: undefined,
    },
  ],
};

export function useOrderForm({ initial, onSubmit }: Params) {
  const [state, setState] = useState<OrderFormState>(initial ?? EMPTY_FORM);

  const [dialogState, setDialogState] = useState<DialogState>(null);
  const [loading, setLoading] = useState(false);

  const setPlacement = useCallback((placement: any) => {
    setState((prev) => ({ ...prev, placement }));
  }, []);

  const addItem = useCallback(() => {
    setState((prev) => ({
      ...prev,
      items: [
        ...prev.items,
        {
          id:
            typeof crypto !== "undefined" && crypto.randomUUID
              ? crypto.randomUUID()
              : String(Date.now()),
          main_dish: null,
          toppings: [],
          drinks: [],
          note: undefined,
        },
      ],
    }));
  }, []);

  const removeItem = useCallback((index: number) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  }, []);

  const updateNote = useCallback((index: number, note: string) => {
    setState((prev) => ({
      ...prev,
      items: prev.items.map((it, i) => (i === index ? { ...it, note } : it)),
    }));
  }, []);

  const openDialog = useCallback(
    (type: "dish" | "topping" | "drink", index: number) => {
      setDialogState({ type, index });
    },
    [],
  );

  const closeDialog = useCallback(() => {
    setDialogState(null);
  }, []);

  const selectedDialogValue = useMemo(() => {
    if (!dialogState) return null;
    const item = state.items[dialogState.index];
    if (!item) return null;
    switch (dialogState.type) {
      case "dish":
        return item.main_dish;
      case "topping":
        return item.toppings;
      case "drink":
        return item.drinks;
      default:
        return null;
    }
  }, [dialogState, state.items]);

  const selectFromDialog = useCallback(
    (value: Dish | Topping | Drink) => {
      if (!dialogState) return;
      const { type, index } = dialogState;

      setState((prev) => {
        const items = [...prev.items];
        const current = items[index];
        if (!current) return prev;

        if (type === "dish") {
          items[index] = {
            ...current,
            main_dish: value as Dish,
          };
          return { ...prev, items };
        }

        const toggle = <T extends { id: any }>(arr: T[], v: T) => {
          const exists = arr.some((x) => x.id === v.id);
          if (exists) {
            return arr.filter((x) => x.id !== v.id);
          }
          return [...arr, v];
        };

        if (type === "topping") {
          items[index] = {
            ...current,
            toppings: toggle(current.toppings ?? [], value as Topping),
          };
          return { ...prev, items };
        }

        if (type === "drink") {
          items[index] = {
            ...current,
            drinks: toggle(current.drinks ?? [], value as Drink),
          };
          return { ...prev, items };
        }

        return prev;
      });
    },
    [dialogState],
  );

  const submit = useCallback(async () => {
    if (!state.placement) {
      alert("Wähle zuerst eine Position / Tischnummer aus!");
      return;
    }
    setLoading(true);
    try {
      await onSubmit(state);
    } finally {
      setLoading(false);
    }
  }, [state, onSubmit]);

  return {
    state,
    setPlacement,
    addItem,
    removeItem,
    updateNote,
    openDialog,
    closeDialog,
    dialogState,
    selectedDialogValue,
    selectFromDialog,
    submit,
    loading,
  };
}
