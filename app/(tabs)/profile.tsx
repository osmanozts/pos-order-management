import { CustomButton } from "@/components";
import { useProfile } from "@/db";
import { useAuth } from "@/providers/auth-provider";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Separator, Text, XStack, YStack } from "tamagui";

const Profile = () => {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const insets = useSafeAreaInsets();
  const { data: profile, isLoading } = useProfile(user.email);
  if (user)
    return (
      <YStack
        flex={1}
        paddingTop={insets.top + 20}
        paddingHorizontal="$lg"
        backgroundColor="$bgPrimary"
        justifyContent="space-between"
      >
        <YStack flex={1} justifyContent="space-between">
          <YStack gap="$md">
            <Text fontSize={24} fontWeight="bold" color="$text">
              Infos
            </Text>
            <XStack alignItems="center" gap="$md">
              <YStack gap="$lg" width="100%">
                <XStack
                  borderWidth={1}
                  height="$sm"
                  width="100%"
                  borderRadius="$radiusMd"
                  borderColor="$borderLight"
                  paddingVertical="$sd"
                  paddingHorizontal="$lg"
                  backgroundColor="$surfaceSecondary"
                  alignItems="center"
                >
                  <Text fontSize={20} fontWeight="600">
                    Email: {profile?.email ?? "---"}
                  </Text>
                </XStack>
                <XStack
                  borderWidth={1}
                  height="$sm"
                  width="100%"
                  borderRadius="$radiusMd"
                  borderColor="$borderLight"
                  paddingVertical="$sd"
                  paddingHorizontal="$lg"
                  backgroundColor="$surfaceSecondary"
                  alignItems="center"
                >
                  <Text fontSize={20} fontWeight="600">
                    Name: {profile?.first_name} {profile?.last_name}
                  </Text>
                </XStack>
                <XStack
                  borderWidth={1}
                  height="$sm"
                  width="100%"
                  borderRadius="$radiusMd"
                  borderColor="$borderLight"
                  paddingVertical="$sd"
                  paddingHorizontal="$lg"
                  backgroundColor="$surfaceSecondary"
                  alignItems="center"
                >
                  <Text fontSize={20} fontWeight="600">
                    Zugeordnet: {profile?.job_role}
                  </Text>
                </XStack>
              </YStack>
            </XStack>
          </YStack>

          <CustomButton
            danger
            icon={<MaterialIcons name="logout" size={18} />}
            onPress={() => {
              signOut();
              router.replace("/login");
            }}
          >
            Abmelden
          </CustomButton>
        </YStack>

        <YStack gap="$md" alignItems="center" marginBottom="$md">
          <Separator />
          <Text fontSize={18} color="$gray9">
            Entwickelt von
          </Text>
          <Text fontWeight="600" color="$gray11">
            Osman Öztas
          </Text>
          <Text fontSize="$TextXs" color="$gray9">
            Version 1.0.0
          </Text>
        </YStack>
      </YStack>
    );
};

export default Profile;
