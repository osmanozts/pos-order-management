import { Button, styled } from "tamagui";

export const CategoryChip = styled(Button, {
    name: "CategoryChip",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$accentBg",
    borderRadius: "$radiusXl",
    pressStyle: { scale: 0.95 },
    maxHeight: "$sm",
    fontSize: 16,
    fontWeight: "$regular",
    color: "$accent",

    variants: {
        active: {
            true: {
                backgroundColor: "$successBg",
                color: "$success",
            },
        },
    }
});
