import { ConfigContext, ExpoConfig } from "@expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const profile = process.env.EAS_BUILD_PROFILE ?? "development";
  const isProd = profile === "production";
  const isPreview = profile.startsWith("preview");
  const isDev = !isProd && !isPreview;

  const baseName = "Ibos Ocakbasi";
  const displaySuffix = isProd ? "" : isPreview ? " Preview" : " Dev";
  const displayName = `${baseName}${displaySuffix}`;

  const baseBundle = "com.osman.ozts.tableordertrackingapp";
  const bundleSuffix = isProd ? "" : isPreview ? ".preview" : ".dev";

  return {
    ...config,
    name: baseName,
    slug: "table-order-tracking-app",
    version: "1.0.0",
    orientation: "portrait",
    newArchEnabled: true,
    userInterfaceStyle: "automatic",
    owner: "osman.ozts",

    scheme: isProd ? "ibos" : isPreview ? "ibos-preview" : "ibos-dev",

    icon: "./assets/images/app-icon.png",

    ios: {
      supportsTablet: true,
      bundleIdentifier: `${baseBundle}${bundleSuffix}`,
      infoPlist: {
        ITSAppUsesNonExemptEncryption: false,
        CFBundleDisplayName: displayName,
      },
    },

    android: {
      package: `${baseBundle}${bundleSuffix}`,
      adaptiveIcon: {
        foregroundImage: "./assets/images/app-icon.png",
        backgroundColor: "#ffffff",
      },
    },

    web: {
      bundler: "metro",
      output: "static",
      favicon: "./assets/images/app-icon.png",
    },

    plugins: [
      "expo-router",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/app-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#ffffff",
        },
      ],
      "expo-font",
    ],

    experiments: { typedRoutes: true },

    extra: {
      eas: { projectId: "5572774c-2d55-4f7c-8977-f82f0cb71ccd" },
      buildProfile: profile,
    },
  };
};
