import { View, Text, StyleSheet, Image, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'

const Splash = () => {

  useFocusEffect (() => {
    StatusBar.setHidden(true)
  })

  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('SelectLogin')
     // StatusBar.setHidden(false)
    }, 2500)
  }, [])



  return (
    <View style={styles.container}>
      
      <View style={styles.imageContainer}>
        <Image source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/indian-food-5863587-4874941.png' }}
          style={{ height: 200, width: 250 }} />
        <View style={styles.textContainer}>
          <Text style={styles.inputText}>Food</Text>
          <Text style={[styles.inputText, { marginTop: -13 }]}>App</Text>
        </View>
      </View>

      <View style={styles.bottomContainer}>
        <Text style={styles.bottomText}>Cooked with Perfection</Text>
      </View>
    </View>
  )
}

export default Splash

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#78290F',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    // paddingBottom: 100,
  //  marginBottom:
  },
  inputText: {
    fontSize: 32,
    fontFamily: 'RobotoSlab-Bold',
    color: '#FFECD1',
  },
  imageContainer: {
    alignItems: 'center',
    marginVertical: 180,
    padding: 50
  },
  bottomContainer: {
    alignItems: 'center'
  },
  bottomText: {
    color: '#FFECD1',
    fontSize: 16,
    fontFamily: 'RobotoSlab-Regular'
  }
})