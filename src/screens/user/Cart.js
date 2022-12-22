import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
import firestore from '@react-native-firebase/firestore'

import Header from '../common/Header';

let userId = '';

const Cart = () => {

    const isFocused = useIsFocused();
    const [cartList, setCartList] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        getCartItems();
    }, [isFocused])

    const getCartItems = async () => {
        userId = await AsyncStorage.getItem('USERID');
        const user = await firestore().collection('users').doc(userId).get();
        setCartList(user._data.Cart)
    }

    const addItem =async (item) => {
        const user = await firestore().collection('users').doc(userId).get();
        let tempCart = [];
        tempCart = user._data.Cart;
        tempCart.map(itm => {
            if (itm.id == item.id) {
                itm.data.Qty = itm.data.Qty + 1
            }
        })
        firestore().collection('users').doc(userId).update({
            Cart: tempCart,
        })
        getCartItems();
    }

    const removeItem =async (item) => {
        const user = await firestore().collection('users').doc(userId).get();
        let tempCart = [];
        tempCart = user._data.Cart;
        tempCart.map(itm => {
            if (itm.id == item.id) {
                itm.data.Qty = itm.data.Qty - 1
            }
        })
        firestore().collection('users').doc(userId).update({
            Cart: tempCart,
        })
        getCartItems();
    }

    const deleteItem =async index => {
        const user = await firestore().collection('users').doc(userId).get();
        let tempCart = [];
        tempCart = user._data.Cart;
        tempCart.splice(index, 1);
        firestore().collection('users').doc(userId).update({
            Cart: tempCart,
        })
        getCartItems();
    }


    const getTotal = () => {
        let total = 0;
        cartList.map (item => (
            total = total + item.data.Qty * item.data.DiscountPrice
        ))
        return total
    }

    return (
        <View style={styles.container}>
            {/* <Header title={'Cart'}
                 /> */}
            <FlatList data={cartList} renderItem={({ item, index }) => {
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
                        <View style={styles.AddRemove}>
                            <TouchableOpacity onPress={() => {
                                if(item.data.Qty > 1){
                                    removeItem(item);
                                }else{
                                    deleteItem(index)
                                }
                                
                            }}
                                style={[styles.addToCartBtn, {
                                    width: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: -30,
                                    marginRight: 5,
                                    backgroundColor: 'green'
                                }]}>
                                <Text style={{ color: '#FFECD1', fontSize: 20, fontWeight: 'bold' }}>-</Text>
                            </TouchableOpacity>

                            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.data.Qty}</Text>

                            <TouchableOpacity onPress={() => {
                                addItem(item);
                            }}
                                style={[styles.addToCartBtn, {
                                    width: 30,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: 5,
                                    backgroundColor: 'green'
                                }]}>
                                <Text style={{
                                    color: '#FFECD1',
                                    fontSize: 20,
                                    fontWeight: 'bold'
                                }}>+</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )
            }} />
            {cartList.length > 0 && (
                <View style={styles.checkoutView}>
                <Text style={styles.checkoutText}>{'Items (' + cartList.length + ')\nTotal: ₹' +getTotal()}</Text>
                <TouchableOpacity onPress={() => {navigation.navigate('Checkout')}}
                    style={[styles.addToCartBtn, {width: 120, height:40, justifyContent: 'center', alignItems: 'center', marginLeft: 60}]}>
                    <Text style={styles.checkoutText}>Checkout</Text>
                </TouchableOpacity>
            </View>
            )}
            
        </View>
    )
}

export default Cart

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
        fontFamily: 'RobotoSlab-SemiBold',
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
    AddRemove: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 55,

    },
    addToCartBtn: {
        backgroundColor: '#FF7D00',
        padding: 3,
        borderRadius: 10
    },
    checkoutView: {
        width: '100%',
        height: 60,
        backgroundColor: '#78290F',
        elevation: 5,
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    checkoutText: {
        fontSize: 18,
        fontFamily: 'RobotoSlab-SemiBold',
        color: '#FFECD1'
    }
})