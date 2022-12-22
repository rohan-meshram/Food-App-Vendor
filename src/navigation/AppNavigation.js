import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';

import Splash from '../screens/Splash';
import Login from '../screens/Login';
import Dashboard from '../screens/Dashboard';
import EditItem from '../screens/EditItem';
import SelectLogin from '../screens/user/SelectLogin';
import UserLogin from '../screens/user/UserLogin';
import UserSignup from '../screens/user/UserSignup';
import Home from '../screens/user/Home';
import Cart from '../screens/user/Cart';
import Checkout from '../screens/user/Checkout/Checkout';
import Address from '../screens/user/Checkout/Address';
import AddNewAddress from '../screens/user/Checkout/AddNewAddress';

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
                <Stack.Screen name="SelectLogin"
                    component={SelectLogin}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="UserLogin"
                    component={UserLogin}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="UserSignup"
                    component={UserSignup}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Home"
                    component={Home}
                    options={{ headerShown: false }}
                />
                <Stack.Screen name="Cart"
                    component={Cart}
                 //   options={{ headerShown: false }}
                />
                <Stack.Screen name="Checkout"
                    component={Checkout}
                 //   options={{ headerShown: false }}
                />
                <Stack.Screen name="Address"
                    component={Address}
                 //   options={{ headerShown: false }}
                />
                <Stack.Screen name="AddNewAddress"
                    component={AddNewAddress}
                 //   options={{ headerShown: false }}
                />
            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default AppNavigation