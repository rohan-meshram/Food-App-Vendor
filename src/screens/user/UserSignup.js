import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'
import Ionicons from 'react-native-vector-icons/Ionicons'


import { useNavigation } from '@react-navigation/native'
import Loader from '../common/Loader'

const UserSignup = () => {

    const navigation = useNavigation();
    const [isIconVisible, setIsIconVisible] = useState(true)

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [mobile, setMobile] = useState('');
    const [password, setPassword] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    const saveUser = () => {
        setModalVisible(true)
        firestore()
            .collection('user')
            .add({
                Name: name,
                Email: email,
                Mobile: mobile,
                Password: password
            }).then(res => {
                setModalVisible(false);
                navigation.goBack();
            })
            .catch(error => {
                console.log(error);
                setModalVisible(false)
            })
    }

    return (
        <View style={styles.container}>
            <Text style={[styles.registerText, { marginTop: 60 }]}>Register !</Text>
            <View >
                <TextInput style={[styles.textInput, { marginTop: 30 }]}
                    placeholder='Enter Name'
                    value={name}
                    onChangeText={txt => setName(txt)} />

                <TextInput style={styles.textInput}
                    placeholder='Enter Email Id'
                    value={email}
                    keyboardType='email-address'
                    onChangeText={txt => setEmail(txt)} />

                <TextInput style={styles.textInput}
                    placeholder='Enter Mobile Number'
                    value={mobile}
                    keyboardType='number-pad'
                    onChangeText={txt => setMobile(txt)} />

                <View style={styles.customTextBox}>
                    
                        <TextInput style={styles.textInput}
                        placeholder='Enter Password'
                        value={password}
                        onChangeText={txt => setPassword(txt)}
                        secureTextEntry={isIconVisible ? true : false} />
                    <TouchableOpacity onPress={() => setIsIconVisible(!isIconVisible)}>
                        <Ionicons name={isIconVisible ? 'eye-off-outline' : 'eye-outline'}
                            size={20} color={'#001524'} style={{ marginRight: 10 }} />
                    </TouchableOpacity>
                    
                </View>
            </View>
            <View style={styles.buttonContainer}>
                <TouchableOpacity onPress={() => {
                    if (email !== '' && password !== '' && name !== '' && (mobile !== '' && mobile.length === 10)) {
                        saveUser();
                        console.log("User Added!");
                    } else {
                        alert("Please Enter Data")
                    }
                }}
                    style={styles.signupButton}>
                    <Text style={styles.signupText}>Sign Up</Text>
                </TouchableOpacity>
                <Loader modalVisible={modalVisible} setModalVisible={setModalVisible} />
            </View>
        </View>
    )
}

export default UserSignup

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFECD1'
    },
    customTextBox: {
       // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        alignContent: 'center'
    },
    registerText: {
        fontFamily: 'RobotoSlab-Bold',
        color: '#78290F',
        fontSize: 28,
        alignSelf: 'center',
        margin: 10
    },
    textInput: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        margin: 10,
        alignSelf: 'center',
        backgroundColor: '#E9D3B4',
        fontFamily: 'RobotoSlab-Regular',
        fontSize: 15
    },
    buttonContainer: {
        //justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 40
    },
    signupButton: {
        backgroundColor: '#78290F',
        width: '60%',
        paddingHorizontal: 80,
        paddingVertical: 15,
        borderWidth: 0.5,
        borderRadius: 10
    },
    signupText: {
        color: '#FFECD1',
        fontSize: 17,
        fontFamily: 'RobotoSlab-SemiBold',
    }
})