import {
    View,
    Text,
    StatusBar,
    StyleSheet,
    FlatList,
    Image,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import Header from '../../common/Header'
import firestore from '@react-native-firebase/firestore'
import { useNavigation, useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

let userId = '';

const Main = () => {

    const navigation = useNavigation();
    const [items, setItems] = useState([])
    const [cartCount, setCartCount] = useState(0);
    const isFocused = useIsFocused();

    useEffect(() => {
        const subscriber =
            firestore()
                .collection('items')
                .get()
                .then(querySnapshot => {

                    console.log('Total Item: ', querySnapshot.size);
                    let tempData = []
                    querySnapshot.forEach(documentSnapshot => {
                        console.log('Item ID: ',
                            documentSnapshot.id,
                            documentSnapshot.data(),
                        );
                        tempData.push({
                            id: documentSnapshot.id,
                            data: documentSnapshot.data(),
                        })
                    });
                    setItems(tempData)
                });
    }, []);

    useFocusEffect(() => {
        StatusBar.setHidden(false)
    })

useEffect(() => {
    getCartItems();
},[isFocused])    
    const getCartItems = async () => {
         userId = await AsyncStorage.getItem('USERID');
         const user = await firestore().collection('users').doc(userId).get();
        setCartCount(user._data.Cart.length)
    }
    const onAddToCart = async (item, index) => {
        
        const user = await firestore().collection('users').doc(userId).get();
        console.log(user._data.Cart);

        let tempCart = [];
        tempCart = user._data.Cart;
        if (tempCart.length > 0) {
            let existing = false;
            tempCart.map(itm => {
                if (itm.id === item.id) {
                    existing = true;
                    itm.data.Qty = itm.data.Qty + 1
                }
            })
            if (existing == false) {
                tempCart.push(item);
            }
            firestore().collection('users').doc(userId).update({
                Cart: tempCart,
            })
        } else {
            tempCart.push(item);
        }
        console.log(tempCart);
        firestore().collection('users').doc(userId).update({
            Cart: tempCart,
        })
        getCartItems();
    }

    return (
        <View style={styles.container}>
            <Header title={'Food App'}
                icon={require('../../../../assets/images/cart.png')}
                count={cartCount}
                onClickIcon={() => {
                    navigation.navigate('Cart')
                }} />
            <FlatList data={items} renderItem={({ item, index }) => {
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
                        <TouchableOpacity onPress={() => { onAddToCart(item, index); }}
                            style={[styles.addToCartBtn, { marginTop: 57, marginLeft: -45 }]}>
                            <Text style={{ color: '#fff', fontFamily: 'RobotoSlab-Regular' }}>Add To Cart</Text>
                        </TouchableOpacity>
                    </View>
                )
            }} />
        </View>
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginBottom: 60
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
    addToCartBtn: {
        backgroundColor: 'green',
        padding: 7,
        borderRadius: 10
    }
})



// To Add Item to cart --> Install package ' npm install react-native-uuid '  USED to generate unique string that can be used as user ID