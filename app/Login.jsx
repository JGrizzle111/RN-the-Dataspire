import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, Pressable, TextInput } from "react-native";
import { signInWithEmailAndPassword, getAuth } from 'firebase/auth';
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    
    const auth = getAuth();
    const router = useRouter();

    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert("Validation Error", "Please enter both email and password.");
            return;
        }

        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert("Access Granted", "Welcome back, Adept!");
            router.replace("/(auth)/Home");
        } catch (error) {
            let errorMessage = "Authentication failed. Please check your credentials.";
            
            switch (error.code) {
                case 'auth/user-not-found':
                    errorMessage = "No account found with this email. Please register first.";
                    break;
                case 'auth/wrong-password':
                    errorMessage = "Incorrect password. Access denied.";
                    break;
                case 'auth/invalid-email':
                    errorMessage = "Please enter a valid email address.";
                    break;
                case 'auth/too-many-requests':
                    errorMessage = "Too many failed attempts. Please try again later.";
                    break;
            }
            
            Alert.alert("Authentication Error", errorMessage);
        } finally {
            setLoading(false);
        }
    };

    const goToSignUp = () => {
        router.push('/signup');
    };

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.formContainer}>
                    <Text style={styles.title}>DATASPIRE ACCESS REQUESTED</Text>
                    <Text style={styles.subtitle}>Authenticate Your Credentials</Text>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Adept Designation (Email Address)"
                        placeholderTextColor="#999"
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize="none"
                    />
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Sacred Cipher (Password)"
                        placeholderTextColor="#999"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                    
                    <Pressable 
                        style={[styles.button, loading && styles.buttonDisabled]} 
                        onPress={handleLogin}
                        disabled={loading}
                    >
                        <Text style={styles.buttonTextStyle}>
                            {loading ? 'Authenticating...' : 'Access Dataspire'}
                        </Text>
                    </Pressable>
                    
                    <View style={styles.signupContainer}>
                        <Text style={styles.signupText}>New to the Dataspire?</Text>
                        <Pressable onPress={goToSignUp}>
                            <Text style={styles.signupLink}>Register as an Adept</Text>
                        </Pressable>
                    </View>
                    
                    <Text style={styles.warning}>
                        {'>> Knowledge is power, guard it well <<'}
                    </Text>
                </View>
            </SafeAreaView>
        </SafeAreaProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#022004',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    formContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 30,
        marginHorizontal: 20,
        borderStyle: 'solid',
        borderColor: '#217736',
        borderWidth: 2,
        borderRadius: 10,
        boxShadow: '0px 0px 15px rgba(6, 151, 42, 0.8)',
        elevation: 8,
        width: '100%',
        maxWidth: 400,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00ff00',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: 2,
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#ffaa00',
        textAlign: 'center',
        marginBottom: 30,
        fontWeight: 'bold',
        textShadowColor: '#ffaa00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    input: {
        borderWidth: 1,
        borderColor: '#217736',
        backgroundColor: '#0a3a0a',
        color: '#ffffff',
        borderRadius: 10,
        padding: 15,
        marginBottom: 15,
        width: '100%',
        fontSize: 16,
        boxShadow: '0px 0px 15px rgba(6, 151, 42, 0.8)',
    },
    button: {
        borderRadius: 10,
        padding: 15,
        marginTop: 10,
        width: '100%',
        backgroundColor: 'green',
        boxShadow: '0px 0px 8px rgba(6, 151, 42, 0.8)',
        elevation: 8,
    },
    buttonDisabled: {
        backgroundColor: '#666',
        opacity: 0.6,
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
    },
    signupContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 20,
        gap: 5,
    },
    signupText: {
        color: '#cccccc',
        fontSize: 16,
        textShadowColor: '#cccccc',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    signupLink: {
        color: '#00ff00',
        fontSize: 16,
        fontWeight: 'bold',
        textDecorationLine: 'underline',
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    warning: {
        fontSize: 12,
        color: '#ff0000',
        textAlign: 'center',
        fontWeight: 'bold',
        marginTop: 20,
        textShadowColor: '#ff0000',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
});