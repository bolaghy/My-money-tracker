import { TouchableOpacity, Text, StyleSheet } from "react-native";

export default function Button({ text, style, textColor = "white", onPress, icon }) {
  return (
    <TouchableOpacity style={[styles.btnContainer, style]} onPress={onPress}>
      {icon && icon}
      <Text style={[styles.btnText, { color: textColor }]}>{text}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  btnContainer: {
    backgroundColor: "#00D09E",
    width: 160,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "600",
  },
});