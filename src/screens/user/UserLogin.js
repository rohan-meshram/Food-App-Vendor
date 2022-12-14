import {
    View,
    Text,
    StyleSheet,
    Image,
    TextInput,
    TouchableOpacity
} from 'react-native'
import React, { useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'

import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../common/Loader'

const UserLogin = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [modalVisible, setModalVisible] = useState(false);

    const adminLogin = async () => {
        setModalVisible(true);
        firestore()
            .collection('users')
            // Filter results
            .where('Email', '==', email)
            .get()
            .then(querySnapshot => {
                setModalVisible(false);
                /* ... */
                 if (querySnapshot.docs[0]._data !== null) {
                     if (
                         querySnapshot.docs[0]._data.Email === email &&
                         querySnapshot.docs[0]._data.Password === password
                    ) {
                        goToNextScreen();
                     }
                       
                 }
               // console.log(querySnapshot.docs[0]._data);
            })
             .catch(error => {
                 setModalVisible(false);
              //   console.log(error);
                 alert('Please Check Email/Password');
             });
    };


    const goToNextScreen = async () => {
        await AsyncStorage.setItem('EMAIL', email)
        navigation.navigate('Home')
    }

    const [isIconVisible, setIsIconVisible] = useState(true)

    return (
        <View style={styles.container}>
            <View style={styles.imageBox}>
                <Image source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/people-eating-indian-food-5863595-4874947.png' }}
                    style={{ height: 200, width: 250 }} />
                <Text style={{
                    padding: 15,
                    fontSize: 32,
                    fontFamily: 'RobotoSlab-Bold',
                    color: '#FFECD1',
                }}>Login</Text>
            </View>

            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <View style={styles.formBox}>

                    <View style={styles.customInput}>
                        <Ionicons name='mail-outline' size={20} color={'#001524'} />
                        <TextInput placeholder='Email'
                            keyboardType={'email-address'}
                            value={email}
                            onChangeText={text => setEmail(text)}
                            style={{ flex: 1, paddingLeft: 10, fontSize: 16, fontFamily: 'RobotoSlab-Regular' }} />
                    </View>

                    <View style={styles.customInput}>
                        <Ionicons name='lock-closed-outline' size={20} color={'#001524'} />
                        <TextInput placeholder='Password'
                            secureTextEntry={isIconVisible ? true : false}
                            value={password}
                            onChangeText={text => setPassword(text)}
                            style={{ paddingLeft: 10, flex: 1, fontSize: 16, fontFamily: 'RobotoSlab-Regular' }} />

                        <TouchableOpacity onPress={() => setIsIconVisible(!isIconVisible)}>
                            <Ionicons name={isIconVisible ? 'eye-off-outline' : 'eye-outline'}
                                size={20} color={'#001524'} style={{ marginRight: 5 }} />
                        </TouchableOpacity>
                    </View>

                    <TouchableOpacity onPress={() => {
                        if (email !== '' && password !== '') {
                            adminLogin();
                        } else {
                            alert("Please Enter Data")
                        }

                    }}
                        style={{
                            alignItems: 'center',
                            backgroundColor: '#78290F',
                            padding: 15,
                            marginHorizontal: 80,
                            marginVertical: 20,
                            borderRadius: 10,
                            justifyContent: 'space-between',
                            borderWidth: 0.5
                        }}>
                        <Text style={{
                            fontFamily: 'RobotoSlab-Regular',
                            color: '#FFECD1',
                            fontSize: 18
                        }}>Login</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity onPress={() => { navigation.navigate('UserSignup') }}
                style={{ alignSelf: 'center', marginVertical: 50 }}>
                <Text style={styles.newUserText}>
                    Create New Account
                </Text>
            </TouchableOpacity>
                    <Loader modalVisible={modalVisible} setModalVisible={setModalVisible}/>
        </View>
    )
}

export default UserLogin

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#BA6144',
    },
    imageBox: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingVertical: 20,
        marginTop: 30
    },
    formBox: {
        //  height: '50%',
        width: '95%',
        backgroundColor: 'rgba(127,127,127,0.5)',
        borderRadius: 10,
    },
    customInput: {
        backgroundColor: '#FFECD1',
        marginHorizontal: 15,
        marginVertical: 10,
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        color: '#001524',
        flexDirection: 'row',
        alignItems: 'center'
    },
    newUserText: {
        fontSize: 16,
        fontFamily: 'RobotoSlab-SemiBold',
        color: '#FFECD1',
        textDecorationLine: 'underline'
    }
})