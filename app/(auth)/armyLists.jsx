import { Text, StyleSheet, View, Pressable } from 'react-native'
import React, { useCallback } from 'react'
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

export default function ArmyLists() {
    const router = useRouter();

    const handleReturnHome = useCallback(() => {
        router.replace("/(auth)/Home");
    }, [router]);

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>REGISTERED ARMY ROSTERS</Text>
                    <Text style={styles.subtitle}>Feature Coming Soon</Text>
                    <Pressable style={styles.button} onPress={handleReturnHome}>
                        <Text style={styles.buttonTextStyle}>Return Home</Text>
                    </Pressable>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#022004',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    subContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 20,
        borderStyle: 'solid',
        borderColor: '#217736',
        borderWidth: 2,
        marginBottom: 30,
        // Shadow properties for iOS
        shadowColor: '#06972aff',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        // Shadow property for Android
        elevation: 8,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00ff00',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 2,
    },
    subtitle: {
        fontSize: 16,
        color: '#ffaa00',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
    },
    quote: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 30,
        paddingHorizontal: 20,
    },
    greeting: {
        fontSize: 16,
        color: '#cccccc',
        textAlign: 'center',
        lineHeight: 24,
        marginBottom: 20,
        paddingHorizontal: 20,
    },
    warning: {
        fontSize: 14,
        color: '#ff6666',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
    },
    unauthorized: {
        fontSize: 14,
        color: '#ff0000',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 10,
    },
    button: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        marginTop: 10,
        width: 200,
        alignSelf: 'center',
        backgroundColor: 'green',
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
    },
    signOutButton: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        marginTop: 10,
        width: 200,
        marginTop: 40,
        marginHorizontal: 'auto',
        backgroundColor: '#ff0000',
        shadowColor: '#ff0000',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        // Shadow property for Android
        elevation: 8,
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:18
    },
});