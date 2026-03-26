import { useState } from "react";
import { View, TextInput, Text, StyleSheet } from "react-native";

export default function Input({ text, placeholder, value, onChangeText, keyboardType, style }) {
  const [focused, setFocused] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {text && <Text style={styles.label}>{text}</Text>}
      <TextInput
        style={[styles.input, { borderColor: focused ? "#00D09E" : "#DFF7E2" }]}
        placeholder={placeholder}
        placeholderTextColor="#999"
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 14, fontFamily: "PoppinsRegular", color: "#000" },
  input: {
    height: 40,
    paddingHorizontal: 12,
    borderWidth: 2,
    borderRadius: 20,
    backgroundColor: "#DFF7E2",
    fontFamily: "PoppinsRegular",
    color: "#000",
  },
});