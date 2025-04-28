import { ScrollView } from "tamagui";
import { CategoryChip } from ".";
import { Enums } from "@/db";

interface Props {
    type: "dish" | "topping" | "drink";
    selected: string;
    onSelect: (category: string) => void;
}

export function ChipSelection({ type, selected, onSelect }: Props) {
    const dishCategories: Enums<"main_dish_type">[] = ["menu", "doner", "wraps", "lahmacun", "gratinated", "pide", "pizza", "salads", "soup", "appetizer", "extras", "desserts"]
    const toppingCategories: Enums<"topping_type">[] = ["topping", "supplement", "extra", "exclude_topping", "exclude_supplement"]
    const drinkCategories: Enums<"drink_type">[] = ["alcohol_free"]

    const correctTypes = () => {
        if (type === "dish") return dishCategories
        if (type === "topping") return toppingCategories
        if (type === "drink") return drinkCategories
        else return undefined
    }

    const mapCategory = (category: string): string => {
        const categoryMap: Record<string, string> = {
            // Hauptgerichte
            "menu": "Menü",
            "doner": "Döner",
            "wraps": "Wraps",
            "lahmacun": "Lahmacun",
            "gratinated": "Überbackenes",
            "pide": "Pide",
            "pizza": "Pizza",
            "salads": "Salate",
            "soup": "Suppe",
            "appetizer": "Vorspeise",
            "extras": "Extras",
            "desserts": "Desserts",

            // Toppings
            "topping": "Toppings",
            "supplement": "Beilage",
            "extra": "Extra",
            "exclude_topping": "Ohne Toppings",
            "exclude_supplement": "Ohne Beilage",

            // Getränke
            "alcohol_free": "Alkoholfrei",
        };

        return categoryMap[category] ?? category;
    }


    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            height="$sm"
            paddingHorizontal="$sm"
            contentContainerStyle={{
                alignItems: 'center',
                gap: "$lg",
            }}
        >
            {correctTypes() && correctTypes()?.map((label, index) => (
                <CategoryChip active={label === selected} onPress={() => onSelect(label)} key={index}>{mapCategory(label)}</CategoryChip>
            ))}
        </ScrollView>
    )
}