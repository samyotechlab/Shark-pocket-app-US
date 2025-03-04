import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native'
import { bankAccountDetails, bankStore } from '../../Service/Bank'
import { useNavigation } from '@react-navigation/native'
import { userDetail } from '../../Service/Login'
import AlertDialogRed from '../../Components/AlertDialogRed'

export default function BankAccount() {
    const navigation = useNavigation()
    const route = useRoute();
    const { user_id } = route.params
    const [bankAccounts, setBankAccounts] = useState([
        { id: Date.now(), account_no: '', confirm_account_no: '', ifsc_code: ''}
    ]);
    const [hasBankAccount, setHasBankAccount] = useState(false);
    const [userData, setUserData] = useState({});
    const [loader, setLoader] = useState(false);
    const [verifiedAccounts, setVerifiedAccounts] = useState([]);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);


    const handleInputChange = (id, name, value) => {
        setBankAccounts(prevAccounts => prevAccounts.map(account => {
            return (
                account.id === id ? { ...account, [name]: value} : account
            )
        }))
        // const error = validateField(name, value);
        // switch (name) {
        //     case "account_no":
        //         setAccountError(error);
        //         break;
        //     case "confirm_account_no":
        //         setConfirmAccError(error);
        //         break;
        //     case "ifsc_code":
        //         setIfscError(error);
        //         break;
        //     default:
        //         break;
        // }
    };

    const addBankAccountForm = () => {
        setBankAccounts([...bankAccounts, { id: Date.now(), account_no: '', confirm_account_no: '', ifsc_code: '' }]);
    };

    const verifyBankDetails = async (account) => {
        const obj = {
            user_id: user_id,
            name: userData.name,
            bank_account: account.account_no,
            ifsc: account.ifsc_code,
        };
        try {
            setLoader(true);
            if (account.account_no !== account.confirm_account_no) {
                Toast.show({
                    type: 'error',
                    text1: 'Account numbers do not match',
                });
                return;
            }
            const response = await bankStore(obj);
            console.log(response)
            if (response?.status === 1) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Success',
                    text2: 'Bank Account Verify Successfull',
                    visibilityTime: 3000
                });
                bankDetails();
                setVerifiedAccounts((prev) => [...prev, account.id]);
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: response.message,
                    text2: 'Try another bank account',
                    visibilityTime: 3000,
                });
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoader(false);
        }
    };


    const viewProfile = async () => {
        setLoader(true);
        try {
            const response = await userDetail(user_id);
            if (response.status === 1) {
                setUserData(response.data);
            }
        } catch (error) {
        } finally {
            setLoader(false);
        }
    };

    const bankDetails = async () => {
        try {
            setLoader(true);
            const response = await bankAccountDetails(user_id);
            if (response.data.length > 0) {
                setBankAccounts(response.data);
                setHasBankAccount(true);
            } else {
                setBankAccounts([{ id: Date.now(), account_no: '', confirm_account_no: '', ifsc_code: '' }]);
                setHasBankAccount(false);
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoader(false);
        }
    };

    useEffect(() => {
        viewProfile();
        bankDetails();
    }, [])

    const confirmDelete = (account_no) => {
        setSelectedAccount(account_no);
        setModalVisible(true);
    };

    const handleConfirmDelete = async () => {
        if (selectedAccount) {
            await handleDelete(selectedAccount);
            setModalVisible(false);
        }
    };

    const handleDelete = async (account_no) => {
        console.log("Deleting account:", account_no);
        try {
            const response = await bankDelete(user_id, account_no);
            if (response.status === 1) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Success',
                    text2: 'Bank Account Deleted Successfully',
                    visibilityTime: 3000
                });
                bankDetails();
            } else {
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: 'Error',
                    text2: response.message || 'Failed to delete account',
                    visibilityTime: 3000
                });
            }
        } catch (error) {
            console.log('Error deleting account:', error);
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'Something went wrong',
                visibilityTime: 3000
            });
        }
    };


    return (
        <>
            <BackgroundScreen />
            <CommonHeader title={"Bank Account"} />
            <Text style={styles.kyc}>Complete Your Bank Details  </Text>
            <ScrollView style={styles.container}>
                {bankAccounts.map((account, index) => (
                    <View key={account.id} style={styles.bankForm}>

                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Account Number"
                                placeholderTextColor="#FFFFFFCC"
                                keyboardType="numeric"
                                value={userData?.name}
                                maxLength={20}
                                onChangeText={(value) => handleInputChange(account.id, 'account_no', value)}
                            />
                        </View>
                        <View style={styles.inputContainer}>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Account Number"
                                placeholderTextColor="#FFFFFFCC"
                                keyboardType="numeric"
                                value={account?.account_no?.toString()}
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
                                value={account?.confirm_account_no?.toString()}
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

                        {(account.isVerified !== 1) && (
                            <CommonButton
                                title={loader ? 'Loading...' : 'Verify'}
                                onPress={() => verifyBankDetails(account)}
                                disabled={verifiedAccounts.includes(account.id)}
                            />
                        )}
                        {(hasBankAccount && account.isVerified === 1 ) && (
                            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>

                                <CommonButton title="Add Account" onPress={addBankAccountForm} />

                                <CommonButton title="Delete Account" onPress={() => confirmDelete(account.account_no)} />
                            </View>
                        )}
                    </View>
                ))}

                <AlertDialogRed visible={isModalVisible} onClose={() => setModalVisible(false)} message='Are you sure you want to delete this account?' onOkPress={handleConfirmDelete} />

             
            </ScrollView>
            <Toast ref={Toast.setRef} />
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
    },
    button: {
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
    bankForm: {
        // backgroundColor: '#222',
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
})




