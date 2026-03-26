import { View, Text, StyleSheet } from "react-native";
import { useState } from "react";
import ScreenView from "../../components/screenView";
import PasswordInput from "../../components/passwordInput";
import Button from "../../components/button";
import FormMessage from "../../components/formMessage";
import { getAuth, confirmPasswordReset } from "firebase/auth";
import { router, useSearchParams } from "expo-router";
import { firebaseApp } from "../../lib/firebase";

export default function SetNewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { oobCode } = useSearchParams(); // reset code from Firebase
  const auth = getAuth(firebaseApp);

  const handleChangePassword = async () => {
    setError("");
    if (!password || !confirmPassword) {
      setError("Please fill all fields");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    try {
      await confirmPasswordReset(auth, oobCode, password);
      router.replace("/log-in");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScreenView bgColor="#00D09E" style={{ justifyContent: "center" }}>
      <View style={{ marginHorizontal: 20, marginTop: 50, gap: 20 }}>
        <Text style={styles.head}>Set New Password</Text>
        <PasswordInput text="New Password" value={password} onChangeText={setPassword} />
        <PasswordInput text="Confirm Password" value={confirmPassword} onChangeText={setConfirmPassword} />

        <FormMessage message={error} />

        <Button text="Change Password" onPress={handleChangePassword} style={{ alignSelf: "center" }} textColor="black" />
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  head: { fontFamily: "PoppinsBold", fontSize: 28, alignSelf: "center" },
});