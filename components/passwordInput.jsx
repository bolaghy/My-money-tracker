import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function PasswordInput({ text, placeholder, value, onChangeText, style }) {
  const [focused, setFocused] = useState(false);
  const [show, setShow] = useState(false);

  return (
    <View style={[styles.container, style]}>
      {text && <Text style={styles.label}>{text}</Text>}
      <View style={[styles.wrapper, { borderColor: focused ? "#00D09E" : "#DFF7E2" }]}>
        <MaterialIcons name="lock" size={22} color="#555" />
        <TextInput
          style={styles.input}
          secureTextEntry={!show}
          placeholder={placeholder || "Enter password"}
          placeholderTextColor="#999"
          value={value}
          onChangeText={onChangeText}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
        />
        <TouchableOpacity onPress={() => setShow(!show)}>
          <MaterialIcons name={show ? "visibility-off" : "visibility"} size={22} color="#999" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { gap: 6 },
  label: { fontSize: 14, fontFamily: "OpenSansMedium", color: "#000" },
  wrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DFF7E2",
    borderRadius: 20,
    borderWidth: 2,
    paddingHorizontal: 12,
    height: 40,
    gap: 8,
  },
  input: { flex: 1, fontFamily: "OpenSansMedium", color: "#000" },
});