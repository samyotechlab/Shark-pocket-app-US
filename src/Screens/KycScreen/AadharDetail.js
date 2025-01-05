import { Image, StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonButton from '../../Components/CommonButton'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import Toast from 'react-native-toast-message'
import CommonHeader from '../../Components/CommonHeader'
import { useNavigation, useRoute } from '@react-navigation/native'
import { AdharVerificationSendOtp } from '../../Service/AadharVerification'


export default function AadharDetail() {
    const route = useRoute()
    const { user_id } = route.params
    console.log(user_id)
    const [aadhaar_number, setAadharNumber] = useState('')
    const [aadharError, setAadharError] = useState('')
    const [aadharCard, setAadharCard] = useState({})
    const navigation = useNavigation()

    const validateInputs = () => {
        let valid = true;
        const aadharRegex = /^\d{4}\s\d{4}\s\d{4}$|^\d{12}$|^\d{16}$|^\d{4}\s\d{4}\s\d{4}\s\d{4}$/;
        if (!aadhaar_number.trim()) {
            setAadharError('Aadhar number is required');
            valid = false;
        } else if (!aadharRegex.test(aadhaar_number)) {
            setAadharError('aadhar number must be 16 digits');
            valid = false;
        } else {
            setAadharError('');
        }
        return valid;
    };
    const handleAadharDetail = async () => {
        try {
            const response = await AdharVerificationSendOtp(aadhaar_number);
            console.log("response", response)
            if (response.status === 1) {
                setAadharCard(response.data)
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Otp Send Successfully',
                    text2: 'Otp Send Succesffully in your given phone Number',
                    visibilityTime: 5000
                });
                setTimeout(() => {
                    navigation.navigate("AadharOtpVerify", { data: response.data, user_id ,aadhaar_number})
                }, 3000);
            }
        } catch (error) {
            console.log("error", error)
        } finally {

        }
    }
    return (
        <>
            <BackgroundScreen />
            <CommonHeader title={"KYC"} />
            <Text style={styles.kyc}>Complete Your KYC </Text>
            <View style={styles.container}>

                <View style={[{ justifyContent: 'center', marginVertical: hp('5%') }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Aadhar Number"
                            placeholderTextColor="#FFFFFFCC"
                            keyboardType="numeric"
                            maxLength={25}
                            value={aadhaar_number}
                            onChangeText={(text) => setAadharNumber(text)}
                            error={Boolean(aadharError)}
                        />

                    </View>
                    {Boolean(aadharError) && (
                        <Text style={styles.errorText}>{aadharError}</Text>
                    )}
                </View>
                <View style={[{ padding: hp('1%') }]}>
                    <CommonButton title={'Save'} onPress={handleAadharDetail} />
                    <Text style={styles.kycText}>
                        Why do we need KYC Verification?
                        <Text style={{ textDecorationLine: 'underline', fontFamily: 'Montserrat-Bold' }}> Read FAQ’s</Text>
                    </Text>
                </View>
                <Toast ref={Toast.setRef} />
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 0.5,
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