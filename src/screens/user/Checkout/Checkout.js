import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity
} from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore';
import { useNavigation, useIsFocused } from '@react-navigation/native'

//import RazorpayCheckout from 'react-native-razorpay';

let userId = '';

const Checkout = () => {

    const [cartList, setCartList] = useState([]);
    const isFocused = useIsFocused();
    const [selectedAddress, setSelectedAddress] = useState('No Selected Address')

    const navigator = useNavigation()

    useEffect(() => {

        getCartItems();
        getAddressList();

    }, [isFocused])




    const getCartItems = async () => {
        userId = await AsyncStorage.getItem('USERID');
        const user = await firestore().collection('users').doc(userId).get();
        setCartList(user._data.Cart)
    }

    const getAddressList = async () => {
        const userId = await AsyncStorage.getItem('USERID')
        const addressId = await AsyncStorage.getItem('ADDRESS')
        const user = await firestore().collection('users').doc(userId).get();
        let tempCart = [];
        tempCart = user._data.Address;
        tempCart.map(item => {
            if (item.addressId == addressId) {
                setSelectedAddress(item.address + "," + item.city + "," + item.pincode + "," + item.mobile)
            }
        })
        //   console.log(tempCart);
    }

    const getTotal = () => {
        let total = 0;
        cartList.map(item => (
            total = total + item.data.Qty * item.data.DiscountPrice
        ))
        return total
    }

    return (
        <View style={styles.container}>
            <View>
                <FlatList data={cartList}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.itemView}>
                                <Image
                                    source={{ uri: item.data.imageURL }}
                                    style={styles.itemImage}
                                />
                                <View style={styles.nameView}>
                                    <Text style={styles.nameText}>{item.data.Name}</Text>
                                    <Text style={styles.desText}>{item.data.Description}</Text>
                                    <View style={styles.priceView}>
                                        <Text style={styles.priceText}>{'₹' + item.data.DiscountPrice}</Text>
                                        <Text style={styles.disPriceText}>{'₹' + item.data.Price}</Text>
                                    </View>
                                </View>
                                <Text style={[styles.nameText, { fontSize: 16 }]}>{'Qty : ' + item.data.Qty}</Text>
                            </View>
                        )
                    }} />
            </View>
            <View style={styles.totalView}>
                <Text style={styles.nameText}>Total</Text>
                <Text style={styles.nameText}>{'₹' + getTotal()}</Text>
            </View>
            <View style={styles.totalView}>
                <Text style={styles.nameText}>Selected Address</Text>
                <TouchableOpacity onPress={() => {
                    navigator.navigate('Address')
                }}>
                    <Text style={styles.editAddress}>Change Address</Text>
                </TouchableOpacity>
            </View>
            <Text style={{
                margin: 20,
                width: '100%',
                fontFamily: 'RobotoSlab-SemiBold',
                fontSize: 16,
                paddingRight: 20
            }}>{selectedAddress}</Text>

            <TouchableOpacity style={styles.checkoutBtn}
              onPress={() => {
                // var options = {
                //     description: 'Credits towards consultation',
                //     image: 'https://i.imgur.com/3g7nmJC.jpg',
                //     currency: 'INR',
                //     key: '<YOUR_KEY_ID>',
                //     amount: getTotal(),
                //     name: 'Acme Corp',
                //     order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
                //     prefill: {
                //       email: 'gaurav.kumar@example.com',
                //       contact: '9191919191',
                //       name: 'Gaurav Kumar'
                //     },
                //     theme: {color: '#53a20e'}
                //   }
                //   RazorpayCheckout.open(options).then((data) => {
                //     // handle success
                //     alert(`Success: ${data.razorpay_payment_id}`);
                //   }).catch((error) => {
                //     // handle failure
                //     alert(`Error: ${error.code} | ${error.description}`);
                //   });
              }}>
                <Text style={styles.checkoutText}>Pay Now {'₹' + getTotal()}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default Checkout

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFECD1'
    },
    itemView: {
        flexDirection: 'row',
        width: '95%',
        height: 100,
        alignSelf: 'center',
        elevation: 4,
        marginTop: 10,
        borderRadius: 10,
        backgroundColor: '#E9D3B4',
        marginBottom: 10,
        alignItems: 'center'
    },
    itemImage: {
        width: 110,
        height: 87,
        borderRadius: 10,
        margin: 5
    },
    nameView: {
        width: '55%',
        marginVertical: 4,
        marginHorizontal: 7
    },
    priceView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    nameText: {
        fontSize: 18,
        fontFamily: 'RobotoSlab-Bold',
        color: 'black'
    },
    desText: {
        fontSize: 14,
        fontFamily: 'RobotoSlab-Regular',
        color: 'black'
    },
    priceText: {
        fontSize: 18,
        color: 'green',
        fontFamily: 'RobotoSlab-SemiBold',
    },
    disPriceText: {
        fontSize: 17,
        color: 'red',
        fontFamily: 'RobotoSlab-SemiBold',
        textDecorationLine: 'line-through',
        marginLeft: 5
    },
    totalView: {
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'space-between',
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 20,
        height: 50,
        borderTopWidth: 1,
        alignItems: 'center',
        borderTopColor: '#8e8e8e'
    },
    editAddress: {
        color: '#2F62D1',
        textDecorationLine: 'underline',
        fontFamily: 'RobotoSlab-Regular',
        fontSize: 17
    },
    checkoutBtn: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        backgroundColor:'green',
        position: 'absolute',
        bottom: 20,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 2
    },
    checkoutText: {
        fontSize: 18,
        fontFamily: 'RobotoSlab-Bold',
        color: 'white'
    }
})