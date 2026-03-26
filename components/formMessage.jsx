import { Text, StyleSheet } from "react-native";

export default function FormMessage({ message = "", type = "error" }) {
  if (!message) return null;

  return <Text style={[styles.message, type === "error" ? styles.error : styles.info]}>{message}</Text>;
}

const styles = StyleSheet.create({
  message: {
    fontFamily: "PoppinsRegular",
    fontSize: 14,
    marginTop: 5,
    textAlign: "center",
  },
  error: {
    color: "#FF4C4C", // red for errors
  },
  info: {
    color: "#28A745", // green for info/success
  },
});