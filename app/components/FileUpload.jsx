import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { getFirestore, collection, query, getDocs, doc, addDoc, setDoc } from '@firebase/firestore';
import { db } from '../../config'

const Firestore = () => {
    const database = db
    const userRef = collection(database, 'users')
    
    const readData = async () => {
        try {
            const snapshot = await getDocs(query(userRef));
            snapshot.forEach(doc => {
                console.log(doc.id, '=>', doc.data());
            });
        } catch (e) {
            alert(e);
        }
    }

    const addData = async () => {
        console.log('addData called');
        try {
            let user = { name: "Tim", company: "my Coding School" }
            const docRef = await addDoc(userRef, user);
            console.log('Document written with ID: ', docRef.id);
            alert('Data added!');
        } catch (e) {
            alert(e.message || e);
        }
    }

    return (
        <View>
            <TouchableOpacity onPress={addData}>
                <Text style={{color: 'white'}}>Add Data</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={readData}>
                <Text style={{color: 'white'}}>Read Data</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Firestore;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    selectButton: {
        borderRadius:5,
        width: 150,
        height: 50,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    uploadButton: {
        marginTop: 2,
        borderRadius:5,
        width: 150,
        height: 50,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    }
});