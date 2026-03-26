import { View, Text, Pressable, StyleSheet } from "react-native";
import { useState } from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import ScreenView from "../../components/screenView";
import Input from "../../components/input";
import PasswordInput from "../../components/passwordInput";
import Button from "../../components/button";
import FormMessage from "../../components/formMessage";
import { router } from "expo-router";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebaseApp } from "../../lib/firebase";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const auth = getAuth(firebaseApp);

  const handleLogin = async () => {
    setError("");
    if (!email || !password) {
      setError("Please fill all fields");
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.replace("/(tabs)"); // your home/tabs screen
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScreenView bgColor="#00D09E" style={{ justifyContent: "center" }}>
      <KeyboardAwareScrollView>
        <View style={{ marginHorizontal: 20, marginTop: 50 }}>
          <Text style={styles.head}>Welcome</Text>
          <View style={{ marginTop: 140, gap: 20 }}>
            <Input
              text="Email"
              placeholder="Email"
              value={email}
              onChangeText={setEmail}
            />
            <PasswordInput
              text="Password"
              value={password}
              onChangeText={setPassword}
            />

            <FormMessage message={error} />

            <Button
              text="Log In"
              onPress={handleLogin}
              style={{ alignSelf: "center", marginTop: 20 }}
              textColor="black"
            />

            <Pressable
              onPress={() => router.push("/(auth)/forgot-password")}
              style={({ pressed }) => ({
                opacity: pressed ? 0.5 : 1,
                alignSelf: "center",
                marginTop: 10,
              })}
            >
              <Text style={{ fontFamily: "PoppinsSemiBold", color: "black" }}>
                Forgot Password?
              </Text>
            </Pressable>

            <Pressable
              onPress={() => router.push("/(auth)/sign-up")}
              style={{ alignSelf: "center", marginTop: 15 }}
            >
              <Text style={{ fontFamily: "PoppinsRegular" }}>
                {" "}
                Don&#39;t have an account?{" "}
                <Text style={{ color: "blue", fontFamily: "PoppinsSemiBold" }}>
                  Sign Up
                </Text>
              </Text>
            </Pressable>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  head: { fontFamily: "PoppinsBold", fontSize: 50, alignSelf: "center" },
});
