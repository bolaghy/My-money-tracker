import { View, Text, StyleSheet, Pressable  } from "react-native";
import { useState } from "react";
import ScreenView from "../../components/screenView";
import Input from "../../components/input";
import Button from "../../components/button";
import FormMessage from "../../components/formMessage";
import { router } from "expo-router";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import { firebaseApp } from "../../lib/firebase";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth(firebaseApp);

  const handleReset = async () => {
    setError("");
    setInfo("");
    if (!email) {
      setError("Please enter your email");
      return;
    }
    try {
      await sendPasswordResetEmail(auth, email);
      setInfo("Password reset email sent!");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScreenView bgColor="#00D09E" style={{ justifyContent: "center" }}>
      <View style={{ marginHorizontal: 20, marginTop: 50 }}>
        <Text style={styles.head}>Forgot Password</Text>
        <View style={{ marginTop: 40, gap: 15 }}>
          <Input text="Email" placeholder="Enter your email" value={email} onChangeText={setEmail} keyboardType="email-address" />

          <FormMessage message={error} type="error" />
          <FormMessage message={info} type="info" />

          <Button text="Send Reset Email" onPress={handleReset} style={{ alignSelf: "center", marginTop: 15 }} textColor="black" />

          <Pressable onPress={() => router.push("/(auth)/log-in")} style={{ alignSelf: "center", marginTop: 15 }}>
            <Text style={{ fontFamily: "PoppinsSemiBold", color: "black" }}>Back to Login</Text>
          </Pressable>
        </View>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  head: { fontFamily: "PoppinsBold", fontSize: 30, alignSelf: "center" },
});