import React, { useState } from "react";
import {
    StyleSheet,
    View,
    TextInput,
    Text
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

const AddNewAddress = ({navigation}) => {

    // ========== Start Create Method to Add Address to Firebase's Firestore  ===================
    const saveAddress = async () => {
        const addressId = uuid.v4();
        const userId = await AsyncStorage.getItem('USERID')
        const user = await firestore().collection('users').doc(userId).get();
        let tempCart = [];
        tempCart = user._data.Address;
        tempCart.push({address, city, pincode, mobile, addressId})

        firestore().
            collection('users').
            doc(userId).
            update({
                Address: tempCart,
            })
            .then(res => {
                console.log("Successfully Added");
                navigation.goBack();
            })
            .catch(error => {
                console.log(error)
            })
    }
    // ========== End Create Method to Add Address to Firebase's Firestore  ===================

    const [address, setAddress] = useState('')
    const [city, setCity] = useState('')
    const [pincode, setPincode] = useState('')
    const [mobile, setMobile] = useState('')

    return (
        <View style={styles.container}>
            <TextInput style={[styles.textInput, { marginTop: 30 }]}
                placeholder='Enter Address'
                value={address}
                onChangeText={txt => setAddress(txt)} />
            <TextInput style={[styles.textInput, { marginTop: 20 }]}
                placeholder='Enter City'
                value={city}
                onChangeText={txt => setCity(txt)} />
            <TextInput style={[styles.textInput, { marginTop: 20 }]}
                placeholder='Enter Pincode'
                value={pincode}
                keyboardType='number-pad'
                maxLength={6}
                onChangeText={txt => setPincode(txt)} />
            <TextInput style={[styles.textInput, { marginTop: 20 }]}
                placeholder='Enter Contact Number'
                keyboardType='number-pad'
                value={mobile}
                maxLength={10}
                onChangeText={txt => setMobile(txt)} />
            <TouchableOpacity onPress={() => {saveAddress()}}
                style={styles.addAddressButton}>
                <Text style={styles.AddText}>Save Address</Text>
            </TouchableOpacity>
        </View>
    )
}

export default AddNewAddress

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFECD1',
    },
    textInput: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        alignSelf: 'center',
        backgroundColor: '#E9D3B4',
        fontFamily: 'RobotoSlab-Regular',
        fontSize: 15
    },
    addAddressButton: {
        backgroundColor: '#78290F',
        width: '60%',
        height: 50,
        borderWidth: 0.5,
        borderRadius: 10,
        alignSelf: 'center',
        margin: 30,
        alignItems: 'center',
        justifyContent: 'center'
    },
    AddText: {
        color: '#FFECD1',
        fontSize: 17,
        fontFamily: 'RobotoSlab-SemiBold',
    }
})