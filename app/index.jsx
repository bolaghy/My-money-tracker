import { Redirect } from "expo-router";
import { useEffect, useState } from "react";


export default function Index() {
  const [user, setUser] = useState(null);

  // later connect to Firebase
  useEffect(() => {
    setUser(null); // change after auth setup
  }, []);

  if (user) {
    return <Redirect href="/(tabs)/home" />;
  }

  return <Redirect href="/(auth)/log-in" />;
}