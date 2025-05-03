// TableNumberDialog.tsx (ehemals TableNumberSheet)
import { Modal } from "react-native";
import { Stack, Text, YStack, ScrollView } from "tamagui";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { Placement } from "@/models";
import { CustomButton } from "../buttons";

interface Props {
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
    onSelect: (value: Placement) => void;
}

export const TableNumberDialog = ({ isOpen, setIsOpen, onSelect }: Props) => {
    const tables = [
        { text: "1", icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: "2", icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: "3", icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: "4", icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: "5", icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: "6", icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: "7", icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: "8", icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: "9", icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: "10", icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: "Zum Mitnehmen", icon: <FontAwesome5 name="walking" size={20} color="white" /> },
    ];

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={isOpen}
            onRequestClose={() => setIsOpen(false)}
        >
            <Stack
                flex={1}
                backgroundColor="rgba(0,0,0,0.5)"
                alignItems="center"
                justifyContent="center"
                paddingHorizontal="$lg"
            >
                <YStack
                    backgroundColor="$surface"
                    padding="$lg"
                    borderRadius="$radiusMd"
                    width="100%"
                    maxWidth={400}
                    maxHeight="80%"
                >

                    <ScrollView showsVerticalScrollIndicator={false}>
                        <YStack gap="$sm" alignItems="center">
                            {tables.map((table, index) => (
                                <CustomButton
                                    key={table.text + index}
                                    pressStyle={{ opacity: 0.5 }}
                                    width="$xl"
                                    icon={table.icon}
                                    onPress={() => {
                                        onSelect(table);
                                        setIsOpen(false);
                                    }}
                                >
                                    <Text fontSize="$lg" color="$invertedText">
                                        {table.text}
                                    </Text>
                                </CustomButton>
                            ))}
                        </YStack>
                    </ScrollView>

                    <CustomButton marginTop="$md" onPress={() => setIsOpen(false)}>
                        Schließen
                    </CustomButton>
                </YStack>
            </Stack>
        </Modal>
    );
};
