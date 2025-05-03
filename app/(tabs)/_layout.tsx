import { MaterialCommunityIcons, FontAwesome5, Ionicons } from '@expo/vector-icons';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: '#F85F6A', headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Küche',
                    tabBarIcon: ({ color }) => <MaterialCommunityIcons name="chef-hat" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="checkout"
                options={{
                    title: 'Kasse',
                    tabBarIcon: ({ color }) => <FontAwesome5 name="coins" size={28} color={color} />,
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: 'Profil',
                    tabBarIcon: ({ color }) => <Ionicons name="person" size={28} color={color} />,
                }}
            />
        </Tabs>
    );
}
