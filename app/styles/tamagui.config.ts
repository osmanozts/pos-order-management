import { createFont, createTamagui, createTokens } from "tamagui";
import { createAnimations } from "@tamagui/animations-moti";

export const tokens = createTokens({
  size: {
    xxs: 5,
    xs: 10,
    sm: 45,
    md: 90,
    lg: 120,
    xl: 240,
    xxl: 360,
    xxxl: 400,
    max: 600,

    buttonXs: 28,
    buttonSm: 45,
    buttonMd: 60,
    buttonLg: 75,

    iconXxs: 9,
    iconXs: 18,
    iconSm: 22,
    iconMd: 26,
    iconLg: 32,

    // borderradius
    radiusNone: 0,
    radiusSm: 6,
    radiusMd: 8,
    radiusLg: 12,
    radiusXl: 16,
    roundy: 24,
    round: 100,

    // fontweights
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",

    true: 120,
  },
  space: {
    none: 0,
    xs: 4,
    sm: 8,
    md: 12,
    lg: 16,
    xl: 20,
    "2xl": 24,
    "3xl": 28,
    "4xl": 32,
    "5xl": 36,
    true: 8,
  },
  radius: {
    radiusNone: 0,
    radiusSm: 6,
    radiusMd: 8,
    radiusLg: 12,
    radiusXl: 16,
    roundy: 24,
    round: 9999,
  },
  zIndex: {
    xs: 10,
    sm: 100,
    md: 1000,
  },
  color: {
    white: "#FFFFFF",
    black: "#000000",

    gray50: "#F5F7FA",
    gray100: "#E9EDF5",
    gray200: "#DDE3ED",

    gray900: "#1A1D21",
    gray700: "#4A5568",
    gray500: "#94A3B8",
    gray400: "#A0AEC0",
    gray300: "#F0F0F0",

    blueGray50: "#FAFAFA",
    blueGray100: "#FFFFFF",
    blueGray200: "#FEEBED",
    blueGray300: "#E5EAF2",

    red500: "#F85F6A",
    red100: "#F85F6A20",
    green500: "#22C55E",
    green100: "#22C55E20",
    yellow400: "#FACC15",
    red600: "#F43F5E",
  },
});

const baseFontProps = {
  size: {
    textXs: 14,
    textSm: 16,
    textBase: 18,
    textLg: 20,
    headingSm: 22,
    headingMd: 24,
    headingLg: 26,
    headingXl: 28,
    display: 30,
    true: 18,
  },
  lineHeight: {
    1: 20,
    2: 24,
    3: 28,
    true: 24,
  },
  weight: {
    regular: "400",
    medium: "500",
    semibold: "600",
    bold: "700",
    true: "500",
  },
};

// Theme-Definition
const tamaguiConfig = createTamagui({
  fonts: {
    heading: createFont({
      family: "Poppins, Helvetica, Arial, sans-serif",
      ...baseFontProps,
    }),
    body: createFont({
      family: "Inter, Helvetica, Arial, sans-serif",
      ...baseFontProps,
    }),
  },
  tokens,

  themes: {
    light: {
      bg: tokens.color.gray50,
      bgSecondary: tokens.color.gray100,
      bgTertiary: tokens.color.gray200,

      surface: tokens.color.blueGray100,
      surfaceSecondary: tokens.color.blueGray50,
      surfaceHover: tokens.color.blueGray200,
      surfaceActive: tokens.color.blueGray300,

      text: tokens.color.gray900,
      textSecondary: tokens.color.gray700,
      invertedText: tokens.color.white,
      disabledText: tokens.color.gray400,

      accent: tokens.color.red500,
      accentBg: tokens.color.red100,
      success: tokens.color.green500,
      successBg: tokens.color.green100,
      warning: tokens.color.yellow400,
      error: tokens.color.red600,

      borderLight: tokens.color.gray300,
      borderDark: tokens.color.gray500,

      indicator: tokens.color.red100,
      indicatorActive: tokens.color.red500,
    },

    dark: {
      bg: tokens.color.gray50,
      bgSecondary: tokens.color.gray100,
      bgTertiary: tokens.color.gray200,

      surface: tokens.color.blueGray100,
      surfaceSecondary: tokens.color.blueGray50,
      surfaceHover: tokens.color.blueGray200,
      surfaceActive: tokens.color.blueGray300,

      text: tokens.color.gray900,
      textSecondary: tokens.color.gray700,
      invertedText: tokens.color.white,
      disabledText: tokens.color.gray400,

      accent: tokens.color.red500,
      accentBg: tokens.color.red100,
      success: tokens.color.green500,
      successBg: tokens.color.green100,
      warning: tokens.color.yellow400,
      error: tokens.color.red600,

      borderLight: tokens.color.gray300,
      borderDark: tokens.color.gray500,

      indicator: tokens.color.red100,
      indicatorActive: tokens.color.red500,
    },
  },

  media: {
    sm: { maxWidth: 860 },
    gtSm: { minWidth: 861 },
    short: { maxHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  },

  shorthands: {
    px: "paddingHorizontal",
    py: "paddingVertical",
    mx: "marginHorizontal",
    my: "marginVertical",
    f: "flex",
    w: "width",
    h: "height",
  } as const,

  animations: createAnimations({
    fast: {
      type: "spring",
      damping: 20,
      mass: 1.2,
      stiffness: 250,
    },
    medium: {
      type: "spring",
      damping: 10,
      mass: 0.9,
      stiffness: 100,
    },
    slow: {
      type: "spring",
      damping: 20,
      stiffness: 60,
    },
  }),
});

export default tamaguiConfig;
