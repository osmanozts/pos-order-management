import { CustomButton } from '@/components';
import { useAuth } from '@/providers/auth-provider';
import { useRouter } from 'expo-router';
import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Text, YStack } from 'tamagui';

const Profile = () => {
    const router = useRouter();
    const insets = useSafeAreaInsets();
    const { user, signOut } = useAuth();

    return (
        <YStack
            flex={1}
            backgroundColor="$bgPrimary"
            paddingTop={insets.top}
            paddingHorizontal="$md"
            gap="$md"
        >
            <Text fontWeight="bold" fontSize={26} color="$textSecondary">
                Profil
            </Text>
            <Text fontWeight="regular" fontSize={26} color="$textSecondary">
                Email: {user?.email ?? "---"}
            </Text>
            <CustomButton onPress={() => signOut()}>Abmelden</CustomButton>
        </YStack>
    );
};

export default Profile;
