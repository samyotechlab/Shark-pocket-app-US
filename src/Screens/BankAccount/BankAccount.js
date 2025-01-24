import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native'
import { bankStore } from '../../Service/Bank'
import { useNavigation } from '@react-navigation/native'
import { validateField } from '../../Utilities/ValidateField'


export default function BankAccount() {
    const navigation = useNavigation()
    const route = useRoute();
    const { user_id } = route.params
    const [bank_data, setBankData] = useState({
        name: '',
        account_no: '',
        confirm_account_no: '',
        ifsc_code: '',
        phone: '',
    });
    const [loader, setLoader] = useState(false)
    const [nameError, setNameError] = useState('');
    const [accountError, setAccountError] = useState('');
    const [confirmAccError, setConfirmAccError] = useState('');
    const [ifscError, setIfscError] = useState('');
    const [mobileError, setMobileError] = useState('');

    const handleInputChange = (name, value) => {
        setBankData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
        const error = validateField(name, value,bank_data.account_no);
        switch (name) {
            case "name":
                setNameError(error);
                break;
            case "account_no":
                setAccountError(error);
                break;
            case "confirm_account_no":
                setConfirmAccError(error);
                break;
            case "ifsc_code":
                setIfscError(error);
                break;
            case "phone":
                setMobileError(error);
                break;
            default:
                break;
        }
    };

    const validateForm = () => {
        const { name, account_no, confirm_account_no, ifsc_code, phone } = bank_data;
        const errors = {
            name: validateField("name", name),
            account_no: validateField("account_no", account_no),
            confirm_account_no: validateField("confirm_account_no", confirm_account_no,account_no),
            ifsc_code: validateField("ifsc_code", ifsc_code),
            phone: validateField("phone", phone),
        };
        setNameError(errors.name);
        setAccountError(errors.account_no);
        setConfirmAccError(errors.confirm_account_no);
        setIfscError(errors.ifsc_code);
        setMobileError(errors.phone);

        return !Object.values(errors).some((error) => error);
    };

    const handleVerifyBank = async () => {
        setLoader(true)
        try {
            if (!validateForm()) return;

            const obj = {
                user_id: user_id,
                name: bank_data?.name,
                bank_account: bank_data?.account_no,
                ifsc: bank_data?.ifsc_code,
                phone: bank_data?.phone,
            };
            console.log('obj', obj);

            const response = await bankStore(obj);
            console.log('response in bank', response);
            if (response?.status === 1) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Succesful',
                    text2: 'Bank Verify Successfullly',
                    visibilityTime: 3000
                });
                setBankData({
                    name: '',
                    account_no: '',
                    confirm_account_no: '',
                    ifsc_code: '',
                    phone: '',
                });
                setTimeout(() => {
                    navigation.goBack();
                }, 2000);
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Error!',
                    text2: 'Wrong Credencials',
                    visibilityTime: 3000,
                });
            }
        } catch (error) {
            console.log("error",error)
            const msg = error.msg
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error!',
                text2:  'Bank Verification Failed',
                visibilityTime: 3000,
            });
        } finally {
            setLoader(false)
        }
    };
    const handleNavigation = () => {
        navigation.navigate("Faq")
    }
    return (
        <>
            <BackgroundScreen />
            <CommonHeader title={"Bank Account"} />
            <Text style={styles.kyc}>Complete Your Bank Details  </Text>
            <View style={styles.container}>

                <View style={[{ justifyContent: 'center', marginVertical: hp('3%') }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Name"
                            placeholderTextColor="#FFFFFFCC"
                            keyboardType="default"
                            value={bank_data.name}
                            maxLength={25}
                            onChangeText={value => handleInputChange('name', value)}
                            error={Boolean(nameError)}
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
                            placeholder="Enter Account Number"
                            placeholderTextColor="#FFFFFFCC"
                            keyboardType="numeric"
                            value={bank_data.account_no}
                            maxLength={20}
                            onChangeText={value => handleInputChange('account_no', value)}
                            error={Boolean(accountError)}
                        />

                    </View>
                    {Boolean(accountError) && (
                        <Text style={styles.errorText}>{accountError}</Text>
                    )}
                </View>

                <View style={[{ justifyContent: 'center', marginBottom: wp('7%') }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Account Number"
                            placeholderTextColor="#FFFFFFCC"
                            keyboardType="numeric"
                            value={bank_data.confirm_account_no}
                            maxLength={20}
                            onChangeText={value => handleInputChange('confirm_account_no', value)}
                            error={Boolean(confirmAccError)}
                        />

                    </View>
                    {Boolean(confirmAccError) && (
                        <Text style={styles.errorText}>{confirmAccError}</Text>
                    )}
                </View>

                <View style={[{ justifyContent: 'center' }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter IFSC Code"
                            placeholderTextColor="#FFFFFFCC"
                            keyboardType="default"
                            value={bank_data.ifsc_code}
                            maxLength={11}
                            onChangeText={value => handleInputChange('ifsc_code', value)}
                            error={Boolean(ifscError)}
                            autoCapitalize="characters"
                        />

                    </View>
                    {Boolean(ifscError) && (
                        <Text style={styles.errorText}>{ifscError}</Text>
                    )}

                </View>
                <View style={[{ justifyContent: 'center', marginVertical: hp('3%') }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Contact No."
                            placeholderTextColor="#FFFFFFCC"
                            value={bank_data.phone}
                            keyboardType="numeric"
                            maxLength={10}
                            onChangeText={value => handleInputChange('phone', value)}
                            error={Boolean(mobileError)}
                        />


                    </View>
                    {Boolean(mobileError) && (
                        <Text style={styles.errorText}>{mobileError}</Text>
                    )}
                </View>
                <View style={[{ padding: hp('1%') }]}>
                    <CommonButton title={'Save'} onPress={handleVerifyBank} />
                    <Text style={styles.kycText}>
                        Why do we need your Bank Details?
                        <TouchableOpacity style={{ marginBottom: hp('1.3%') }} onPress={() => {
                            handleNavigation()
                        }}>
                            <Text style={[styles.kycText, { textDecorationLine: 'underline', fontFamily: 'Montserrat-Bold', }]}> Read FAQ’s</Text>
                        </TouchableOpacity>
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
        marginTop: hp('1%'),
    }
})