import { View, Text, StatusBar, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import Items from '../tabs/Items'
import Transactions from '../tabs/Transactions'
import Add from '../tabs/Add'
import Orders from '../tabs/Orders'
import Notifications from '../tabs/Notifications'

const Dashboard = () => {

    const [selectedTab, setSelectedTab] = useState(0);

    useFocusEffect(() => {
        StatusBar.setHidden(false)
    })

    return (
        <View style={styles.container}>
            {selectedTab == 0 ? (<Items />) :
                selectedTab == 1 ? (<Transactions />) :
                    selectedTab == 2 ? (<Add />) :
                        selectedTab == 3 ? (<Orders />) : (<Notifications />)}
            <View style={styles.bottomView}>

                <TouchableOpacity style={styles.bottomTab}
                    onPress={() => { setSelectedTab(0) }}>
                    <Image source={require('../../assets/images/items.png')}
                        style={[styles.bottomTabImage, {tintColor: selectedTab==0 ? '#FF7D00' : '#FFECD1'}]} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomTab}
                    onPress={() => { setSelectedTab(1) }}>
                    <Image source={require('../../assets/images/transaction.png')}
                        style={[styles.bottomTabImage, {tintColor: selectedTab==1 ? '#FF7D00' : '#FFECD1'}]} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomTab}
                    onPress={() => { setSelectedTab(2) }}>
                    <Image source={require('../../assets/images/add.png')}
                        style={[styles.bottomTabImage, { height: 38, width: 38, tintColor: selectedTab==2 ? '#FF7D00' : '#FFECD1' }]} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomTab}
                    onPress={() => { setSelectedTab(3) }}>
                    <Image source={require('../../assets/images/order.png')}
                        style={[styles.bottomTabImage, {tintColor: selectedTab==3 ? '#FF7D00' : '#FFECD1'}]} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomTab}
                    onPress={() => { setSelectedTab(4) }}>
                    <Image source={require('../../assets/images/notification.png')}
                        style={[styles.bottomTabImage, {tintColor: selectedTab==4 ? '#FF7D00' : '#FFECD1'}]} />
                </TouchableOpacity>

            </View>
        </View>
    )
}

export default Dashboard

const styles = StyleSheet.create({
    container: {
        flex: 1,
      //  marginBottom: 60
    },
    bottomView: {
        width: '100%',
        height: 60,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        position: 'absolute',
        bottom: 0,
        backgroundColor: '#78290F',
        elevation: 10,
    //    marginTop: 60
    },
    bottomTab: {
        height: '100%',
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
        
    },
    bottomTabImage: {
        width: 27,
        height: 27,
    }
})