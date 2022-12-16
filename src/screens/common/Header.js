import { View, Text, StyleSheet, Dimensions, Image, TouchableOpacity } from 'react-native'
import React from 'react'


const { height, width } = Dimensions.get('window')

const Header = ({ title, icon, count, onClickIcon }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>{title}</Text>
      {icon && (
        <View style={{
          width: 50,
          height: 50,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <TouchableOpacity onPress={() => {
            onClickIcon();
          }}>
            <Image source={icon} style={styles.icon} />
          </TouchableOpacity>
          <View style={styles.count}>
            <Text style={{ color: '#fff' }}>{count ? count : '0'}</Text>
          </View>
        </View>
      )}
    </View>
  )
}


export default Header



const styles = StyleSheet.create({
  container: {
    height: 60,
    width: width,
    elevation: 5,
    backgroundColor: '#9F3B1A',
    alignItems: 'center',
    flexDirection: 'row',
    paddingRight: 20,
    paddingLeft: 25,
    justifyContent: 'space-between'
  },
  titleText: {
    fontSize: 22,
    fontFamily: 'RobotoSlab-SemiBold',
    color: '#FFECD1',
  },
  icon: {
    width: 35,
    height: 35,
    tintColor: '#FF7D00'
  },
  img: {
    width: 30,
    height: 30,
    tintColor: '#FF7D00'
  },
  count: {
    backgroundColor: 'red',
    width: 20,
    height: 20,
    borderRadius: 10,
    position: 'absolute',
    top: 5,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',

  }
})