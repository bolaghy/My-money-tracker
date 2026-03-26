import { StyleSheet, Text, View, Pressable } from "react-native";
import { useState } from "react";
import ScreenView from "../../components/screenView";
import OTPInput from "../../components/oTpInput";
import Button from "../../components/button";
import FormMessage from "../../components/formMessage"; 
import { router } from "expo-router";

export default function SecurityPin() {
  const [message, setMessage] = useState(""); // dynamic error/info message

  const handleAccept = () => {
    // You can validate OTP here
    // if invalid: setMessage("Invalid OTP");
    // else:
    router.push("/set-new-password");
  };

  return (
    <ScreenView bgColor={"#00D09E"} style={{ justifyContent: "center", padding: 20 }}>
      <Text style={styles.head}>Security Pin</Text>

      <View style={{ marginTop: 60, gap: 30 }}>
        <Text style={styles.subHead}>Reset Password?</Text>

        <OTPInput />

        {/* Error or info message */}
        <FormMessage message={message} type="error" />

        <Button
          text="Accept"
          style={{ alignSelf: "center", marginTop: 20, width: 160 }}
          textColor="black"
          onPress={handleAccept}
        />

        <Pressable
          onPress={() => setMessage("OTP resent successfully")}
          style={({ pressed }) => ({ opacity: pressed ? 0.5 : 1, marginTop: 10 })}
        >
          <Text style={styles.sendAgain}>Send Again</Text>
        </Pressable>
      </View>
    </ScreenView>
  );
}

const styles = StyleSheet.create({
  head: {
    alignSelf: "center",
    marginTop: 30,
    fontFamily: "PoppinsSemiBold",
    fontSize: 30,
    color: "black",
  },
  subHead: {
    fontFamily: "PoppinsSemiBold",
    fontSize: 16,
    color: "black",
    alignSelf: "center",
  },
  sendAgain: {
    fontFamily: "PoppinsBold",
    fontSize: 14,
    color: "black",
    textAlign: "center",
  },
});