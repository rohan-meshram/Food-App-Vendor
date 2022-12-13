import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, PermissionsAndroid, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker'
import storage from '@react-native-firebase/storage' // for image upload
import firestore from '@react-native-firebase/firestore'  // for item details upload
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'


const EditItem = () => {

    const navigation = useNavigation();

    const route = useRoute()

    const [imageData, setImageData] = useState({ assets: [{ uri: route.params.data.imageURL }] })
    const [name, setName] = useState(route.params.data.Name)
    const [price, setPrice] = useState(route.params.data.Price)
    const [discount, setDiscount] = useState(route.params.data.DiscountPrice)
    const [description, setDescription] = useState(route.params.data.Description)
    const [imageURL, setimageURL] = useState('')

    const requestCameraPermission = async () => {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: "Cool Photo App Camera Permission",
                    message:
                        "Cool Photo App needs access to your camera " +
                        "so you can take awesome pictures.",
                    buttonNeutral: "Ask Me Later",
                    buttonNegative: "Cancel",
                    buttonPositive: "OK"
                }
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                console.log("You can use the camera");
                openGallery()
            } else {
                console.log("Camera permission denied");
            }
        } catch (err) {
            console.warn(err);
        }
    };

    const openGallery = async () => {
        const result = await launchImageLibrary({ mediaType: 'photo' });
        if (result.didCancel) {

        } else {
            console.log(result);
            setImageData(result)
        }
    };

    const uploadImage = async () => {
        const reference = storage().ref(imageData.assets[0].fileName);
        const pathToFile = imageData.assets[0].uri;
        // upload file
        await reference.putFile(pathToFile);
        const url = await storage()
            .ref(imageData.assets[0].fileName)
            .getDownloadURL();
        console.log(url);
        uploadItem(url);
    };

    const uploadItem = () => {
        firestore()
            .collection('items')
            .doc(route.params.id)
            .update({
                Name: name,
                Price: price,
                DiscountPrice: discount,
                Description: description,
                imageURL: route.params.data.imageURL + '',
            })
            .then(() => {
                console.log("Item Updated");
            })
    }

    return (
        <ScrollView style={styles.container}>
            <View style={styles.container}>
                <View style={[styles.header, { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }]}>
                    <View >
                        <TouchableOpacity onPress={() => { navigation.navigate('Dashboard') }}>
                            <Image source={require('../../assets/images/arrow.png')}
                                style={{ width: 30, height: 25, tintColor: '#FFECD1' }} />
                        </TouchableOpacity>
                    </View>
                    <Text style={[styles.headerText, { marginRight: 260 }]}>Edit Item</Text>
                </View>
                {imageData !== null ? (
                    <Image source={{ uri: imageData.assets[0].uri }}
                        style={styles.imageStyle} />
                ) : null}

                <TextInput style={styles.textInput}
                    placeholder='Enter Item Name'
                    value={name}
                    onChangeText={text => setName(text)} />

                <TextInput style={[styles.textInput, { marginTop: 13 }]}
                    placeholder="Enter Item's Price"
                    keyboardType='number-pad'
                    value={price}
                    onChangeText={text => setPrice(text)} />

                <TextInput style={[styles.textInput, { marginTop: 13 }]}
                    placeholder="Enter Item's Discount Price"
                    keyboardType='number-pad'
                    value={discount}
                    onChangeText={text => setDiscount(text)} />

                <TextInput style={[styles.textInput, { marginTop: 13 }]}
                    placeholder="Enter Item's Description"
                    value={description}
                    onChangeText={text => setDescription(text)} />

                <TextInput style={[styles.textInput, { marginTop: 13 }]}
                    placeholder="Enter Item's Image URL"
                    value={imageURL}
                    onChangeText={text => setimageURL(text)} />

                <Text style={{ fontSize: 20, fontFamily: 'RobotoSlab-SemiBold', marginVertical: 30, alignSelf: 'center' }}>OR</Text>
                <TouchableOpacity style={styles.pickImg} onPress={() => {
                    requestCameraPermission();
                }}>
                    <Text style={{ fontFamily: 'RobotoSlab-Regular', fontSize: 16, color: '#FFECD1' }}>Pick Image From Gallary</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => { uploadItem() }}
                    style={[styles.pickImg, { marginTop: 120, backgroundColor: '#FF7D00', borderWidth: 1, width: '50%', marginBottom: 70 }]}>
                    <Text style={{ fontFamily: 'RobotoSlab-Regular', fontSize: 16, color: '#FFECD1' }}>Update Item</Text>
                </TouchableOpacity>
            </View>
        </ScrollView>
    )
}

export default EditItem

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFECD1'
    },
    header: {
        height: 60,
        width: '100%',
        backgroundColor: "#BA6144",
        elevation: 8,
        paddingLeft: 20,
        justifyContent: 'center'
    },
    headerText: {
        fontSize: 24,
        fontFamily: 'RobotoSlab-SemiBold',
        color: '#FFECD1'
    },
    textInput: {
        width: '90%',
        height: 50,
        borderRadius: 10,
        borderWidth: 1,
        paddingLeft: 20,
        paddingRight: 20,
        marginTop: 30,
        alignSelf: 'center',
        backgroundColor: '#E9D3B4',
        fontFamily: 'RobotoSlab-Regular',
        fontSize: 15
    },
    pickImg: {
        width: '70%',
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        alignSelf: 'center',
        backgroundColor: '#78290F',
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageStyle: {
        width: '90%',
        height: 200,
        borderRadius: 10,
        alignSelf: 'center',
        marginTop: 20
    }
})