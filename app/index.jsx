import React, { useState } from 'react';
import { Text, View, StyleSheet, Alert, Pressable, Modal, TextInput } from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import config from '../config.js';
import { initializeApp } from 'firebase/app';
import  Login from './login.jsx';


export default function Index() {
  return(
  <SafeAreaProvider>
    <SafeAreaView style={styles.centeredView}>  
      <View style={styles.centeredView}>
        <Login />
      </View>
    </SafeAreaView>  
  </SafeAreaProvider>
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
    borderRadius: 20,
    padding: 10,
    elevation: 2,
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
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'green',
  },
  input: {
    width: 250,
    height: 40,
    backgroundColor: '#222',
    color: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 8,
    borderWidth: 1,
    borderColor: 'green',
  },
});
