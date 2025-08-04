import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, Pressable, Modal, TextInput } from "react-native";
import { getAuth, signOut } from 'firebase/auth';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

export default function Home(){
    const auth = getAuth();
    const router = useRouter();

    const handleSignOut = () => {
        signOut(auth).then(() => {
            Alert.alert("Sign Out", "You have been signed out successfully.");
        }).catch((error) => {
            Alert.alert("Sign Out Error", error.message);
        });
    };

    const armyLists = () => {
        router.push("/(auth)/armyLists");
    }

    const battlePlans = () => {
        router.push("/(auth)/battlePlans");
    }

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.title}>DATASPIRE ACCESS GRANTED</Text>
                    <Text style={styles.subtitle}>
                        Welcome, Adept {auth.currentUser?.displayName || "Unknown"}
                    </Text>
                    <Text style={styles.quote}>
                        "Knowledge is power, guard it well."
                    </Text>
                    <Text style={styles.greeting}>
                        Greetings, Adept. You have successfully authenticated your access to the sacred data-vaults of the Dataspire. The Machine Spirit acknowledges your presence.
                    </Text>
                    <Text style={styles.unauthorized}>
                        {'>> WARNING: Unauthorized access is heresy punishable by servitorization <<'}
                    </Text>
                </View>
                <View>
                    <Pressable style={styles.button} onPress={armyLists}>
                        <Text style={styles.buttonTextStyle}>Access Army Registers</Text>
                    </Pressable>
                    <Pressable style={styles.button} onPress={battlePlans}>
                        <Text style={styles.buttonTextStyle}>Access Battlefield Planning</Text>
                    </Pressable>
                    <Pressable style={styles.signOutButton} onPress={handleSignOut}>
                        <Text style={styles.buttonTextStyle}>Sign Out</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#022004',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    welcomeContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 20,
        borderStyle: 'solid',
        borderColor: '#217736',
        borderWidth: 2,
        marginBottom: 30,
        boxShadow: '0px 0px 10px rgba(6, 151, 42, 0.8)',
        elevation: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00ff00',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 2,
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 13,
    },
    subtitle: {
        fontSize: 16,
        color: '#ffaa00',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        textShadowColor: '#ffaa00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 13,
    },
    quote: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 30,
        paddingHorizontal: 20,
        textShadowColor: '#ffffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 13,
    },
    greeting: {
        fontSize: 16,
        color: '#cccccc',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
        paddingHorizontal: 20,
        textShadowColor: '#cccccc',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 13,
    },
    unauthorized: {
        fontSize: 14,
        color: '#ff0000',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        textShadowColor: '#ff0000',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 13,
    },
    button: {
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        width: 300,
        alignSelf: 'center',
        backgroundColor: 'green',
        // Replace old shadow properties with boxShadow
        boxShadow: '0px 0px 13px rgba(6, 151, 42, 0.8)',
        elevation: 8,
    },
    signOutButton: {
        borderRadius: 10,
        padding: 12,
        marginTop: 40,
        width: 200,
        alignSelf: 'center',
        backgroundColor: '#ff0000',
        // Replace old shadow properties with boxShadow
        boxShadow: '0px 0px 13px rgba(255, 0, 0, 0.8)',
        elevation: 8,
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
});