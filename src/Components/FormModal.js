import { Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Icon from 'react-native-vector-icons/FontAwesome';
import CommonButton from './CommonButton';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { validateField } from '../Utilities/ValidateField';
import AlertDialogRed from './AlertDialogRed';
import { bankStore } from '../Service/Bank';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message'

export default function FormModal({ visible, onClose, userData, setVisible,bankDetails}) {
    const navigation = useNavigation()
    const [account, setAccountError] = useState('')
    const [confirmAccount, setConfirmAccError] = useState('')
    const [ifsc, setIfscError] = useState('')
    const [bankAccounts, setBankAccounts] = useState([
        { account_no: '', confirm_account_no: '', ifsc_code: '' }
    ]);
    const [loader, setLoader] = useState(false)
    const [isModalVisible, setModalVisible] = useState(false)
    const [message, setMessage] = useState('')
    const [bankDetail,setBankDetails] = useState({})

    const resetForm = () => {
        setBankAccounts({
            account_no: '',
            confirm_account_no: '',
            ifsc_code: '',
        });
    };

    const verifyBankDetails = async () => {
        const obj = {
            user_id: userData._id,
            name: userData.name,
            bank_account: bankAccounts.account_no,
            ifsc: bankAccounts.ifsc_code,
        };
        try {
            setLoader(true);
            if (bankAccounts.account_no !== bankAccounts.confirm_account_no) {
                Toast.show({
                    type: 'error',
                    text1: 'Account numbers do not match',
                });
                return;
            }
            const response = await bankStore(obj);
              setBankDetails(response.data)
            if (response?.status === 1) {
                Toast.show({
                    type: 'success',
                    position: 'top',
                    text1: 'Success',
                    text2: 'Bank Account Verify Successfull',
                    visibilityTime: 3000
                });
                setVisible(false)
                bankDetails();
                resetForm();
            } else if(response?.status === 0){
                setModalVisible(true)
                setMessage(response.message)
                bankDetails();
                setVisible(false)
                resetForm();
            }else{
                Toast.show({
                    type: 'error',
                    position: 'top',
                    text1: response.message,
                    text2: 'Try another bank account',
                    visibilityTime: 3000,
                });
                setVisible(false)
                resetForm();
            }
        } catch (error) {
            console.log('error', error);
        } finally {
            setLoader(false);
        }
    };

    const handleNavigate = async () => {
        setModalVisible(false)
        navigation.navigate('UploadDocument', { user_id: userData._id, mobile: userData.mobile ,bank_id:bankDetail._id})
    }

    const handleInputChange = (name, value) => {
        setBankAccounts(prevFormData => ({
            ...prevFormData,
            [name]: value,
        }))
        const error = validateField(name, value);
        switch (name) {
            case "account_no":
                setAccountError(error);
                break;
            case "confirm_account_no":
                setConfirmAccError(error);
                break;
            case "ifsc_code":
                setIfscError(error);
                break;
            default:
                break;
        }
    };
    return (
        <>
            <Modal
                visible={visible}
                animationType="slide"
                transparent
                onRequestClose={onClose}>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <LinearGradient colors={['#361911', '#361911', '#6A1700']} style={styles.modalBottomContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={styles.modalTitle}>Bank Details</Text>
                                <TouchableOpacity onPress={onClose}>
                                    <Icon name="close" size={30} color="red" />
                                </TouchableOpacity>
                            </View>
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Name"
                                placeholderTextColor="white"
                                value={userData?.name}
                            />
                            {Boolean(account) && (
                                <Text style={styles.errorText}>{account}</Text>
                            )}
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Account Number"
                                placeholderTextColor="white"
                                keyboardType="numeric"
                                value={bankAccounts?.account_no}
                                maxLength={20}
                                onChangeText={(value) => handleInputChange('account_no', value)}
                                error={Boolean(account)}
                            />

                            <TextInput
                                style={styles.input}
                                placeholder="Enter Confirm Account Number"
                                placeholderTextColor="white"
                                keyboardType="numeric"
                                value={bankAccounts?.confirm_account_no}
                                maxLength={20}
                                onChangeText={(value) => handleInputChange('confirm_account_no', value)}
                                error={Boolean(confirmAccount)}

                            />
                            {Boolean(ifsc) && (
                                <Text style={styles.errorText}>{ifsc}</Text>
                            )}
                            <TextInput
                                style={styles.input}
                                placeholder="Enter Ifsc Code"
                                placeholderTextColor="white"
                                keyboardType="default"
                                value={bankAccounts?.ifsc_code}
                                maxLength={11}
                                onChangeText={(value) => handleInputChange('ifsc_code', value)}
                                autoCapitalize="characters"
                                error={Boolean(ifsc)}
                            />

                            <CommonButton title={loader ? 'Loading...' : 'Verify'} onPress={() => verifyBankDetails()} />

                        </LinearGradient>

                    </View>
                </View>
            </Modal>
            <AlertDialogRed visible={isModalVisible} onClose={() => setModalVisible(false)} message={message} onOkPress={handleNavigate} bankShow={true} show={true}/>
            <Toast ref={Toast.setRef} />

        </>
    )
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: "rgba(0, 0, 0, 0.3)",
        justifyContent: "center",
        alignItems: "center",
    },

    modalContainer: {
        flex: 0.6,
        width: wp('95%'),
    },
    modalBottomContainer: {
        flex: 1,
        padding: hp('2%'),
        borderRadius: hp('4%'),
        backgroundColor: 'white',
        opacity: 0.9,
        borderWidth: hp('1%'),
        borderColor: 'rgba(255,255,255, 0.5)'
    },
    modalTitle: {
        fontSize: hp('2.5%'),
        fontFamily: 'Montserrat-SemiBold',
        color: 'white',
        marginRight: hp('8%'),
        marginBottom: hp('2%')
    },

    input: {
        width: "100%",
        height: hp('6%'),
        borderWidth: hp('0.12%'),
        borderColor: "#fff",
        borderRadius: hp('2%'),
        paddingHorizontal: hp('1%'),
        color: "#fff",
        marginBottom: hp('2.5%'),
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginLeft: wp('2%'),
    },
})