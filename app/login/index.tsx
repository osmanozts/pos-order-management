import React, { useState } from "react";
import { useAuth } from "@/providers/auth-provider";
import { View, Text, Button, Input, Stack, YStack, H1 } from "tamagui";
import { Mail, Lock } from "@tamagui/lucide-icons";
import { Keyboard, TouchableWithoutFeedback } from "react-native";
import { InputField } from "@/components";

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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <YStack
        flex={1}
        justifyContent="center"
        paddingHorizontal="md"
        backgroundColor="tileBgColor"
        alignItems="center" gap="$xs"
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

        <Text fontSize="$sm" color="$disabledText" marginBottom="$4" textAlign="center">
          Bitte melden Sie sich an, um fortzufahren.
        </Text>

        <InputField
          value={email}
          placeholder="Email..."
          onChange={setEmail}
          icon={<Mail color="$disabled" />}
        />
        <InputField
          value={password}
          placeholder="Passwort"
          isPasswordField
          icon={<Lock color="$disabled" />}
          onChange={setPassword}
        />

        <Button
          marginTop="$4"
          backgroundColor="$accent"
          color="$invertedTextColor"
          onPress={handleLogin}
          width="$lg"
          height="$sm"
          borderRadius="radiusMd"
          fontWeight="600"
        >
          Anmelden
        </Button>

        {error && (
          <Text color="$red10" fontSize="$sm" marginTop="$2" textAlign="center">
            {error}
          </Text>
        )}
      </YStack>
    </TouchableWithoutFeedback>
  );
}
