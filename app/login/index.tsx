import { CustomButton, InputField } from "@/components";
import { useAuth } from "@/providers/auth-provider";
import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from "react";
import { Keyboard, KeyboardAvoidingView, Platform, TouchableWithoutFeedback } from "react-native";
import { H1, Text, YStack } from "tamagui";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setError(null);
    try {
      await login(email, password);
    } catch (error: any) {
      const errorMessage = error;
      if (errorMessage.includes("Invalid login credentials")) {
        setError("Falsche Anmeldedaten. Bitte versuchen Sie es erneut.");
      } else {
        setError("Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.");
      }
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}>

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <YStack
          flex={1}
          justifyContent="center"
          paddingHorizontal="$md"
          backgroundColor="tileBgColor"
          alignItems="center" gap="$md"
        >
          <H1
            fontSize={32}
            fontWeight="700"
            color="$accent"
            marginBottom="$2"
            textAlign="center"
          >
            Ibos Ocakbasi
          </H1>

          <Text fontSize="$lg" color="$disabledText" marginBottom="$md" textAlign="center">
            Bitte melden Sie sich an, um fortzufahren.
          </Text>

          <InputField
            value={email}
            placeholder="Email..."
            onChange={setEmail}
            icon={<Text color="$accent"><MaterialIcons name="email" size={24} /></Text>}
          />
          <InputField
            value={password}
            placeholder="Passwort"
            isPasswordField
            icon={<Text color="$accent"><MaterialIcons name="password" size={24} /></Text>}
            onChange={setPassword}
          />

          <CustomButton
            width="100%"
            backgroundColor="$accentBg"
            color="$accent"
            onPress={handleLogin}
          >
            Anmelden
          </CustomButton>

          {error && (
            <Text color="$red10" fontSize="$sm" marginTop="$2" textAlign="center">
              {error}
            </Text>
          )}
        </YStack>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
