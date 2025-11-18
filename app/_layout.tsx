import { AuthProvider } from "@/providers/auth-provider";
import {
  FontAwesome5,
  Ionicons,
  MaterialCommunityIcons,
  MaterialIcons,
} from "@expo/vector-icons";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { useEffect } from "react";
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from "react-native-safe-area-context";
import { PortalProvider, TamaguiProvider } from "tamagui";
import tamaguiConfig from "../styles/tamagui.config";

const queryClient = new QueryClient();

export default function RootLayout() {
  const [loaded] = useFonts({
    Inter: require("@tamagui/font-inter/otf/Inter-Medium.otf"),
    InterBold: require("@tamagui/font-inter/otf/Inter-Bold.otf"),

    ...MaterialIcons.font,
    ...MaterialCommunityIcons.font,
    ...Ionicons.font,
    ...FontAwesome5.font,
  });

  useEffect(() => {
    if (loaded) {
      // Splash ausblenden etc.
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider config={tamaguiConfig} defaultTheme="light">
      <SafeAreaProvider initialMetrics={initialWindowMetrics}>
        <PortalProvider>
          <QueryClientProvider client={queryClient}>
            <AuthProvider>
              <Stack>
                <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
                <Stack.Screen name="login" options={{ headerShown: false }} />
                <Stack.Screen
                  name="new-order"
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="edit-order"
                  options={{ headerShown: false }}
                />
              </Stack>
            </AuthProvider>
          </QueryClientProvider>
        </PortalProvider>
      </SafeAreaProvider>
    </TamaguiProvider>
  );
}
