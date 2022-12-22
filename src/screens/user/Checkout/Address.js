import AsyncStorage from "@react-native-async-storage/async-storage";
import { useIsFocused } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    View,
    Text,
    TouchableOpacity,
    FlatList
} from "react-native";

import firestore from '@react-native-firebase/firestore'



const Address = ({ navigation }) => {

    const [addressList, setAddressList] = useState('')
    const IsFocused = useIsFocused()
    const [selectedAddress, setSelectedAddress] = useState('')

    useEffect(() => {
        getAddressList();
    }, [IsFocused])


    const getAddressList = async () => {
        const userId = await AsyncStorage.getItem('USERID')
        const addressId = await AsyncStorage.getItem('ADDRESS')
        const user = await firestore().collection('users').doc(userId).get();
        let tempCart = [];
        tempCart = user._data.Address;
        tempCart.map(item => {
            if (item.addressId == addressId) {
                item.selected = true
            } else {
                item.selected = false
            }
        })
        setAddressList(tempCart)
        //   console.log(tempCart);
    }

    const saveDefaultAddress = async (item) => {
        await AsyncStorage.setItem("ADDRESS", item.addressId)
        let tempCart = [];
        tempCart = addressList;
        tempCart.map(itm => {
            if (itm.addressId == item.addressId) {
                itm.selected = true
            } else {
                itm.selected = false
            }
        })

        let temp = []

        tempCart.map(item => {
            temp.push(item);
        })
        setAddressList(temp)
    }

    return (
        <View style={styles.container}>
            <FlatList data={addressList}
                renderItem={({ item, index }) => {
                    return (
                        <View style={[styles.addressItem,
                        { marginBottom: index == addressList.length - 1 ? 100 : 10 }]}>
                            <View>
                                <Text style={[styles.addViewText]}>{'Address: ' + item.address}</Text>
                                <Text style={styles.addViewText}>{'City: ' + item.city}</Text>
                                <Text style={styles.addViewText}>{'Pincode: ' + item.pincode}</Text>
                                <Text style={styles.addViewText}>{'Contact No. ' + item.mobile}</Text>
                            </View>
                            {item.selected == true ? (
                                <Text style={{marginLeft: -50, fontFamily: 'RobotoSlab-Regular', color: 'blue'}}>Default</Text>
                            ) : (
                                <TouchableOpacity style={styles.buttonDefault} onPress = {() => {
                                    saveDefaultAddress(item);
                                }}>
                                    <Text style={{ fontFamily: 'RobotoSlab-Regular', color: '#FFF' }}>Set Default</Text>
                                </TouchableOpacity>
                            )}
                        </View>
                    )
                }} />
            <TouchableOpacity onPress={() => {
                navigation.navigate('AddNewAddress')
            }}
                style={styles.addNewBut}>
                <Text style={styles.addNewText}>Add new Address</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Address

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFECD1',
    },
    addNewBut: {
        width: '90%',
        height: 50,
        backgroundColor: '#FF7D00',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        bottom: 10,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: .2,
        elevation: 10
    },
    addNewText: {
        fontSize: 18,
        fontFamily: 'RobotoSlab-SemiBold',
        color: '#FFECD1'
    },
    addressItem: {
        width: '90%',
        // height: 120,
        elevation: 4,
        alignSelf: 'center',
        marginTop: 20,
        backgroundColor: '#E9D3B4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 15,
        //  paddingTop: 10
         alignItems: 'center'
    },
    addViewText: {
        fontSize: 14,
        fontFamily: 'RobotoSlab-Regular',
        color: 'black'
    },
    buttonDefault: {
        backgroundColor: 'green',
        //  height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        //  width: 100,
        marginTop: 60,
        marginLeft: -80,
        padding: 10,
        borderRadius: 10,
        elevation: 5
    }
})