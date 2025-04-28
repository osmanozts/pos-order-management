import { ChefHat, Coins, UserRound } from '@tamagui/lucide-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#F85F6A', headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Küche',
                    tabBarIcon: ({ color }) => <ChefHat size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="checkout"
                options={{
                    title: 'Kasse',
                    tabBarIcon: ({ color }) => <Coins size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color }) => <UserRound size={28} color={color} />,
                }}
            />
        </Tabs>
    );
}
