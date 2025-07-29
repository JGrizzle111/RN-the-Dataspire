import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import fbConfig from "../config.js";
import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator} from "react-native";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Initialize Firebase only once
    if (getApps().length === 0) {
      initializeApp(fbConfig);
    }
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('User state changed:', user);
      setUser(user);
      if (initializing) setInitializing(false);
    });
    return unsubscribe; // unsubscribe on unmount
  }, [initializing]);

  useEffect(() => {
    if (initializing) return;
    const inAuthGroup = segments[0] === "(auth)";
    const atRoot = segments.length === 0;

    console.log("user:", user, "segments:", segments, "inAuthGroup:", inAuthGroup, "atRoot:", atRoot);

    if (!user && (inAuthGroup || atRoot)) {
      router.replace("/Signup");
    } else if (user && (segments[0] === "Signin" || segments[0] === "Signup" || atRoot)) {
      router.replace("/(auth)/Home");
    }
  }, [user, segments, initializing]);

  if (initializing) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <ActivityIndicator size={'large'} style={{margin:28}}/>
    </View>
  );

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Welcome', headerShown: true}}/>
        <Stack.Screen name="Signup" options={{ title: 'Sign Up', headerShown: true}}/>
      </Stack>
    </SafeAreaProvider>
  );
}

