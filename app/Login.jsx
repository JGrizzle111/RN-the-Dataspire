import React, { useState } from 'react';
import { Button, Text, View, StyleSheet, Alert, Pressable, Modal, TextInput, KeyboardAvoidingView, ActivityIndicator } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from 'firebase/auth';
import { useEffect } from 'react';
import { initializeApp, getApps } from 'firebase/app';
import config from '../config.js';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Initialize Firebase only once
        if (getApps().length === 0) {
            initializeApp(config);
        }
    }, []);
    
    const signIn = async () => {
        setLoading(true);
        try {
            const auth = getAuth();
            await signInWithEmailAndPassword(auth, email, password);
            Alert.alert('Sign In Successful');
        } catch (e) {
            Alert.alert('Sign in failed: ' + (e.message || e));
        } finally {
            setLoading(false);
        }
    };

    const signUp = async () => {
        setLoading(true);
        try {
            const auth = getAuth();
            await createUserWithEmailAndPassword(auth, email, password);
            Alert.alert('Check your emails!');
            window.alert('Check your emails!');
        } catch (e) {
            console.log('Sign up failed:', e.code, e.message);
            window.alert('Sign up failed: ' + (e.message || e));
            Alert.alert('Sign up failed: ' + (e.message || e));
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
                        Enter your sanctified credentials, Adept
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
                    {loading ? (
                        <ActivityIndicator size={'large'} style={{margin:28}}/>
                    ):(
                        <>
                            <Pressable style={styles.button} onPress={signUp} title="Sign Up"><Text style={styles.textStyle}>Register New Adept</Text></Pressable>
                            <Pressable style={styles.button} onPress={signIn} title="Sign In"><Text style={styles.textStyle}>Access Data-Vault</Text></Pressable>
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
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#022004',
        color: 'white',
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
        shadowColor: '#06972aff',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.5,
        shadowRadius: 8,
        elevation: 8,
    },
    modalView: {
        margin: 20,
        backgroundColor: '#022004',
        borderRadius: 20,
        borderColor: 'green',
        padding: 35,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#06972aff',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 1,
        shadowRadius: 8,
        elevation: 7,
    },
    button: {
        borderRadius: 10,
        padding: 12,
        elevation: 2,
        marginTop: 10,
        width: 275,
        backgroundColor: 'green',
        alignSelf: 'center',
    },
    buttonOpen: {
        backgroundColor: 'green',
    },
    buttonClose: {
        backgroundColor: 'red',
    },
    textStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize:18
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        color: 'green',
    },
    input: {
        width: 275,
        height: 40,
        backgroundColor: '#222',
        color: 'white',
        borderRadius: 8,
        paddingHorizontal: 10,
        marginVertical: 8,
        borderWidth: 1,
        borderColor: 'green',
        alignSelf: 'center',
    },
    titleTextStyle: {
        color: '#00ff00',
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        letterSpacing: 2,
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 2 },
        textShadowRadius: 8,
    },
    subtitle: {
        color: '#ffaa00',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 15,
        letterSpacing: 1,
    },
    flavorText: {
        color: '#ffffff',
        fontSize: 16,
        fontStyle: 'italic',
        textAlign: 'center',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    warningText: {
        color: '#cccccc',
        fontSize: 14,
        textAlign: 'center',
        marginBottom: 20,
    },
    footerText: {
        color: '#ff6666',
        fontSize: 12,
        textAlign: 'center',
        marginTop: 20,
        fontWeight: 'bold',
    },
});