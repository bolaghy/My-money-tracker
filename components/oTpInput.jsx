import { useState, useRef } from "react";
import { View, TextInput, StyleSheet } from "react-native";

export default function OTPInput({ length = 6, onChange }) {
  const [otp, setOtp] = useState(Array(length).fill(""));
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    onChange?.(newOtp.join(""));

    if (text && index < length - 1) inputs.current[index + 1].focus();
  };

  const handleBackspace = (key, index) => {
    if (key === "Backspace" && index > 0 && otp[index] === "") inputs.current[index - 1].focus();
  };

  return (
    <View style={styles.container}>
      {otp.map((digit, index) => (
        <TextInput
          key={index}
          ref={(ref) => (inputs.current[index] = ref)}
          style={[styles.input, digit && styles.filled]}
          keyboardType="number-pad"
          maxLength={1}
          value={digit}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={({ nativeEvent }) => handleBackspace(nativeEvent.key, index)}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", justifyContent: "center", gap: 10, marginTop: 30 },
  input: {
    width: 45,
    height: 45,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
  },
  filled: { borderColor: "#4CAF50" },
});