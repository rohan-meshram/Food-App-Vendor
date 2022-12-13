import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import EditItem from '../screens/EditItem';

const Stack = createStackNavigator();

AppNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator>
                <Stack.Screen name="Splash"
                    component={Splash}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Login"
                    component={Login}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Dashboard"
                    component={Dashboard}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="EditItem"
                    component={EditItem}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation