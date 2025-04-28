// tabs/kitchen-counter.tsx
import React from 'react';
import { View, Text, ScrollView, Button } from 'react-native';

const Profile = () => {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Küche/Theke</Text>
            <ScrollView>
                {/* Beispielhafte Darstellung von Bestellungen */}
                <View>
                    <Text>Tisch 5 - Döner Tasche</Text>
                    <Text>Bestellung: Döner Tasche mit Salat</Text>
                    <Text>Preis: €7.50</Text>
                    <Button title="Bestellung bestätigen" onPress={() => { /* Bestelllogik hier */ }} />
                </View>
            </ScrollView>
        </View>
    );
};

export default Profile;
