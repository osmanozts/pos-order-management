// tabs/cash-register.tsx
import React from 'react';
import { View, Text, ScrollView, Button } from 'react-native';

const CashRegister = () => {
    return (
        <View style={{ flex: 1, padding: 20 }}>
            <Text>Kasse</Text>
            <ScrollView>
                {/* Beispielhafte Darstellung von Bestellungen */}
                <View>
                    <Text>Tisch 5 - Döner Tasche</Text>
                    <Text>Preis: €7.50</Text>
                    <Button title="Bezahlt" onPress={() => { /* Bezahllogik hier */ }} />
                </View>
            </ScrollView>
        </View>
    );
};

export default CashRegister;
