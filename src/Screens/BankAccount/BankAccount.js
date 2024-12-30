import { StyleSheet, Text, TextInput, View } from 'react-native'
import React, { useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native'
import { bankStore } from '../../Service/Bank'


export default function BankAccount() {
    const route = useRoute();
    const {user_id} = route.params
    const [bank_data, setBankData] = useState({
        name: '',
        account_no: '',
        confirm_account_no:'',
        ifsc_code: '',
        phone: '',
    });
    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleInputChange = (name, value) => {
        setBankData(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        // console.log('formData', formData);
        const {name, account_no, ifsc_code, phone} = bank_data;
        console.log();
        const phoneRegex = /^[0-9]{10}$/;
    
        if (name === '') {
          setIsModalVisible(true);
          setMessage('Name is Required.');
          return false;
        }
    
        if (account_no === '') {
          setIsModalVisible(true);
          setMessage('Account Number is requried.');
          return false;
        }
    
        if (!phone.trim() || !phoneRegex.test(phone)) {
          setIsModalVisible(true);
          setMessage('Valid 10-digit phone number is required');
          return false;
        }
        if (ifsc_code === '') {
          setIsModalVisible(true);
          setMessage('IFSC code is requried.');
          return false;
        }
    
        return true;
      };

      const handleVerifyBank = async () => {
        console.log(user_id, 'userId');
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
          Toast.success('Verify Successfully');
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
          Toast.error('Wrong Credencials');
        }
      };
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
                            keyboardType="numeric"
                            value={bank_data.name}
                            maxLength={40}
                            onChangeText={value => handleInputChange('name', value)}
                        />

                    </View>
                </View>

                <View style={[{ justifyContent: 'center', marginBottom: wp('7%') }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Account Number"
                            placeholderTextColor="#FFFFFFCC"
                            keyboardType="phone-pad"
                            value={bank_data.account_no}
                            maxLength={20}
                            onChangeText={value => handleInputChange('account_no', value)}
                        />

                    </View>
                </View>

                <View style={[{ justifyContent: 'center', marginBottom: wp('7%') }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Confirm Account Number"
                            placeholderTextColor="#FFFFFFCC"
                            keyboardType="phone-pad"
                            value={bank_data.confirm_account_no}
                            maxLength={20}
                            onChangeText={value => handleInputChange('confirm_account_no', value)}
                        />

                    </View>
                </View>

                <View style={[{ justifyContent: 'center' }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter IFSC Code"
                            placeholderTextColor="#FFFFFFCC"
                            keyboardType="numeric"
                            value={bank_data.ifsc_code}
                            maxLength={11}
                            onChangeText={value => handleInputChange('ifsc_code', value)}
                        />

                    </View>
                </View>
                <View style={[{ justifyContent: 'center', marginVertical: hp('3%') }]}>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Enter Contact No."
                            placeholderTextColor="#FFFFFFCC"
                            value={bank_data.phone}
                            keyboardType="phone-pad"
                            maxLength={10}
                            onChangeText={value => handleInputChange('phone', value)}
                        />

                    </View>
                </View>
                <View style={[{ padding: hp('1%') }]}>
                    <CommonButton title={'Save'} onPress={handleVerifyBank}/>
                    <Text style={styles.kycText}>
                        Why do we need your Bank Details?
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