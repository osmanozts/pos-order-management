import { Button, styled } from "tamagui";

export const CustomButton = styled(Button, {
    name: "CustomButton",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "$accent",
    paddingVertical: "$md",
    borderRadius: "$radiusSm",
    pressStyle: { scale: 0.95 },
    fontWeight: "$bold",
    maxHeight: "$sm",
    color: "$invertedText",

    variants: {
        success: {
            true: {
                backgroundColor: "$success",
            },
        },
        warning: {
            true: {
                backgroundColor: "$warning",
            }
        }
    }
});
