import { Button, styled } from "tamagui";

export const CustomButton = styled(Button, {
    name: "CustomButton",
    borderRadius: "$2",

    fontWeight: "bold",
    height: "$2",
    color: "$textInverted",
    backgroundColor: "$accent",
    pressStyle: {
        backgroundColor: "$successHover"
    },
});
