// import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import BackgroundScreen from '../../Components/BackgroundScreen'
// import CommonHeader from '../../Components/CommonHeader'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
// import CommonButton from '../../Components/CommonButton'
// import Toast from 'react-native-toast-message'
// import { useRoute } from '@react-navigation/native'
// import { bankAccountDetails, bankStore } from '../../Service/Bank'
// import { useNavigation } from '@react-navigation/native'
// import { validateField } from '../../Utilities/ValidateField'
// import { userDetail } from '../../Service/Login'


// export default function BankAccount() {
//     const navigation = useNavigation()
//     const route = useRoute();
//     const { user_id } = route.params
//     const [bank_data, setBankData] = useState({
//         name: '',
//         account_no: '',
//         confirm_account_no: '',
//         ifsc_code: '',
//         phone: '',
//     });
//     const [loader, setLoader] = useState(false)
//     const [nameError, setNameError] = useState('');
//     const [accountError, setAccountError] = useState('');
//     const [confirmAccError, setConfirmAccError] = useState('');
//     const [ifscError, setIfscError] = useState('');
//     const [mobileError, setMobileError] = useState('');
//     const [bankDetail, setBankDetail] = useState({})
//     const [isLoading, setIsLoading] = useState(false);
//     const [userData, setUserData] = useState({});


//     const viewProfile = async () => {
//         setLoader(true);
//         try {
//             const response = await userDetail(user_id);
//             console.log('userResponse', response);
//             if (response.status === 1) {
//                 setUserData(response.data);
//             }
//         } catch (error) {
//         } finally {
//             setLoader(false);
//         }
//     };


//     const handleInputChange = (name, value) => {
//         setBankData((prevFormData) => ({
//             ...prevFormData,
//             [name]: value,
//         }));
//         const error = validateField(name, value, bank_data.account_no);
//         switch (name) {
//             case "name":
//                 setNameError(error);
//                 break;
//             case "account_no":
//                 setAccountError(error);
//                 break;
//             case "confirm_account_no":
//                 setConfirmAccError(error);
//                 break;
//             case "ifsc_code":
//                 setIfscError(error);
//                 break;
//             case "phone":
//                 setMobileError(error);
//                 break;
//             default:
//                 break;
//         }
//     };

//     const bankDetails = async () => {
//         try {
//             setIsLoading(true);
//             const response = await bankAccountDetails(user_id);
//             console.log('bank Details ', response);
//             setBankDetail(response.data)
//         } catch (error) {
//             console.log('error', error);
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     useEffect(() => {
//         viewProfile();
//         bankDetails();
//     }, [])

//     const validateForm = () => {
//         const { name, account_no, confirm_account_no, ifsc_code, phone } = bank_data;
//         const errors = {
//             name: validateField("name", name),
//             account_no: validateField("account_no", account_no),
//             confirm_account_no: validateField("confirm_account_no", confirm_account_no, account_no),
//             ifsc_code: validateField("ifsc_code", ifsc_code),
//             phone: validateField("phone", phone),
//         };
//         setNameError(errors.name);
//         setAccountError(errors.account_no);
//         setConfirmAccError(errors.confirm_account_no);
//         setIfscError(errors.ifsc_code);
//         setMobileError(errors.phone);

//         return !Object.values(errors).some((error) => error);
//     };

//     const handleVerifyBank = async () => {
//         setLoader(true)
//         try {
//             if (!validateForm()) return;

//             const obj = {
//                 user_id: user_id,
//                 name: bank_data?.name,
//                 bank_account: bank_data?.account_no,
//                 ifsc: bank_data?.ifsc_code,
//                 phone: bank_data?.phone,
//             };

//             const response = await bankStore(obj);
//             if (response?.status === 1) {
//                 Toast.show({
//                     type: 'success',
//                     position: 'top',
//                     text1: 'Succesful',
//                     text2: 'Bank Verify Successfullly',
//                     visibilityTime: 3000
//                 });
//                 setBankData({
//                     name: '',
//                     account_no: '',
//                     confirm_account_no: '',
//                     ifsc_code: '',
//                     phone: '',
//                 });
//                 setTimeout(() => {
//                     navigation.goBack();
//                 }, 2000);
//             } else {
//                 Toast.show({
//                     type: 'error',
//                     position: 'top',
//                     text1: 'Error!',
//                     text2: 'Wrong Credencials',
//                     visibilityTime: 3000,
//                 });
//             }
//         } catch (error) {
//             console.log("error", error)
//             const msg = error.msg
//             Toast.show({
//                 type: 'error',
//                 position: 'top',
//                 text1: 'Error!',
//                 text2: 'Bank Verification Failed',
//                 visibilityTime: 3000,
//             });
//         } finally {
//             setLoader(false)
//         }
//     };
//     return (
//         <>
//             <BackgroundScreen />
//             <CommonHeader title={"Bank Account"} />
//             <Text style={styles.kyc}>Complete Your Bank Details  </Text>
//             <View style={styles.container}>

//                 <View style={[{ justifyContent: 'center', marginVertical: hp('2%') }]}>
//                     <View style={styles.inputContainer}>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Name"
//                             placeholderTextColor="#FFFFFFCC"
//                             keyboardType="default"
//                             value={userData.name}
//                             maxLength={25}
                           
//                         />
//                     </View>
//                 </View>

//                 <View style={[{ justifyContent: 'center', marginBottom: wp('5%') }]}>
//                     <View style={styles.inputContainer}>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter Account Number"
//                             placeholderTextColor="#FFFFFFCC"
//                             keyboardType="numeric"
//                             value={bankDetail.account_no}
//                             maxLength={20}
//                             onChangeText={value => handleInputChange('account_no', value)}
//                             error={Boolean(accountError)}
//                         />

//                     </View>
//                     {Boolean(accountError) && (
//                         <Text style={styles.errorText}>{accountError}</Text>
//                     )}
//                 </View>

//                 <View style={[{ justifyContent: 'center', marginBottom: wp('3%') }]}>
//                     <View style={styles.inputContainer}>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Confirm Account Number"
//                             placeholderTextColor="#FFFFFFCC"
//                             keyboardType="numeric"
//                             value={bankDetail.account_no}
//                             maxLength={20}
//                             onChangeText={value => handleInputChange('confirm_account_no', value)}
//                             error={Boolean(confirmAccError)}
//                         />

//                     </View>
//                     {Boolean(confirmAccError) && (
//                         <Text style={styles.errorText}>{confirmAccError}</Text>
//                     )}
//                 </View>

//                 <View style={[{ justifyContent: 'center', marginVertical: hp('1%') }]}>
//                     <View style={styles.inputContainer}>
//                         <TextInput
//                             style={styles.input}
//                             placeholder="Enter IFSC Code"
//                             placeholderTextColor="#FFFFFFCC"
//                             keyboardType="default"
//                             value={bankDetail.ifsc_code}
//                             maxLength={11}
//                             onChangeText={value => handleInputChange('ifsc_code', value)}
//                             error={Boolean(ifscError)}
//                             autoCapitalize="characters"
//                         />

//                     </View>
//                     {Boolean(ifscError) && (
//                         <Text style={styles.errorText}>{ifscError}</Text>
//                     )}

//                 </View>
//                 <View style={[{ padding: hp('1%') }]}>
//                   {
//                     bankDetail ? ( <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center',gap:10 }}>
//                            <CommonButton title={'Add Account'} onPress={handleVerifyBank} />
//                            <CommonButton title={'Delete Account'} onPress={handleVerifyBank} />
//                     </View>)
//                     : ( <CommonButton title={'Verify'} onPress={handleVerifyBank} />)
//                   }
//                 </View>
//                 <Toast ref={Toast.setRef} />
//             </View>
//         </>
//     )
// }

// const styles = StyleSheet.create({
//     container: {
//         flex: 0.5,
//         margin: hp('2%'),
//     },
//     box: {
//         flex: 1,
//         backgroundColor: 'red',
//     },
//     text: {
//         textAlign: 'center',
//         color: '#FFFFFF',
//     },
//     inputContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         backgroundColor: 'transparent',
//         borderRadius: hp('1.5%'),
//         paddingHorizontal: wp('4%'),
//         paddingVertical: hp('0.5%'),
//         borderWidth: 1,
//         borderColor: '#FFFFFF80',
//         width: '100%',
//     },
//     input: {
//         flex: 1,
//         fontSize: 16,
//         color: '#FFFFFF',
//     },
//     errorText: {
//         color: 'red',
//         fontSize: 16,
//         marginTop: hp('1%'),
//         marginLeft: wp('2%'),
//     },
//     kyc: {
//         color: '#FFFFFFCC',
//         fontSize: hp('1.3'),
//         fontFamily: 'Montserrat-Regular',
//         paddingHorizontal: hp('8%'),
//     },
//     kycText: {
//         color: '#FFFFFF',
//         fontSize: hp('1.5'),
//         fontFamily: 'Montserrat-Regular',
//         marginTop: hp('1%'),
//     },
//     button: {
//         backgroundColor: '#2A1610',
//         borderColor: '#F5D236',
//         borderWidth: 1,
//         borderRadius: 8,
//         paddingVertical: 10,
//         paddingHorizontal: 10,
//         alignItems: 'center',
//         justifyContent: 'center',
//         shadowColor: '#F5D236',
//         shadowOffset: { width: 0, height: 0 },
//         shadowOpacity: 1,
//         shadowRadius: 12,
//         elevation: 15,
//       },
//       buttonText: {
//         color: '#F5D236',
//         fontSize: 18,
//       },
// })


import { StyleSheet, Text, TextInput, TouchableOpacity, View, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native'
import { bankAccountDetails, bankStore } from '../../Service/Bank'
import { useNavigation } from '@react-navigation/native'
import { validateField } from '../../Utilities/ValidateField'
import { userDetail } from '../../Service/Login'

export default function BankAccount() {
    const navigation = useNavigation();
    const route = useRoute();
    const { user_id } = route.params;
    
    const [bankAccounts, setBankAccounts] = useState([
        { id: Date.now(), account_no: '', confirm_account_no: '', ifsc_code: '' }
    ]);
    const [userData, setUserData] = useState({});
    const [loader, setLoader] = useState(false);

    useEffect(() => {
        viewProfile();
        bankDetails();
    }, []);

    const viewProfile = async () => {
        setLoader(true);
        try {
            const response = await userDetail(user_id);
            if (response.status === 1) {
                setUserData(response.data);
            }
        } catch (error) {
            console.log('Error fetching user details:', error);
        } finally {
            setLoader(false);
        }
    };

    const bankDetails = async () => {
        setLoader(true);
        try {
            const response = await bankAccountDetails(user_id);
            if (response.status === 1) {
                setBankAccounts(response.data);
            }
        } catch (error) {
            console.log('Error fetching bank details:', error);
        } finally {
            setLoader(false);
        }
    };

    const handleInputChange = (id, name, value) => {
        setBankAccounts(prevAccounts =>
            prevAccounts.map(account =>
                account.id === id ? { ...account, [name]: value } : account
            )
        );
    };

    const addBankAccountForm = () => {
        setBankAccounts([...bankAccounts, { id: Date.now(), account_no: '', confirm_account_no: '', ifsc_code: '' }]);
    };

    const verifyBankDetails = async (account) => {
        if (account.account_no !== account.confirm_account_no) {
            Toast.show({
                type: 'error',
                text1: 'Account numbers do not match',
            });
            return;
        }

        const obj = {
            user_id: user_id,
            name: userData.name,
            account_no: account.account_no,
            confirm_account_no: account.confirm_account_no,
            ifsc_code: account.ifsc_code,
        };

        try {
            setLoader(true);
            const response = await bankStore(obj);
            if (response?.status === 1) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Success',
                    text2: 'Bank Account Verified Successfully',
                    visibilityTime: 3000
                });
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Error!',
                    text2: 'Wrong Credentials',
                    visibilityTime: 3000,
                });
            }
        } catch (error) {
            console.log('Error verifying bank details:', error);
        } finally {
            setLoader(false);
        }
    };

    return (
        <>
            <BackgroundScreen />
            <CommonHeader title="Bank Account" />
            <Text style={styles.kyc}>Complete Your Bank Details</Text>
            <ScrollView style={styles.container}>
                {bankAccounts.map((account, index) => (
                    <View key={account.id} style={styles.bankForm}>
                        <Text style={styles.formTitle}>Bank Account {index + 1}</Text>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Account Number"
                                placeholderTextColor="#FFFFFFCC"
                                keyboardType="numeric"
                                value={account.account_no}
                                maxLength={20}
                                onChangeText={(value) => handleInputChange(account.id, 'account_no', value)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Confirm Account Number"
                                placeholderTextColor="#FFFFFFCC"
                                keyboardType="numeric"
                                value={account.confirm_account_no}
                                maxLength={20}
                                onChangeText={(value) => handleInputChange(account.id, 'confirm_account_no', value)}
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter IFSC Code"
                                placeholderTextColor="#FFFFFFCC"
                                keyboardType="default"
                                value={account.ifsc_code}
                                maxLength={11}
                                onChangeText={(value) => handleInputChange(account.id, 'ifsc_code', value)}
                                autoCapitalize="characters"
                            />
                        </View>

                        <CommonButton title="Verify" onPress={() => verifyBankDetails(account)} />
                    </View>
                ))}

                <CommonButton title="Add Account" onPress={addBankAccountForm} />

                <Toast ref={Toast.setRef} />
            </ScrollView>
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: hp('2%'),
    },
    kyc: {
        color: '#FFFFFFCC',
        fontSize: hp('1.5%'),
        fontFamily: 'Montserrat-Regular',
        textAlign: 'center',
        marginBottom: hp('2%'),
    },
    bankForm: {
        backgroundColor: '#222',
        padding: hp('2%'),
        marginBottom: hp('2%'),
        borderRadius: 8,
    },
    formTitle: {
        color: '#F5D236',
        fontSize: hp('2%'),
        fontWeight: 'bold',
        marginBottom: hp('1%'),
    },
    inputContainer: {
        backgroundColor: 'transparent',
        borderRadius: hp('1.5%'),
        paddingHorizontal: wp('4%'),
        paddingVertical: hp('0.5%'),
        borderWidth: 1,
        borderColor: '#FFFFFF80',
        marginBottom: hp('1.5%'),
    },
    input: {
        flex: 1,
        fontSize: 16,
        color: '#FFFFFF',
    },
});