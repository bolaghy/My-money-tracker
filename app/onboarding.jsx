import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { Image, Text, TouchableOpacity, } from "react-native";
import Onboarding from "react-native-onboarding-swiper";
import ScreenView from "../components/screenView"; // import your background component

// Buttons
const Next = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 15 }} {...props}>
    <Text style={{ fontSize: 16, color: "#00D09E",fontFamily: "PoppinsSemiBold" }}>Next</Text>
  </TouchableOpacity>
);

const Skip = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 15 }} {...props}>
    <Text style={{ fontSize: 16, color: "#999", fontFamily: "PoppinsSemiBold", }}>Skip</Text>
  </TouchableOpacity>
);

const Done = ({ ...props }) => (
  <TouchableOpacity style={{ marginHorizontal: 15 }} {...props}>
    <Text style={{ fontSize: 16, fontWeight: "bold", color: "#00D09E" }}>
      Done
    </Text>
  </TouchableOpacity>
);

export default function OnboardingScreen() {
  const finishOnboarding = async () => {
    await AsyncStorage.setItem("hasOnboarded", "true");
    router.replace("/");
  };

  return (
    <ScreenView bgColor="#00B37E"> {/* Green top background */}
      <Onboarding
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        DoneButtonComponent={Done}
        onSkip={finishOnboarding}
        onDone={finishOnboarding}
        pages={[
          {
             // make #fff to show ScreenView
            image: (
              <Image
                source={require("../assets/images/onboardingImage1.png")}
                style={{ width: 250, height: 250 }}
              />
            ),
            title: "Track Expenses",
            subtitle: "Manage your money easily",
          },
          {
           
            image: (
              <Image
                source={require("../assets/images/onboardingImage2.png")}
                style={{ width: 250, height: 250 }}
              />
            ),
            title: "Save Smart",
            subtitle: "Build better habits",
          },
        ]}
         titleStyles={{ color: "black", fontSize: 24, fontWeight: "bold" }}
        subTitleStyles={{ color: "gray", fontSize: 16 }}
      />
    </ScreenView>
  );
}