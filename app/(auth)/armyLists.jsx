import { Alert, Text, StyleSheet, View, Pressable, TextInput } from 'react-native'
import React, { useState, useCallback } from 'react'
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import * as DocumentPicker from 'expo-document-picker';

export default function ArmyLists() {
    const auth = getAuth();
    const storage = getStorage();
    const router = useRouter();
    const [uploading, setUploading] = useState(false);
    const [armyName, setArmyName] = useState('');

    const handleReturnHome = useCallback(() => {
        router.replace("/(auth)/Home");
    }, [router]);

    const pickFile = useCallback(async () => {
        try{
            const result = await DocumentPicker.getDocumentAsync({
                type: '*/*',
                copyToCacheDirectory: true,
            });

            if (!result.canceled && result.assets[0]) {
                const file = result.assets[0];
                await uploadFileToStorage(file);
            }
        } catch (error) {
            console.error("Error picking file:", error);
            Alert.alert("Error", "Failed to pick file. Please try again.");
        }
    }, [uploadFileToStorage]); // Add uploadFileToStorage to dependencies

    const uploadFileToStorage = useCallback(async (file) => {
        console.log("Current user:", auth.currentUser?.uid); // Debug log
        
        if (!auth.currentUser) {
            Alert.alert("Authentication Error", "You must be logged in to upload files.");
            return;
        }
        if (!armyName.trim()) {
            Alert.alert("Validation Error", "Please enter a name for your army list.");
            return;
        }

        setUploading(true);
        try {
            const fileName = `rosters/${auth.currentUser.uid}/${armyName}-${Date.now()}-${file.name}`;
            console.log("Uploading to:", fileName); // Debug log
            
            const storageRef = ref(storage, fileName);

            const response = await fetch(file.uri);
            const blob = await response.blob();

            const snapshot = await uploadBytes(storageRef, blob);
            const downloadURL = await getDownloadURL(snapshot.ref);
            console.log("File uploaded successfully:", downloadURL);
            Alert.alert("Upload Successful", 'File uploaded successfully!');
            
            // Clear the army name after successful upload
            setArmyName('');
        } catch (error) {
            console.error("Error uploading file:", error);
            console.error("Error details:", error.code, error.message); // More detailed error logging
            Alert.alert("Upload Error", "Failed to upload file. Please try again.");
        } finally {
            setUploading(false);
        }
    }, [auth.currentUser, storage, armyName]); // Add armyName to dependencies

    return (
        <SafeAreaProvider>
            <SafeAreaView style={styles.container}>
                <View style={styles.subContainer}>
                    <Text style={styles.title}>REGISTERED ARMY ROSTERS</Text>
                    <Text style={styles.subtitle}>Upload your army list files</Text>
                    
                    <TextInput
                        style={styles.input}
                        placeholder="Enter Army Name"
                        value={armyName}
                        onChangeText={setArmyName}
                    />
                    <Pressable
                        style={[styles.button, uploading && styles.buttonDisabled]}
                        onPress={pickFile}
                        disabled={uploading}
                    >
                        <Text style={styles.buttonTextStyle}>
                            {uploading ? 'Uploading...' : 'Upload Army List'}
                        </Text>
                    </Pressable>

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
        // Replace old shadow properties with boxShadow
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
    text: {
        fontSize: 16,
        color: '#00ff00',
        textAlign: 'center',
        marginBottom: 10,
        fontWeight: 'bold',
        textShadowColor: '#00ff00',
        textShadowOffset: { width: 0, height: 0 },
        textShadowRadius: 8,
    },
    button: {
        borderRadius: 10,
        padding: 12,
        marginTop: 10,
        width: 200,
        alignSelf: 'center',
        backgroundColor: 'green',
        // Replace old shadow properties with boxShadow
        boxShadow: '0px 4px 8px rgba(6, 151, 42, 0.8)',
        elevation: 8,
    },
    buttonTextStyle: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18
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
        boxShadow: '0px 0px 10px rgba(6, 151, 42, 0.8)'
    },
});