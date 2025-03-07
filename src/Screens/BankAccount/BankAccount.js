import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import Toast from 'react-native-toast-message'
import { useRoute } from '@react-navigation/native'
import { bankAccountDetails, bankStore, deleteBankAccount } from '../../Service/Bank'
import { useNavigation } from '@react-navigation/native'
import { userDetail } from '../../Service/Login'
import AlertDialogRed from '../../Components/AlertDialogRed'
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient'
import AnimatedLoader from '../../Components/AnimatedLoader'
import { validateField } from '../../Utilities/ValidateField'


export default function BankAccount() {
    const navigation = useNavigation()
    const route = useRoute();
    const { user_id } = route.params
    const [bankAccounts, setBankAccounts] = useState([
        { account_no: '', confirm_account_no: '', ifsc_code: '' }
    ]);
    const [bankAccount, setBankAccount] = useState([]);
    const [userData, setUserData] = useState({});
    const [loader, setLoader] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [visible, setVisible] = useState(false)
    const [account, setAccountError] = useState('')
    const [confirmAccount, setConfirmAccError] = useState('')
    const [ifsc, setIfscError] = useState('')


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

    const verifyBankDetails = async () => {
        const obj = {
            user_id: user_id,
            name: userData.name,
            bank_account: bankAccounts.account_no,
            ifsc: bankAccounts.ifsc_code,
        };
        console.log("obj === >", obj)

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
            console.log(response)
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
                setBankAccount(response.data);
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
            const response = await deleteBankAccount(user_id, account_no);
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

    const renderItem = ({ item }) => {
        return (<>
            <View style={styles.container}>
                <View style={styles.logoContainer}>
                    <Icon name="bank" size={30} color="#361911" />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.bankName}>{item.bank_name}</Text>
                    <Text style={styles.detail}>Account No: {item.account_no}</Text>
                    <Text style={styles.detail}>IFSC Code: {item.ifsc_code}</Text>
                </View>

                <TouchableOpacity style={styles.logoContainer} onPress={() => confirmDelete(item.account_no)}>
                    <Icon name="trash" size={30} color="red" />
                </TouchableOpacity>
            </View>
        </>)
    }


    return (
        <>
            <BackgroundScreen />
            <CommonHeader title={"Bank Account"} />
            <Text style={styles.kyc}>Complete Your Bank Details  </Text>
            <View style={{ padding: 10, margin: 10, alignItems: 'flex-end' }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: "#EFC328",
                        paddingVertical: 12,
                        paddingHorizontal: 15,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row'
                    }}
                    onPress={() => setVisible(true)}
                >
                    <Icon name="plus" size={15} color="#361911" />
                    <Text style={{ color: "#361911", fontSize: 16, fontFamily: 'Montserrat-SemiBold', marginHorizontal: 5 }}>Add Bank Details</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flex: 1 }}>
                {
                    bankAccount.length != 0 ? (
                        !loader ? (<FlatList
                            data={bankAccount}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                        />) : (
                            <AnimatedLoader />
                        )
                    ) : (
                        <View style={styles.noDataContainer}>
                            <Text style={styles.noDataText}>No data found</Text>
                        </View>
                    )
                }

            </View>
            <AlertDialogRed visible={isModalVisible} onClose={() => setModalVisible(false)} message='Are you sure you want to delete this account?' onOkPress={handleConfirmDelete} />

            <Toast ref={Toast.setRef} />

            <Modal visible={visible} animationType="slide" transparent>
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <LinearGradient colors={['#361911', '#361911', '#6A1700']} style={styles.modalBottomContainer}>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                                <Text style={styles.modalTitle}>Bank Details</Text>
                                <TouchableOpacity onPress={() => setVisible(false)}>
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
                            {/* {Boolean(confirmAccount) && (
                                <Text style={styles.errorText}>{confirmAccount}</Text>
                            )} */}


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

        </>
    )
}

const styles = StyleSheet.create({
    kyc: {
        color: '#FFFFFFCC',
        fontSize: hp('1.3'),
        fontFamily: 'Montserrat-Regular',
        paddingHorizontal: hp('8%'),
    },
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
    container: {
        flex: 1,
        backgroundColor: "rgba(255,255,255, 0.6)",
        borderRadius: 10,
        padding: 15,
        margin: 10,
        elevation: 5,
        borderWidth: 2,
        borderColor: 'white',
        flexDirection: 'row'
    },
    logoContainer: {
        flex: 0.5,
        alignItems: "center",
        marginBottom: 10,
        justifyContent: 'center'
    },
    detailsContainer: {
        flex: 2,
        marginBottom: 10,
    },
    bankName: {
        fontSize: 18,
        textAlign: "center",
        marginBottom: 5,
        fontFamily: 'Montserrat-Bold',
        color: '#361911'
    },
    detail: {
        fontSize: 16,
        textAlign: "center",
        color: "#361911",
        fontFamily: 'Montserrat-SemiBold'
    },
    noDataContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    noDataText: {
        fontSize: wp('5%'),
        color: 'white',
        fontFamily: 'Montserrat-Regular',
    },
    errorText: {
        color: 'red',
        fontSize: 16,
        marginLeft: wp('2%'),
    },
})




