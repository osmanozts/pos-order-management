import { AuthProvider } from '@/providers/auth-provider'
import { useFonts } from 'expo-font'
import { Stack } from 'expo-router'
import { useEffect } from 'react'
import { useColorScheme } from 'react-native'
import { PortalProvider, TamaguiProvider } from 'tamagui'
import tamaguiConfig from './styles/tamagui.config'
import { QueryClient, QueryClientProvider, focusManager } from '@tanstack/react-query'


export default function RootLayout() {
  const queryClient = new QueryClient()

  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  })

  useEffect(() => {
    if (loaded) {
      // can hide splash screen here
    }
  }, [loaded])

  if (!loaded) {
    return null
  }


  return (
    <TamaguiProvider config={tamaguiConfig}>
      <PortalProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <Stack>
              <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
              <Stack.Screen name="login" options={{ headerShown: false }} />
              <Stack.Screen name="new-order" options={{ headerShown: false }} />
              {/* <Stack.Screen name="modal" options={{ presentation: 'modal' }} /> */}
            </Stack>
          </AuthProvider>
        </QueryClientProvider>
      </PortalProvider>
    </TamaguiProvider>
  )
}