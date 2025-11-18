import { createFont, createTamagui, createTokens } from "tamagui";

export const tokens = createTokens({
  size: {
    xxs: 5,
    xs: 10,
    s: 24,
    sm: 48,
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

    radiusNone: 0,
    radiusSm: 6,
    radiusMd: 8,
    radiusLg: 12,
    radiusXl: 16,
    roundy: 24,
    round: 9999,

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
      // Backgrounds
      bgPrimary: "#F5F7FA",
      bgSecondary: "#E9EDF5",
      bgTertiary: "#DDE3ED",

      // Surfaces
      surface: "#FFFFFF",
      surfaceSecondary: "#FAFAFA",
      surfaceHover: "#FEEBED",
      surfaceActive: "#E5EAF2",

      // Text
      text: "#1A1D21",
      textSecondary: "#4A5568",
      invertedText: "#FFFFFF",
      disabledText: "#A0AEC0",

      // Status / Feedback
      accent: "#F85F6A",
      accentBg: "#F85F6A20",
      success: "#22C55E",
      successBg: "#22C55E20",
      warning: "#FACC15",
      error: "#F85F6A",

      // Borders
      borderLight: "#F0F0F0",
      borderDark: "#94A3B8",

      // Indicators
      indicator: "#F85F6A20",
      indicatorActive: "#F85F6A",

      // Overlays
      overlay: "rgba(0,0,0,0.5)",
      
      // Shadows
      shadow: "rgba(0,0,0,0.1)",

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
});

export default tamaguiConfig;
