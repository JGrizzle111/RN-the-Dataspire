import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
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
      const app = initializeApp(fbConfig);
      // Initialize Auth with AsyncStorage persistence
      initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
      });
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

    //console.log("user:", user, "segments:", segments, "inAuthGroup:", inAuthGroup, "atRoot:", atRoot);

    if (!user && (inAuthGroup || atRoot)) {
      router.replace("/Login");
    } else if (user && (segments[0] === "Login" || atRoot)) { // Removed duplicate "Login" check
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
        <Stack.Screen name="index" options={{ title: 'Welcome', headerShown: false}}/>
        <Stack.Screen name="Login" options={{ title: 'Log In', headerShown: false}}/>
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
      </Stack>
    </SafeAreaProvider>
  );
}

