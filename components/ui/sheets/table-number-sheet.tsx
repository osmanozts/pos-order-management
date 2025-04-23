import { Sheet } from '@tamagui/sheet'
import React from 'react'
import { Button, Text, XStack, YStack } from 'tamagui'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Placement } from '@/models';

interface Props {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    onSelect: (value: Placement) => void
}

export const TableNumberSheet = ({
    isOpen,
    setIsOpen,
    onSelect,
}: Props) => {
    const snapPoints = [90]
    const tables = [
        {
            text: '1', icon: <MaterialIcons name="table-restaurant" size={24} color="white" />
        },
        { text: '2', icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: '3', icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: '4', icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: '5', icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: '6', icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: '7', icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: '8', icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: '9', icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: '10', icon: <MaterialIcons name="table-restaurant" size={24} color="white" /> },
        { text: 'Zum Mitnehmen', icon: <FontAwesome5 name="walking" size={24} color="white" /> }]

    return (
        <Sheet
            open={isOpen}
            onOpenChange={setIsOpen}
            modal
            dismissOnSnapToBottom
            snapPoints={snapPoints}
            snapPointsMode="percent"
        >
            <Sheet.Overlay />

            <Sheet.Frame
                backgroundColor="white"
                padding="$4"
                borderTopLeftRadius="$4"
                borderTopRightRadius="$4"
                shadowColor="#000"
                shadowOpacity={0.1}
                shadowRadius={10}
            >
                <YStack
                    alignSelf="center"
                    marginBottom="$4"
                    width="$2"
                    height={5}
                    borderRadius={10}
                    backgroundColor="#ccc" />

                <Text textAlign='center' fontSize="$6" fontWeight="600" marginBottom="$4" color="$text">
                    Wähle eine Tischnummer
                </Text>

                <YStack flexWrap="wrap" gap="$2" justifyContent="center">
                    {tables.map((table, index) => (
                        <Button
                            key={table + index.toString()}
                            pressStyle={{ opacity: 0.5 }}
                            backgroundColor="$accent"
                            width="100%" height="$2" margin="$2"
                            borderRadius="$3"
                            alignItems="center"
                            justifyContent="center"
                            borderWidth={1}
                            icon={table.icon}
                            onPress={() => {
                                onSelect(table)
                                setIsOpen(false)
                            }}
                        >
                            <Text
                                key={table.text}
                                fontSize="$6"
                                color="$textInverted"
                            >
                                {table.text}
                            </Text>
                        </Button>
                    ))}
                </YStack>
            </Sheet.Frame>
        </Sheet>
    )
}
