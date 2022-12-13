import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native'

const Items = () => {

  const navigation = useNavigation();

  const [items, setItems] = useState([]);

  useEffect(() => {
    getItems();
  }, [])
  const getItems = () => {
    firestore()
      .collection('items')
      .get()
      .then(querySnapshot => {
        console.log('Total Items: ', querySnapshot.size);
        let tempData = []
        querySnapshot.forEach(documentSnapshot => {
          console.log(
            'User Id: ',
            documentSnapshot.id,
            documentSnapshot.data(),
          );
          tempData.push({
            id: documentSnapshot.id,
            data: documentSnapshot.data()
          })
        });
        setItems(tempData);
      });
  };

  const deleteItem = docId => {
    firestore()
      .collection('items')
      .doc(docId)
      .delete()
      .then(() => {
        console.log('User deleted!');
        getItems();
      });
  }

  return (
    <View style={styles.container}>
      <FlatList data={items} renderItem={({ item, index }) => {
        return (
          <View style={styles.itemView}>
            <Image source={{ uri: item.data.imageURL }}
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
            <View style={{ margin: 10 }}>
              <TouchableOpacity onPress={() => {
                navigation.navigate('EditItem', {
                  data: item.data,
                  id: item.id
                })
              }}>
                <Image source={require('../../assets/images/edit.png')} style={styles.icon} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => {
                deleteItem(item.id)
              }}>
                <Image source={require('../../assets/images/delete.png')} style={[styles.icon, { marginTop: 25 }]} />
              </TouchableOpacity>
            </View>
          </View>
        )
      }} />
    </View>
  )
}

export default Items

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFECD1'
  },
  itemView: {
    flexDirection: 'row',
    width: '90%',
    height: 100,
    alignSelf: 'center',
    elevation: 4,
    marginTop: 10,
    borderRadius: 10,
    backgroundColor: '#E9D3B4',
    marginBottom: 10
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
    paddingHorizontal: 10
  },
  icon: {
    width: 24,
    height: 24
  }
})