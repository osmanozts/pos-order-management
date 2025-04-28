import { Sheet } from '@tamagui/sheet'
import React from 'react'
import { Button, Text, XStack, YStack } from 'tamagui'
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { Placement } from '@/models';
import { CustomButton } from '../buttons';

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
                padding="$md"
                borderTopLeftRadius="radiusMd"
                borderTopRightRadius="radiusMd"
                shadowColor="#000"
                shadowOpacity={0.1}
                shadowRadius={10}
            >
                <YStack
                    alignSelf="center"
                    marginBottom="$4"
                    width="$buttonSm"
                    height="$xxs"
                    borderRadius={10}
                    backgroundColor="#ccc" />

                <Text textAlign='center' fontSize="$xl" fontWeight="600" marginBottom="$4" color="$text">
                    Wähle eine Tischnummer
                </Text>


                {tables.map((table, index) => (
                    <CustomButton
                        key={table + index.toString()}
                        pressStyle={{ opacity: 0.5 }}
                        width="$xl"
                        margin="$sm"
                        alignSelf='center'
                        icon={table.icon}
                        onPress={() => {
                            onSelect(table)
                            setIsOpen(false)
                        }}
                    >
                        <Text
                            key={table.text}
                            fontSize="$lg"
                            color="$invertedText"
                        >
                            {table.text}
                        </Text>
                    </CustomButton>
                ))}

            </Sheet.Frame>
        </Sheet >
    )
}
