import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonButton from '../../Components/CommonButton'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Toast from 'react-native-toast-message'
import CommonHeader from '../../Components/CommonHeader'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AadharDocumentUpload, AdharVerificationSendOtp } from '../../Service/AadharVerification'
import Icon from 'react-native-vector-icons/FontAwesome';
import ImagePicker from 'react-native-image-crop-picker';
import { PanDocumentUpload } from '../../Service/PanVerfication'

export default function AadharDetail() {
    const route = useRoute()
    const { user_id, game_id, mobile } = route.params
    const [aadhaar_number, setAadharNumber] = useState('')
    const [aadharError, setAadharError] = useState('')
    const [aadharCard, setAadharCard] = useState({})
    const navigation = useNavigation()
    const [loader, setLoader] = useState(false);
    const [responseData, setResponse] = useState(1)
    const [uploadedImage, setUploadedImage] = useState(null);
    const [uploadedImages, setUploadedImages] = useState(null);



    const validateInputs = () => {
        let valid = true;
        const aadharRegex = /^(?:\d{4}\s\d{4}\s\d{4}|\d{12})$/;
        if (!aadhaar_number.trim()) {
            setAadharError('Aadhar number is required');
            valid = false;
        } else if (!aadharRegex.test(aadhaar_number)) {
            setAadharError('aadhar number must be 12 digits');
            valid = false;
        } else {
            setAadharError('');
        }
        return valid;
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
    const openImagePickers = () => {
        ImagePicker.openPicker({
            width: 300,
            height: 400,
            cropping: true,
        })
            .then(image => {
                setUploadedImages(image);
            }).catch((error) => {
                console.log(error)
            })
    };
    const handleUploadDocument = async () => {
        const data = new FormData();
        data.append('aadhar_front', {
            uri: uploadedImage.path,
            type: uploadedImage.type || 'image/jpeg',
            name: uploadedImage.filename || `aadhar_back_${Date.now()}.jpg`,
        });
        data.append('aadhar_back', {
            uri: uploadedImages.path,
            type: uploadedImages.type || 'image/jpeg',
            name: uploadedImages.filename || `aadhar_back_${Date.now()}.jpg`,
        });
        data.append('user_id', user_id);
        data.append('mobile', mobile)
        setLoader(true)
        try {
            const response = await AadharDocumentUpload(data);
            if (response.status == 1) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Image Upload SuccessFully',
                    text2: 'Admin Verify Your Details',
                    visibilityTime: 3000
                })
            }
        } catch (error) {
            console.error('Error uploading image:', error);
        } finally {
            setLoader(false)
        }
    }
    const handleAadharDetail = async () => {
        setLoader(true)
        try {
            if (validateInputs()) {
                const response = await AdharVerificationSendOtp(aadhaar_number);
                setResponse(response.status)
                if (response.status === 1) {
                    Toast.show({
                        type: 'success',
                        position: 'top',
                        text1: 'Otp Send Successfully',
                        text2: 'Otp Send Succesffully in your given phone Number',
                        visibilityTime: 5000
                    });
                    navigation.navigate("AadharOtpVerify", { data: response.data, user_id, aadhaar_number, game_id ,mobile})
                    setLoader(false)
                    setAadharCard(response.data)
                } else {
                    console
                    Toast.show({
                        type: 'error',
                        position: 'top',
                        text1: response?.message,
                        text2: "something went wrong please try after some time",
                        visibilityTime: 4000,
                    });
                    setLoader(false)
                    setResponse(0)
                }
            } else {
                setLoader(false)
                setResponse(0)

            }
        } catch (error) {
            console.log("error", error)
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: "something went wrong please try after some time",
                visibilityTime: 4000,
            });
            setResponse(0)
            setLoader(false)
        } finally {
            setLoader(false)
        }
    }
    return (
        <>
            <BackgroundScreen />
            <CommonHeader title={"KYC"} />
            <Text style={styles.kyc}>Complete Your KYC </Text>
            <View style={styles.container}>
                <View style={[{ justifyContent: 'center', marginVertical: hp('2%') }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Aadhar Number"
                            placeholderTextColor="#FFFFFFCC"
                            keyboardType="numeric"
                            maxLength={12}
                            value={aadhaar_number}
                            onChangeText={(text) => setAadharNumber(text)}
                            error={Boolean(aadharError)}
                        />

                    </View>
                    {Boolean(aadharError) && (
                        <Text style={styles.errorText}>{aadharError}</Text>
                    )}
                </View>
                <View style={[{ paddingTop: hp('2%') }]}>
                    <CommonButton
                        title={loader ? 'Loading...' : 'Save'}
                        onPress={handleAadharDetail}
                        disabled={loader}
                    />
                    <Text style={styles.kycText}>
                        Why do we need Aadhar Verification?
                    </Text>
                </View>
            </View>
            <View style={styles.container1}>
                {
                    responseData == 0 && (
                        <View style={{ gap: 20, justifyContent: 'center', alignItems: 'center' }}>
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
                                            Upload Front AadharCard
                                        </Text>
                                    </View>
                                )}
                            </TouchableOpacity>
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
                                onPress={openImagePickers}
                            >
                                {uploadedImages ? (
                                    <Image
                                        source={{ uri: uploadedImages?.path }}
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
                                            Upload Back AadharCard
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
            </View>
            <Toast ref={Toast.setRef} />
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.4,
        margin: hp('2%'),
    },
    container1: {
        flex: 1,
        margin: hp('2%'),
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
        marginTop: hp('2%'),
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
        paddingHorizontal: hp('2%'),
        paddingVertical: hp('2%'),
    }
})