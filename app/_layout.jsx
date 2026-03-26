import { Stack, Redirect } from "expo-router";
import { useEffect, useState } from "react";
import { View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";


// const resetOnboarding = async () => {
//   await AsyncStorage.removeItem("hasOnboarded");
//   console.log("Onboarding reset");
// };


// Google Fonts (Expo way)
import {
  useFonts,
  Poppins_400Regular,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

export default function RootLayout() {
  const [loading, setLoading] = useState(true);
  const [hasOnboarded, setHasOnboarded] = useState(null);

  // ✅ Load Google Fonts
  const [fontsLoaded] = useFonts({
    PoppinsRegular: Poppins_400Regular,
    PoppinsSemiBold: Poppins_600SemiBold,
    PoppinsBold: Poppins_700Bold,
  });

  useEffect(() => {
    async function checkOnboarding() {
      const value = await AsyncStorage.getItem("hasOnboarded");
      setHasOnboarded(value === "true");
      setLoading(false);
    }
    
    checkOnboarding();
  }, []);

  // ✅ Wait for onboarding check
  if (loading) {
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }

  // ✅ Wait for fonts
  if (!fontsLoaded) {
    return <View style={{ flex: 1, backgroundColor: "#fff" }} />;
  }
 

  return (
    <>
      {/* ✅ Onboarding check */}
      {!hasOnboarded && <Redirect href="/onboarding" />}

      {/* ✅ Your navigation */}
      <Stack screenOptions={{ headerShown: false }} />
    </>
  );
}