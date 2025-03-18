import React, { useEffect, useState } from 'react';
import {
    View, Text, TextInput, TouchableOpacity, ScrollView, Image, StyleSheet
} from 'react-native';
import BackgroundScreen from './BackgroundScreen';
import CommonHeader from './CommonHeader';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useNavigation, useRoute } from '@react-navigation/native';
import { bankDocumentUpload, showReason } from '../Service/Bank';
import DropDownPicker from "react-native-dropdown-picker";
import Toast from 'react-native-toast-message'

const UploadDocuments = () => {
    const navigation =useNavigation();
    const route = useRoute()
    const { user_id, mobile,bank_id } = route.params
    console.log("user_id",user_id)
    console.log("bank_id",bank_id)
    console.log("mobile",mobile)
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedReason, setSelectedReason] = useState([]);
    const [loader, setLoader] = useState(false);
    const [reasons, setReasons] = useState([])
    const [remark, setRemark] = useState('');

    const [open, setOpen] = useState(false);
    const [value, setValue] = useState(null);


    const reasonList = async () => {
        try {
            const response = await showReason();
            console.log("response", response)
            const formattedData = response.map((item) => ({
                label: item.reason,
                value: item.reason,
            }));
            setReasons(formattedData)
        } catch (error) {
            console.log("error", error)
        }
    }

    useEffect(() => {
        reasonList()
    }, [])

    const toggleReason = (reason) => {
        if (selectedReason.includes(reason)) {
            setSelectedReason(selectedReason.filter(item => item !== reason));
        } else {
            setSelectedReason([...selectedReason, reason]);
        }
    };

    const openImagePicker = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(image => {
                setUploadedImage(image);
            })
            .catch(error => {
                console.log(error);
            });
    };

    const handleUploadDocument = async () => {
        const data = new FormData();
        data.append('bank', {
            uri: uploadedImage?.path,
            type: uploadedImage.type || 'image/jpeg',
            name: uploadedImage.filename || `bank_account_${Date.now()}.jpg`,
        });
        data.append('bank_id',bank_id)
        data.append('user_id', user_id);
        data.append('mobile', mobile);
        data.append('remark', remark)
        data.append('reason', value)
        setLoader(true)
        try {
            const response = await bankDocumentUpload(data)
            if (response.status == 1) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Image Upload SuccessFully',
                    text2: 'Admin Verify Your Details',
                    visibilityTime: 3000
                })
            }
            setUploadedImage(null);
            setRemark('');
            setValue('');
            navigation.navigate("BankAccount",{user_id:user_id})
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoader(false)
        }
    }
    return (
        <>
            <BackgroundScreen />
            <CommonHeader title="Additionally Document" />
            <ScrollView contentContainerStyle={styles.container}>
                <View style={{ margin: 10, padding: 10, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={styles.text}>
                        Before proceeding, ensure that your uploaded document is valid and accurate.
                        This document will be used for verification purposes.
                    </Text>
                </View>

                <View style={styles.section}>
                    <Text style={styles.label}>Select Reason:</Text>
                    <DropDownPicker
                        open={open}
                        value={value}
                        items={reasons}
                        setOpen={setOpen}
                        setValue={setValue}
                        setItems={setReasons}
                        onChangeValue={(selectedValue) => {
                            console.log("Selected Value:", selectedValue);
                            setValue(selectedValue);
                        }}
                        placeholder="Select a reason"
                        style={styles.dropdown}
                        dropDownContainerStyle={styles.dropdownContainer}
                        textStyle={styles.dropdownText}
                        ArrowDownIconComponent={() => <Icon name="chevron-down" size={22} color="#fff" />}
                        ArrowUpIconComponent={() => <Icon name="chevron-up" size={22} color="#fff" />}
                    />
                </View>

                <TextInput
                    style={styles.remarkInput}
                    placeholder="Enter remark here..."
                    placeholderTextColor="black"
                    value={remark}
                    onChangeText={setRemark}
                    multiline
                />
                <TouchableOpacity style={styles.uploadBox} onPress={openImagePicker}>
                    {uploadedImage ? (
                        <Image source={{ uri: uploadedImage?.path }} style={styles.uploadedImage} />
                    ) : (
                        <View style={styles.uploadContent}>
                            <Icon name="upload" size={30} color="#3E3E3E" />
                            <Text style={styles.uploadText}>Upload Document</Text>
                        </View>
                    )}
                </TouchableOpacity>
                {
                    uploadedImage && (
                        <TouchableOpacity
                            style={[styles.button]}
                            onPress={handleUploadDocument}
                        >
                            <Text style={[styles.buttonText]}>{loader ? 'Loading...' : 'Upload Document'}</Text>
                        </TouchableOpacity>
                    )
                }



            </ScrollView>
            <Toast ref={Toast.setRef} />

        </>
    );
};

const styles = StyleSheet.create({
    gradient: {
        flex: 1,
        paddingTop: 50,
        alignItems: 'center',
    },
    container: {
        padding: 20,
        alignItems: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#FFD700',
        textAlign: 'center',
        marginBottom: 10,
    },
    text: {
        fontSize: 14,
        color: '#fff',
        textAlign: 'justify',
        marginBottom: 20,
        fontFamily: 'Montserrat-SemiBold'
    },
    section: {
        marginBottom: 20,
        padding: 10,
        marginTop: -20
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        color: '#fff',
        fontFamily: 'Montserrat-SemiBold'

    },
    dropdown: {
        backgroundColor: '#FFFFFF80',
        borderRadius: 10,
        paddingHorizontal: 10,
        height: 50,

    },
    dropdownContainer: {
        backgroundColor: '#FFFFFF80',
        borderColor: 'white',
    },
    dropdownText: {
        fontSize: 16,
        color: 'black',
        fontFamily: 'Montserrat-SemiBold'
    },
    input: {
        width: '100%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        backgroundColor: '#fff',
        textAlignVertical: 'top',
    },
    pickerContainer: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },
    picker: {
        height: 50,
        width: '100%',
        color: '#000',
    },
    uploadBox: {
        width: '93%',
        height: 100,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF80',
        marginVertical: 30,
    },
    uploadedImage: {
        height: '100%',
        width: '100%',
        borderRadius: 8,
        resizeMode: 'cover',
    },
    uploadContent: {
        alignItems: 'center',
    },
    uploadText: {
        marginTop: 8,
        color: '#3E3E3E',
        fontSize: 16,
    },
    remarkBox: {
        width: 300,
        height: 130,
        borderWidth: 1,
        borderColor: '#ccc',
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#FFFFFF80',
        borderRadius: 8,
        padding: 10,
        marginBottom: 20
    },
    remarkText: {
        fontSize: 18,
        color: '#000',
        marginBottom: 10,
        fontFamily: 'Montserrat-Bold'
    },
    remarkInput: {
        width: '93%',
        height: '20%',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        backgroundColor: '#FFFFFF80',
        textAlignVertical: 'top',
        textAlign: 'left'
    },
    button: {
        width: '93%',
        backgroundColor: '#2A1610',
        borderColor: '#F5D236',
        borderWidth: 1,
        borderRadius: 8,
        paddingVertical: 10,
        paddingHorizontal: 10,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#F5D236',
        shadowOffset: { width: 0, height: 0 },
        shadowOpacity: 1,
        shadowRadius: 12,
        elevation: 15,
    },
    buttonText: {
        color: '#F5D236',
        fontSize: 18,
    },
});

export default UploadDocuments;
