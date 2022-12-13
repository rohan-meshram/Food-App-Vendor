import {
    View,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity
} from 'react-native'
import React from 'react'
import {useNavigation} from '@react-navigation/native'

const SelectLogin = () => {

const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.imgContainer}>
                <Image source={{uri : 'https://cdni.iconscout.com/illustration/premium/thumb/chef-welcoming-guest-in-restaurant-2660146-2215319.png'}}
                style={{height: 250, width: 250}}/>
            </View>
            <Text style={styles.typeText}>Select Login Type</Text>
            <TouchableOpacity onPress={() => {
                navigation.navigate('Login')
            }}
            style={[styles.button, {marginTop: 25}]}>
                <Text style={styles.buttonText}>Admin Login</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => {
                navigation.navigate('UserLogin')
            }}
            style={[styles.button, {marginVertical: 20}]}>
                <Text style={styles.buttonText}>Customer Login</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E4AB75',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imgContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: -150,
        paddingBottom: 25
    },
    typeText: {
        fontSize: 32,
        fontFamily: 'RobotoSlab-Bold',
        color: '#FFECD1',
        textDecorationLine: 'underline'
    }, 
    button: {
        backgroundColor: '#78290F',
        paddingVertical: 13,
        width: '60%',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 10
    },
    buttonText: {
        fontFamily: 'RobotoSlab-Regular',
              color: '#FFECD1',
              fontSize: 18
    }
})