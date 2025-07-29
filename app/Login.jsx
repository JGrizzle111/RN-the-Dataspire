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
            <KeyboardAvoidingView behavior='padding'>
                <Text style={styles.titleTextStyle}> Sign Up / Sign In</Text>
                <TextInput 
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize='none'
                    keyboardType='email-address'
                    placeholder='Email'/>
                <TextInput
                    style={styles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    placeholder='Password'/>
                {loading ? (
                    <ActivityIndicator size={'large'} style={{margin:28}}/>
                ):(
                    <>
                        <Pressable style={styles.button} onPress={signUp} title="Sign Up"><Text style={styles.textStyle}>Sign Up</Text></Pressable>
                        <Pressable style={styles.button} onPress={signIn} title="Sign In"><Text style={styles.textStyle}>Sign In</Text></Pressable>
                    </>
                )}
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'black',
        color: 'white'
    },
    modalView: {
        margin: 20,
        backgroundColor: 'black',
        borderRadius: 20,
        borderColor: 'green',
        padding: 35,
        height: 250,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: 'green',
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
    },
    titleTextStyle: {
        color: 'white',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
});