import React, { useState } from "react";
import { View } from "react-native";
import { Stack, Input, Text, XStack } from "tamagui";

interface InputFieldProps {
  id?: string;
  value?: string;
  placeholder?: string;
  icon?: React.ReactNode;
  regex?: RegExp;
  regexErrorText?: string;
  isPasswordField?: boolean;
  isDisabled?: boolean;
  isDate?: boolean;
  isTime?: boolean;
  onChange?: (value: string) => void;
}

export function InputField({
  id,
  value: propValue = "",
  onChange,
  placeholder,
  icon,
  regex,
  regexErrorText = "Ungültiges Format",
  isPasswordField,
  isDisabled,
  isDate,
  isTime,
}: InputFieldProps) {
  const [localValue, setLocalValue] = useState(propValue);
  const [isValid, setIsValid] = useState(true);

  const handleInputChange = (text: string) => {
    let newValue = text;

    if (isDate) {
      newValue = newValue
        .replace(/[^0-9]/g, "")
        .replace(/(\d{2})(\d{1,2})/, "$1.$2")
        .replace(/(\d{2}\.\d{2})(\d{1,4})/, "$1.$2")
        .slice(0, 10);
    }

    if (isTime) {
      newValue = newValue
        .replace(/[^0-9]/g, "")
        .replace(/(\d{2})(\d{1,2})/, "$1:$2")
        .slice(0, 5);
    }

    if (regex) {
      setIsValid(regex.test(newValue));
    }

    setLocalValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  return (
    <Stack width="100%">
      <XStack
        alignItems="center"
        width="100%"
        backgroundColor="$inputBgColor"
        padding={14}
        borderColor={isValid ? "$dark" : "$red"}
        borderRadius={8}
        borderWidth={1}
      >
        {icon && <Stack marginRight={8}>{icon}</Stack>}
        <Input
          id={id}
          value={localValue}
          onChangeText={handleInputChange}
          placeholder={placeholder}
          secureTextEntry={isPasswordField}
          editable={!isDisabled}
          width="90%"
          height="100%"
          borderWidth={0}
        />
      </XStack>
      {!isValid && (
        <Text marginTop="$2" marginLeft="$2" fontSize="$2" color="$accentColor">
          {regexErrorText}
        </Text>
      )}
    </Stack>
  );
}
