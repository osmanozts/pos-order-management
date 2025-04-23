import { createFont, createTamagui, createTokens } from "tamagui";
import { createAnimations } from "@tamagui/animations-moti";

export const tokens = createTokens({
  size: {
    1: 10,
    2: 45, // small buttons / indicators
    3: 90,
    4: 120,
    5: 240,
    6: 360,
    7: 480,
    8: 600,
    true: 120,
  },
  space: {
    0: 0,
    1: 2,
    2: 4,
    3: 8,
    4: 12,
    5: 16,
    6: 20,
    7: 24,
    8: 28,
    9: 32,
    10: 36,
    true: 8,
  },
  radius: {
    0: 0,
    1: 6,
    2: 12,
    round: 9999,
  },
  zIndex: {
    0: 0,
    1: 10,
    2: 100,
    3: 1000,
  },
  color: {
    white: "#FFFFFF",
    black: "#000000",

    bgPrimary: "#F5F7FA", // heller, moderner Grundton
    bgSecondary: "#E9EDF5", // abgesetzter Sekundärton
    bgTertiary: "#DDE3ED", // für dezente Abgrenzungen

    surface: "#FFFFFF", // Karten, Container
    surfaceHover: "#F1F4F9", // Hover-Effekt für Oberflächen
    surfaceActive: "#E2E6EC", // gedrückter Zustand

    textPrimary: "#1A1D21", // nahezu schwarz, optimale Lesbarkeit
    textSecondary: "#4A5568", // gedämpftes Grau
    textInverted: "#FFFFFF", // auf dunklem Grund
    textDisabled: "#A0AEC0", // ausgegrauter Text

    accent: "#3D5AFE", // kräftiges Indigoblau (Primary)
    accentHover: "#304FFE", // dunklerer Hover-Ton
    success: "#22C55E", // frisches Grün
    warning: "#FACC15", // modernes Gelb
    error: "#F43F5E", // warmes Rot

    borderLight: "#E2E8F0", // helle Ränder
    borderDark: "#94A3B8", // dunklere Ränder
  },
});

const baseFontProps = {
  size: {
    1: 14,
    2: 16,
    3: 18,
    4: 20,
    5: 22,
    6: 24,
    7: 26,
    8: 28,
    9: 30,
    true: 18,
  },
  lineHeight: {
    1: 20,
    2: 24,
    3: 28,
    true: 24,
  },
  weight: {
    1: "400",
    2: "500",
    3: "600",
    4: "700",
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
      bg: tokens.color.bgPrimary,
      bgSecondary: tokens.color.bgSecondary,
      bgTertiary: tokens.color.bgTertiary,
      surface: tokens.color.surface,
      surfaceHover: tokens.color.surfaceHover,
      surfaceActive: tokens.color.surfaceActive,

      text: tokens.color.textPrimary,
      textSecondary: tokens.color.textSecondary,
      invertedText: tokens.color.textInverted,
      disabledText: tokens.color.textDisabled,

      accent: tokens.color.accent,
      success: tokens.color.success,
      warning: tokens.color.warning,
      error: tokens.color.error,

      borderLight: tokens.color.borderLight,
      borderDark: tokens.color.borderDark,
    },

    dark: {
      bg: tokens.color.bgPrimary,
      bgSecondary: tokens.color.bgSecondary,
      bgTertiary: tokens.color.bgTertiary,
      surface: "#232323", // für Karten
      surfaceHover: "#2C2C2C", // Hover-Effekt

      text: tokens.color.textInverted,
      textSecondary: "#D1D5DB", // leicht gedämpftes Hellgrau
      invertedText: tokens.color.textPrimary,
      disabledText: "#6B7280",

      accent: tokens.color.accent,
      success: tokens.color.success,
      warning: tokens.color.warning,
      error: tokens.color.error,

      border: "#374151", // dunkle Kontur
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
