import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import Toast from 'react-native-toast-message'
import { getPanDetails, PanDocumentUpload, PanVerificationData } from '../../Service/PanVerfication'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import { validateField } from '../../Utilities/ValidateField'
import { userDetail } from '../../Service/Login'
import useLoginDataStorage from '../../Service/CustomStorageHook'
import ImagePicker from 'react-native-image-crop-picker';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Image } from 'react-native'
import AlertDialogRed from '../../Components/AlertDialogRed'
export default function PanVerfication() {
    const navigation = useNavigation();
    const { isReady, loginData } = useLoginDataStorage();
    const route = useRoute();
    const [loader, setLoader] = useState(false)
    const { user_id, mobile } = route.params
    const [panData, setPanData] = useState({
        name: '',
        pan_number: '',
    });
    const [panUploadData, setPanUploadData] = useState({})
    const [nameError, setNameError] = useState('');
    const [panError, setPanError] = useState('');
    const [userData, setUserData] = useState({});
    const [responseData, setResponse] = useState(1)
    const [uploadedImage, setUploadedImage] = useState(null);
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [uploadStatus, setUploadStatus] = useState(false)
    const [imageShow, setImageShow] = useState(false)
    const data = isReady && loginData && loginData?.data;

    const viewProfile = async () => {
        setLoader(true);
        try {
            const response = await userDetail(data._id);
            if (response.status === 1) {
                setUserData(response.data);
            }
        } catch (error) {
        } finally {
            setLoader(false);
        }
    };

    const panDetails = async () => {
        setLoader(true);
        try {
            const response = await getPanDetails(user_id);
            console.log("response", response)
            if (response.status === 1) {
                setPanUploadData(response.data);
                setUploadStatus(true)
            } else {
                setUploadStatus(false)
            }
        } catch (error) {
            console.log("error====>", error)
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        if (isReady) {
            viewProfile();
            panDetails();

        } else {
            setLoader(true);
        }
    }, [isReady, loginData]);

    const handleInputChange = (name, value) => {
        setPanData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
        const error = validateField(name, value);
        switch (name) {
            case "name":
                setNameError(error);
                break;
            case "pan_number":
                setPanError(error);
                break;
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
            }).catch((error) => {
                console.log(error)
            })
    };

    const handleUploadDocument = async () => {
        const data = new FormData();
        data.append('pancard', {
            uri: uploadedImage?.path,
            type: uploadedImage.type || 'image/jpeg',
            name: uploadedImage.filename || `pan_card_${Date.now()}.jpg`,
        });
        data.append('user_id', userData._id);
        data.append('mobile', mobile)
        setLoader(true)
        try {
            const response = await PanDocumentUpload(data)
            if (response.status == 1) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Image Upload SuccessFully',
                    text2: 'Admin Verify Your Details',
                    visibilityTime: 3000
                })
            }
            navigation.goBack()
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoader(false)
        }
    }

    const validateForm = () => {
        const { pan_number } = panData;

        const errors = {
            pan_name: validateField("pan_number", pan_number)
        }
        setPanError(errors.pan_name)

        return !Object.values(errors).some((error) => error);
    };

    const handleVerifyPan = async () => {
        if (!validateForm()) return;
        const obj = {
            user_id: user_id,
            name: userData.name,
            pan: panData.pan_number,
        };
        setLoader(true)
        try {
            const response = await PanVerificationData(obj);
            console.log("This PAN number is already registered", response)
            setResponse(response.status)
            if (response.status === 1) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Succesful',
                    text2: 'Pan Verify Successfullly',
                    visibilityTime: 3000
                })
                setTimeout(() => {
                    navigation.goBack();
                }, 2000);
            } else {
                setVisible(true)
                setMessage(response.message)
                // Toast.show({
                //     type: 'error',
                //     position: 'top',
                //     text1: 'Error!',
                //     text2: response.message,
                //     visibilityTime: 3000,
                // });
            }
        } catch (error) {
            const msg = error.message
            console.log('msg', msg)
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: msg,
                visibilityTime: 3000,
            });
            setResponse(0)
        } finally {
            setLoader(false)
        }
    };

    return (
        <>
            <BackgroundScreen />
            <CommonHeader title={"PAN Verification"} />
            <Text style={styles.kyc}>Complete Your PAN Details </Text>
            <View style={styles.container}>
                {
                    !uploadStatus ? (<>
                        <View style={[{ justifyContent: 'center', marginVertical: hp('3%') }]}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Full Name"
                                    placeholderTextColor="#FFFFFFCC"
                                    keyboardType="default"
                                    value={userData.name}
                                    maxLength={40}
                                    onChangeText={value => handleInputChange('name', value)}
                                    error={Boolean(nameError)}
                                    editable={false}
                                />
                            </View>
                            {Boolean(nameError) && (
                                <Text style={styles.errorText}>{nameError}</Text>
                            )}
                        </View>

                        <View style={[{ justifyContent: 'center', marginBottom: wp('7%') }]}>
                            <View style={styles.inputContainer}>
                                <TextInput
                                    style={styles.input}
                                    placeholder="Enter Pan Number"
                                    placeholderTextColor="#FFFFFFCC"
                                    keyboardType="default"
                                    maxLength={10}
                                    value={panData.pan_number}
                                    autoCapitalize="characters"
                                    onChangeText={value => handleInputChange('pan_number', value)}
                                    error={Boolean(panError)}
                                />
                            </View>
                            {Boolean(panError) && (
                                <Text style={styles.errorText}>{panError}</Text>
                            )}
                        </View>
                        <View style={[{ padding: hp('1%') }]}>
                            <CommonButton title={loader ? 'Loading...' : 'Save'} onPress={handleVerifyPan} />
                            <Text style={styles.kycText}>
                                Why do we need PAN Verification?
                                <TouchableOpacity style={{ marginBottom: hp('1.3%') }} onPress={() => { navigation.navigate('Faq') }}>
                                    <Text style={[styles.kycText, { textDecorationLine: 'underline', fontFamily: 'Montserrat-Bold', }]}> Read FAQ’s</Text>
                                </TouchableOpacity>
                            </Text>
                        </View>
                        {
                            responseData == 0 && (
                                <View style={[{ padding: hp('2%') }]}>
                                    <TouchableOpacity
                                        style={{
                                            height: hp('20%'),
                                            width: wp('80%'),
                                            borderWidth: 1,
                                            borderColor: '#ccc',
                                            borderRadius: 8,
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#FFFFFF80',
                                        }}
                                        onPress={openImagePicker}
                                    >
                                        {uploadedImage ? (
                                            <Image
                                                source={{ uri: uploadedImage?.path }}
                                                style={{
                                                    height: '100%',
                                                    width: '100%',
                                                    borderRadius: 8,
                                                    resizeMode: 'cover',
                                                }}
                                            />
                                        ) : (
                                            <View style={{ alignItems: 'center' }}>
                                                <Icon name="upload" size={30} color="#3E3E3E" />
                                                <Text style={{ marginTop: 8, color: '#3E3E3E', fontSize: 16 }}>
                                                    Upload Document
                                                </Text>
                                            </View>
                                        )}
                                    </TouchableOpacity>
                                    {
                                        uploadedImage && (<View style={{ padding: wp('5%') }}>
                                            <CommonButton title={loader ? 'Loading...' : 'Upload Documnet'} onPress={handleUploadDocument} />
                                        </View>)
                                    }

                                </View>
                            )
                        }
                    </>) : (<>
                        <View style={styles.container1}>
                            <TouchableOpacity onPress={() => setImageShow(true)}>
                                <Text style={styles.documentText}>{panUploadData.pan_card}</Text>
                            </TouchableOpacity>
                            <Text style={[styles.documentText, { color: 'red', fontFamily: 'Montserrat-SemiBold' }]}>Click Here</Text>
                            {
                                imageShow ? (<Image
                                    source={{ uri: panUploadData.imageUrl }} // Replace with actual image URL
                                    style={styles.image}
                                    resizeMode="contain"
                                />) : ("")
                            }

                            {/* <View style={styles.documentContainer}>
                           
                              
                                <Text style={styles.documentText}>This is your PAN document</Text>
                            </View> */}
                            <Text style={styles.adminText}>Your Documents are submitted and under progress for Validation</Text>
                        </View>
                    </>)
                }

                <Toast ref={Toast.setRef} />
            </View>
            <AlertDialogRed
                visible={visible}
                onClose={() => { setVisible(false) }}
                onOkPress={() => { setVisible(false) }}
                message={message}
            />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
        margin: hp('2%'),
        // backgroundColor: 'red'

    },
    box: {
        flex: 1,
        backgroundColor: 'red',
    },
    text: {
        textAlign: 'center',
        color: '#FFFFFF',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        borderRadius: hp('1.5%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('0.5%'),
        borderWidth: 1,
        borderColor: '#FFFFFF80',
        width: '100%',
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginTop: hp('1%'),
        marginLeft: wp('2%'),
    },
    kyc: {
        color: '#FFFFFFCC',
        fontSize: hp('1.3'),
        fontFamily: 'Montserrat-Regular',
        paddingHorizontal: hp('8%'),
    },
    kycText: {
        color: '#FFFFFF',
        fontSize: hp('1.5'),
        fontFamily: 'Montserrat-Regular',
    },
    container1: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        padding: 20,
    },
    documentContainer: {
        width: '90%',
        height: 250,
        backgroundColor: '#FFFFFF80',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 5,
        padding: 10,
    },
    image: {
        width: '100%',
        height: '100%',
        marginBottom: 10,
    },
    documentText: {
        fontSize: 14,
        color: '#EFC328',
        fontFamily: 'Montserrat-Medium',
        textAlign: 'center'
    },
    adminText: {
        marginTop: 20,
        fontSize: 16,
        color: '#EFC328',
        fontFamily: 'Montserrat-SemiBold',
        textAlign: 'center'
    },
})