import { Button, GetProps, styled } from "tamagui";

export const CustomButton = styled(Button, {
  name: "CustomButton",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$radiusSm",
  borderWidth: 0,
  pressStyle: { scale: 0.97 },
  gap: "$xs",

  height: "$buttonSm",
  paddingHorizontal: "$lg",

  fontSize: "$lg",
  fontWeight: "600",

  variants: {
    primary: {
      true: {
        backgroundColor: "$accent",
        color: "$invertedText",
      },
    },

    secondary: {
      true: {
        backgroundColor: "$surface",
        color: "$text",
        borderWidth: 1,
        borderColor: "$borderLight",
      },
    },

    outlined: {
      true: {
        backgroundColor: "transparent",
        color: "$text",
        borderWidth: 1,
        borderColor: "$borderDark",
      },
    },

    ghost: {
      true: {
        backgroundColor: "transparent",
        color: "$textSecondary",
        borderWidth: 0,
      },
    },

    success: {
      true: {
        backgroundColor: "$success",
        color: "$invertedText",
      },
    },

    warning: {
      true: {
        backgroundColor: "$warning",
        color: "$text",
      },
    },

    danger: {
      true: {
        backgroundColor: "$error",
        color: "$invertedText",
      },
    },

    info: {
      true: {
        backgroundColor: "$surfaceActive",
        color: "$text",
      },
    },

    medium: {
      true: {
        height: "$buttonMd",
        paddingHorizontal: "$md",
      },
    },

    large: {
      true: {
        height: "$buttonLg",
        paddingHorizontal: "$lg",
      },
    },

    iconOnly: {
      true: {
        paddingHorizontal: 0,
        width: "$buttonSm",
        minWidth: "$buttonSm",
        justifyContent: "center",
      },
    },

    fullWidth: {
      true: {
        width: "100%",
      },
    },

    subtle: {
      true: {
        backgroundColor: "$surfaceSecondary",
        color: "$text",
        borderWidth: 1,
        borderColor: "$borderLight",
      },
    },
  },

  defaultVariants: {
    primary: true,
  },
} as const);

export type CustomButtonProps = GetProps<typeof CustomButton>;
