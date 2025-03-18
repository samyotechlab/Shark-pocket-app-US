import { FlatList, Image, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonHeader from '../../Components/CommonHeader'
import Toast from 'react-native-toast-message'
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native'
import { bankAccountDetails, deleteBankAccount } from '../../Service/Bank'
import { userDetail } from '../../Service/Login'
import AlertDialogRed from '../../Components/AlertDialogRed'
import Icon from 'react-native-vector-icons/FontAwesome';
import AnimatedLoader from '../../Components/AnimatedLoader'
import FormModal from '../../Components/FormModal'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'


export default function BankAccount() {
    const route = useRoute();
    const { user_id, mobile } = route.params
    const navigation = useNavigation()
    const [bankAccount, setBankAccount] = useState([]);
    const [userData, setUserData] = useState({});
    const [loader, setLoader] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [message, setMessage] = useState('')
    const [selectedAccount, setSelectedAccount] = useState(null);
    const [visibles, setVisible] = useState(false)

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

      useFocusEffect(
        useCallback(() => {
          viewProfile();
          bankDetails();
        }, []),
      );
    

    useEffect(() => {
        viewProfile();
        bankDetails();
    }, [])

    const confirmDelete = (account_no) => {
        setSelectedAccount(account_no);
        setModalVisible(true);
        setMessage('Are you sure you want to delete a account')
    };

    const handleConfirmDelete = async () => {
        if (selectedAccount) {
            await handleDelete(selectedAccount);
            setModalVisible(false);
        }
    };
    const handleDelete = async (account_no) => {
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
            Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error',
                text2: 'Something went wrong',
                visibilityTime: 3000
            });
        }
    };
    const handleNavigation = (item) => {
        navigation.navigate('UploadDocument', { user_id: userData._id, mobile: userData.mobile, bank_id: item._id })
    }

    const renderItem = ({ item }) => {
        return (
            <View style={styles.container}>
                <TouchableOpacity style={styles.statusContainer}
                    onPress={() => handleNavigation(item)}
                    disabled={item.status === "approved"}
                >
                    <Text
                        style={[styles.status, { color: item.status === "approved" ? "green" : "#EFC328" }]}>
                         {item.status}
                    </Text>
                </TouchableOpacity>

                <View style={[styles.logoContainer,{ flex: 0.5}]}>
                    <Icon name="bank" size={30} color="#361911" />
                </View>

                <View style={styles.detailsContainer}>
                    <Text style={styles.bankName}>{item.bank_name}</Text>
                    <Text style={styles.detail}>Account No: {item.account_no}</Text>
                    <Text style={styles.detail}>IFSC Code: {item.ifsc_code}</Text>
                </View>

                <TouchableOpacity style={[styles.deleteButton,{ flex: 0.7}]} onPress={() => confirmDelete(item.account_no)}>
                    <Icon name="trash" size={30} color="#D80000" />
                </TouchableOpacity>
            </View>
        );
    }


    return (
        <>
            <BackgroundScreen />
            <CommonHeader title={"Bank Account"} />
            <Text style={styles.kyc}>Complete Your Bank Details  </Text>xx
            <View style={{ padding: 10, margin: 10, alignItems: 'flex-end' }}>
                <TouchableOpacity
                    style={{
                        backgroundColor: '#2A1610',
                        paddingVertical: 12,
                        paddingHorizontal: 100,
                        borderRadius: 10,
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'row',
                        borderWidth: 2,
                        borderColor: '#efc328',
                        shadowColor: '#F5D236',
                        shadowOpacity: 1,
                        shadowRadius: 12,
                        elevation: 15,
                    }}
                    onPress={() =>
                        setVisible(true)
                    }
                >
                    <Icon name="plus" size={15} color="#361911" />
                    <Text style={{ color: "#efc328", fontSize: 16, fontFamily: 'Montserrat-SemiBold', marginHorizontal: 5 }}>Add Bank Details</Text>
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
            <AlertDialogRed visible={isModalVisible} onClose={() => setModalVisible(false)} message={message} onOkPress={handleConfirmDelete} />
            <FormModal visible={visibles} onClose={() => setVisible(false)} userData={userData} setVisible={setVisible} setModalVisible={setModalVisible} bankDetails={bankDetails} />
            <Toast ref={Toast.setRef} />
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
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: "rgba(255,255,255, 0.6)",
        borderRadius: 10,
        padding: 15,
        marginVertical: 8,
        marginHorizontal: 12,
        elevation: 5,
        borderWidth: 1.5,
        borderColor: 'white',
    },
    statusContainer: {
        position: 'absolute',
        top: 10,
        right: 10,

    },
      status: {
        fontSize: 15,
        fontFamily: 'Montserrat-SemiBold',
      },
    logoContainer: {
        alignItems: "center",
        justifyContent: 'center',
    },
    detailsContainer: {
        flex: 2,
        paddingHorizontal: 10,
    },
    bankName: {
        fontSize: 18,
        textAlign: "left",
        marginBottom: 5,
        fontFamily: 'Montserrat-Bold',
        color: '#361911'
    },
    detail: {
        fontSize: 14,
        textAlign: "left",
        color: "#361911",
        fontFamily: 'Montserrat-SemiBold'
    },
    deleteButton: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: 'center',
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
})




