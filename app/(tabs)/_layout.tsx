import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';

export default function TabLayout() {
    return (
        <Tabs screenOptions={{ tabBarActiveTintColor: 'green', headerShown: false }}>
            <Tabs.Screen
                name="index"
                options={{
                    title: 'Bestellung',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="pencil" color={color} />,
                }}
            />
            <Tabs.Screen
                name="kitchen-counter"
                options={{
                    title: 'Küche',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="apple" color={color} />,
                }}
            />
            <Tabs.Screen
                name="cash-register"
                options={{
                    title: 'Kasse',
                    tabBarIcon: ({ color }) => <FontAwesome size={28} name="money" color={color} />,
                }}
            />
        </Tabs>
    );
}
