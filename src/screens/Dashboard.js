import { View, Text, StatusBar, StyleSheet } from 'react-native'
import React, {useEffect, useState} from 'react'
import { useFocusEffect } from '@react-navigation/native'

const Dashboard = () => {

    useFocusEffect (() => {
        StatusBar.setHidden(false)
      })

  return (
    <View>
      <Text>Dashboard</Text>
    </View>
  )
}

export default Dashboard