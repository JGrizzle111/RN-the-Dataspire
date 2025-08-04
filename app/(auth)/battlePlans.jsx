import { Text, StyleSheet, View, Pressable } from 'react-native'
import React from 'react'
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

export default function BattlePlans() {
    const router = useRouter();

    const handleReturnHome = () => {
        router.push("/(auth)/Home");
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>BATTLEFIELD PLANNING COGITATORS</Text>
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
        shadowColor: '#06972aff',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 8,
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
        marginBottom: 20,
        fontWeight: 'bold',
    },
    button: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        marginTop: 10,
        width: 200,
        alignSelf: 'center',
        backgroundColor: 'green',
        shadowColor: '#06972aff',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.8,
        shadowRadius: 8,
        elevation: 8,
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
});