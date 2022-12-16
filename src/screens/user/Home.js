import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'

import Main from './home_tabs/Main';
import Search from './home_tabs/Search';
import WishList from './home_tabs/WishList';
import Orders from './home_tabs/Orders';
import Profile from './home_tabs/Profile';

const Home = () => {

  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <View style={styles.container}>
      {selectedTab === 0 ? (<Main />) :
        selectedTab === 1 ? (<Search />) :
          selectedTab === 2 ? (<WishList />) :
            selectedTab === 3 ? (<Orders />) : (<Profile />)}

      <View style={styles.bottomTabView}>

        <TouchableOpacity style={styles.bottomTab} onPress={() => {
          setSelectedTab(0);
        }}>
          <Image
            source={selectedTab === 0 ? require('../../../assets/images/filled-home.png') : 
            require('../../../assets/images/home.png')}
            style={styles.bottomIcons} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={() => {
          setSelectedTab(1);
        }}>
          <Image
            source={ selectedTab === 1 ? require('../../../assets/images/filled-search.png') : 
            require('../../../assets/images/search.png')}
            style={[styles.bottomIcons, { width: 34, height: 34 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={() => {
          setSelectedTab(2);
        }}>
          <Image
            source={ selectedTab === 2 ? require('../../../assets/images/filled-wish.png') : 
            require('../../../assets/images/wish.png')}
            style={[styles.bottomIcons, { width: 37, height: 37 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={() => {
          setSelectedTab(3);
        }}>
          <Image
            source={selectedTab === 3 ? require('../../../assets/images/filled-orderfood.png') :
            require('../../../assets/images/orderfood.png')}
            style={[styles.bottomIcons, { width: 33, height: 33 }]} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bottomTab} onPress={() => {
          setSelectedTab(4);
        }}>
          <Image
            source={selectedTab === 4 ? require('../../../assets/images/filled-profile.png') :
              require('../../../assets/images/profile.png')}
            style={[styles.bottomIcons, { width: 28, height: 28 }]} />
        </TouchableOpacity>

      </View>
    </View>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFECD1'
  },
  bottomTabView: {
    flexDirection: 'row',
    height: 60,
    width: '100%',
    backgroundColor: '#78290F',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    elevation: 10,
    position: 'absolute',
    bottom: 0
  },
  bottomTab: {
    width: '20%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  bottomIcons: {
    width: 26,
    height: 26,
    tintColor: '#FF7D00'
  }
})