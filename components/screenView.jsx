import { Keyboard, TouchableWithoutFeedback, View, Dimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const ScreenView = ({ children, bgColor }) => {
  const { width, height } = Dimensions.get("screen");

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: bgColor || "#00B37E", // top background color (green)
        }}
      >
        {children}

        {/* Bottom white rounded container */}
        <View
          style={{
            position: "absolute",
            bottom: 0,
            width: width,
            height: height * 0.7, // covers 70% of screen from bottom
            backgroundColor: "#F1FFF3", // white/light color
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
            zIndex: -1,
          }}
        />
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default ScreenView;