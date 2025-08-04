import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Alert, Pressable, Modal, TextInput, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile} from 'firebase/auth';
import { useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import { useRouter } from 'expo-router'; // Add this import
import config from '../config.js';


export default function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [displayName, setDisplayName] = useState('');
    
    const router = useRouter(); // Add this hook

    useEffect(() => {
        // Initialize Firebase only once
        if (getApps().length === 0) {
            initializeApp(config);
        }
    }, []);
    
    const goToLogin = () => {
        router.push("/login");
    };

    const signUp = async () => {
        if (!displayName.trim()) {
            Alert.alert('Validation Error', 'Please enter your Adept name');
            return;
        }
        
        if (!email.trim() || !password.trim()) {
            Alert.alert('Validation Error', 'Please fill in all fields');
            return;
        }
        
        setLoading(true);
        try {
            const auth = getAuth();
            // Create the user account
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            
            // Update the user's profile with the display name
            await updateProfile(userCredential.user, {
                displayName: displayName
            });
            
            Alert.alert('Registration Successful', `Welcome, ${displayName}! Your account has been created.`);
            // Navigate to home after successful registration
            router.replace("/(auth)/Home");
        } catch (e) {
            console.log('Sign up failed:', e.code, e.message);
            Alert.alert('Registration Failed', e.message || 'An error occurred during registration');
        } finally {
            setLoading(false);
        }
    };

    return (
        <View style={styles.centeredView}>
            <View style={styles.loginContainer}>
                <KeyboardAvoidingView behavior='padding'>
                    <Text style={styles.titleTextStyle}>DATASPIRE ACCESS PROTOCOLS</Text>
                    <Text style={styles.subtitle}>++ AUTHENTICATION REQUIRED ++</Text>
                    <Text style={styles.flavorText}>
                        "Only the faithful may access the sacred data-vaults"
                    </Text>
                    <Text style={styles.warningText}>
                        Register your sanctified credentials:
                    </Text>
                    <TextInput 
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize='none'
                        keyboardType='email-address'
                        placeholder='Adept Designation (Email)'
                        placeholderTextColor='#666'/>
                    <TextInput
                        style={styles.input}
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholder='Sacred Cipher (Password)'
                        placeholderTextColor='#666'/>
                    <TextInput 
                        style={styles.input}
                        value={displayName}
                        onChangeText={setDisplayName}
                        autoCapitalize='none'
                        placeholder='Adept Name'
                        placeholderTextColor='#666'/>
                    {loading ? (
                        <ActivityIndicator size={'large'} style={{margin:28}}/>
                    ):(
                        <>
                            <Pressable style={styles.button} onPress={signUp} title="Sign Up"><Text style={styles.textStyle}>Register New Adept</Text></Pressable>
                            <Pressable style={styles.button} onPress={goToLogin} title="Already Registered?"><Text style={styles.textStyle}>Registered?</Text></Pressable>
                        </>
                    )}
                    <Text style={styles.footerText}>
                        {'>> The Emperor protects the faithful <<'}
                    </Text>
                </KeyboardAvoidingView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        backgroundColor: '#022004',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    loginContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        marginHorizontal: 20,
        borderStyle: 'solid',
        borderColor: '#217736',
        borderWidth: 2,
        marginBottom: 30,
        // Replace old shadow properties with boxShadow
        boxShadow: '0px 0px 10px rgba(6, 151, 42, 0.8)',
        elevation: 8,
    },
    titleTextStyle: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#00ff00',
        textAlign: 'center',
        marginBottom: 20,
        letterSpacing: 2,
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#ffaa00',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        textShadowColor: '#ffaa00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    flavorText: {
        fontSize: 18,
        color: '#ffffff',
        textAlign: 'center',
        fontStyle: 'italic',
        marginBottom: 20,
        paddingHorizontal: 20,
        textShadowColor: '#ffffff',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    warningText: {
        fontSize: 16,
        color: '#cccccc',
        textAlign: 'center',
        marginBottom: 20,
        paddingHorizontal: 20,
        textShadowColor: '#cccccc',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    footerText: {
        fontSize: 14,
        color: '#ff0000',
        textAlign: 'center',
        fontWeight: 'bold',
        fontStyle: 'italic',
        marginTop: 20,
        textShadowColor: '#ff0000',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
        
    },
    input: {
        borderWidth: 1,
        borderColor: '#217736',
        backgroundColor: '#0a3a0a',
        color: '#ffffff',
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        width: 300,
        alignSelf: 'center',
        boxShadow: '0px 0px 15px rgba(6, 151, 42, 0.8)',
    },
    button: {
        borderRadius: 10,
        padding: 12,
        marginTop: 15,
        width: 300,
        alignSelf: 'center',
        backgroundColor: 'green',
        // Replace old shadow properties with boxShadow
        boxShadow: '0px 0px 8px rgba(6, 151, 42, 0.8)',
        elevation: 8,
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
    },
});