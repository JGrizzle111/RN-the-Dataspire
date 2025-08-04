import { Stack, useRouter, useSegments } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp, getApps } from "firebase/app";
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import config from '../config.js';
import { useEffect, useState } from 'react';
import { Text, View, ActivityIndicator} from "react-native";

export default function RootLayout() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);
  const [profileLoading, setProfileLoading] = useState(false);
  const router = useRouter();
  const segments = useSegments();

  useEffect(() => {
    // Initialize Firebase only once
    if (getApps().length === 0) {
      const app = initializeApp(config);
      initializeAuth(app, {
        persistence: getReactNativePersistence(ReactNativeAsyncStorage)
      });
    }
    
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log('User state changed:', user);
      console.log('Display name:', user?.displayName);
      
      // If user just signed up but no display name yet, wait a bit
      if (user && !user.displayName && !profileLoading) {
        setProfileLoading(true);
        // Give some time for profile update to complete
        setTimeout(() => {
          user.reload().then(() => {
            console.log('Reloaded user display name:', user.displayName);
            setUser(user);
            setProfileLoading(false);
            if (initializing) setInitializing(false);
          });
        }, 1000);
      } else {
        setUser(user);
        if (initializing) setInitializing(false);
      }
    });
    return unsubscribe;
  }, [initializing, profileLoading]);

  useEffect(() => {
    if (initializing || profileLoading) return;
    const inAuthGroup = segments[0] === "(auth)";
    const atRoot = segments.length === 0;

    if (!user && (inAuthGroup || atRoot)) {
      router.replace("/login");
    } else if (user && (segments[0] === "login" || atRoot)) {
      router.replace("/(auth)/Home");
    }
  }, [user, segments, initializing, profileLoading]);

  if (initializing || profileLoading) return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' }}>
      <ActivityIndicator size={'large'} style={{margin:28}}/>
      <Text style={{color: 'white', marginTop: 10}}>
        {profileLoading ? 'Updating profile...' : 'Loading...'}
      </Text>
    </View>
  );

  return (
    <SafeAreaProvider>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Welcome', headerShown: false}}/>
        <Stack.Screen name="login" options={{ title: 'Log In', headerShown: false}}/>
        <Stack.Screen name="signup" options={{ title: 'Sign Up', headerShown: false}}/>
        <Stack.Screen name="(auth)" options={{headerShown: false}}/>
      </Stack>
    </SafeAreaProvider>
  );
}

