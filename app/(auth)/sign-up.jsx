import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useState } from "react";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import DOBInput from "../../components/dobInput"
import ScreenView from "../../components/screenView";
import Input from "../../components/input";
import PasswordInput from "../../components/passwordInput";
import Button from "../../components/button";
import FormMessage from "../../components/formMessage";
import { router } from "expo-router";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { firebaseApp } from "../../lib/firebase"; // your initialized firebase app

export default function SignUp() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [dob, setDob] = useState(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState("");

  const auth = getAuth(firebaseApp);
  const db = getFirestore(firebaseApp);

  const handleSignUp = async () => {
    setError("");

    if (!fullName || !username || !email || !password || !confirmPassword) {
      setError("Please fill all required fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!checked) {
      setError("You must accept the Terms");
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      );
      const user = userCredential.user;

      // Save extra profile info in Firestore
      await setDoc(doc(db, "profiles", user.uid), {
        fullName,
        username,
        phone,
        dob: dob ? dob.toISOString() : null,
        email,
      });

      router.replace("/(auth)/log-in");
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <ScreenView bgColor="#00D09E" style={{ justifyContent: "center" }}>
      <KeyboardAwareScrollView showsVerticalScrollIndicator={false}>
        <View style={{ marginHorizontal: 20, marginTop: 70 }}>
          <Text style={styles.head}>Create Account</Text>

          <View style={{ marginTop: 120, gap: 12 }}>
            <Input
              text="Full Name"
              placeholder="Full Name"
              value={fullName}
              onChangeText={setFullName}
            />
            <Input
              text="Username"
              placeholder="Username"
              value={username}
              onChangeText={setUsername}
            />
            <Input
              text="Email"
              placeholder="Enter your email"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
            />
            <Input
              text="Mobile Number"
              placeholder="Mobile Number"
              value={phone}
              onChangeText={setPhone}
              keyboardType="phone-pad"
            />
            <DOBInput text="Date of Birth" value={dob} onChange={setDob} />
            <PasswordInput
              text="Set Password"
              value={password}
              onChangeText={setPassword}
            />
            <PasswordInput
              text="Confirm Password"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
            />

            <View style={styles.checkboxContainer}>
              <TouchableOpacity
                style={styles.checkbox}
                onPress={() => setChecked(!checked)}
              >
                {checked && (
                  <MaterialIcons name="check" size={18} color="#053228" />
                )}
              </TouchableOpacity>
              <Text style={styles.checkboxText}>
                By continuing, you agree to{" "}
                <Text style={styles.link}>Terms of Use</Text> and{" "}
                <Text style={styles.link}>Privacy Policy</Text>.
              </Text>
            </View>

            <FormMessage message={error} />

            <Button
              text="Sign Up"
              onPress={handleSignUp}
              style={{ alignSelf: "center", marginTop: 20 }}
              textColor="black"
            />

            <TouchableOpacity
              onPress={() => router.push("/(auth)/log-in")}
              style={{ marginTop: 12, alignSelf: "center" }}
            >
              <Text style={{ fontFamily: "PoppinsSemiBold" }}>
                Already have an account?{" "}
                <Text style={{ color: "blue" }}>Log in</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAwareScrollView>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  head: { fontSize: 32, fontFamily: "PoppinsBold", alignSelf: "center" },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
    marginTop: 10,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 2,
    borderColor: "#00D09E",
    borderRadius: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxText: {
    flex: 1,
    fontSize: 13,
    fontFamily: "PoppinsRegular",
    color: "#333",
  },
  link: { color: "#00D09E", fontFamily: "PoppinsSemiBold" },
});
