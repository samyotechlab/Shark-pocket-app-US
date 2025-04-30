// import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import LinearGradient from 'react-native-linear-gradient'
// import TDSBreakupDialog from '../../Components/TDSBreakupDialog'
// import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
// import Icons from 'react-native-vector-icons/MaterialIcons';
// import Iconics from 'react-native-vector-icons/FontAwesome';
// import AlertDialogRed from '../../Components/AlertDialogRed';
// import { approvedRequest, showTds, withdrawCash } from '../../Service/WithDraw';
// import Toast from 'react-native-toast-message';
// import Tds from '../../../assets/images/Screens/tds.png';
// import Iconic from 'react-native-vector-icons/Ionicons';
// import { bankAccountDetails } from '../../Service/Bank';
// import { encryptData, generateKey } from '../../Utilities/utilies';
// import { useNavigation } from '@react-navigation/native';
// import { Checkbox } from 'react-native-paper';
// import FeaturesSection from '../../Components/FeaturesSection';

// export default function Withdraw({ dataUser }) {
//   const navigation = useNavigation();
//   const [amount, setAmount] = useState('');
//   const [visible, setVisible] = useState(false)
//   const [message, setMessage] = useState('')
//   const [isLoading, setIsLoading] = useState(false);
//   const [bankDetail, setBankDetail] = useState([])
//   const [tdsData, setTdsData] = useState({})
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [selectedBank, setSelectedBank] = useState(bankDetail[0] || null);
//   const [account, setAccount] = useState('')  // console.log("dataUser",dataUser)
//   const handleWithdraw = () => {
//     if (parseFloat(amount) > dataUser.total_earning) {
//       setVisible(true);
//       setMessage(`Your wallet balance is ₹${dataUser.total_earning}. Please enter a valid amount.`)
//     } else {
//       handleCick();
//     }
//   };
//   const bankDetails = async () => {
//     try {
//       setIsLoading(true);
//       const response = await bankAccountDetails(dataUser._id);
//       const filterData = response.data.filter((item) => item.status === "approved")
//       console.log("filterData", filterData)
//       setBankDetail(filterData)
//     } catch (error) {
//       console.log('error', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };
//   useEffect(() => {
//     bankDetails();
//   }, [])
//   const handleCick = async () => {
//     try {
//       setIsLoading(true);
//       if (dataUser?.is_pan_verified !== 1) {
//         setVisible(true);
//         setMessage('Your PAN is not verified. Please verify your PAN to proceed.');
//         setAccount('pan')
//         return;
//       } else {
//         if (dataUser?.is_account_verified !== 1) {
//           setVisible(true);
//           setMessage('Your bank is not verified. Please verify your bank to proceed.');
//           setAccount('bank')
//           return;
//         }
//         else {
//           if (amount) {
//             if (amount >= bankDetail[0].minAmount) {
//               toggleModal()
//             } else {
//               setVisible(true);
//               setMessage('Minimun Withdrawl amount is 50 Rupees');
//             }
//           } else {
//             setVisible(true);
//             setMessage('please enter amount');
//           }
//         }
//       }
//     } catch (error) {
//       console.log('error', error);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleWithdrawRequest = async () => {
//     setModalVisible(!isModalVisible);
//     const mobileNumber = dataUser?.mobile;
//     const username = dataUser?.name;
//     const aadharNumber = dataUser?.aadhaar;
//     const userId = dataUser?._id
//     const key = await generateKey(mobileNumber, username, aadharNumber, userId);
//     const data = {
//       amount: amount,
//       pay_amount: tdsData.current_withdraw,
//       user_id: dataUser?._id,
//       name: dataUser?.name,
//       ifsc: selectedBank.ifsc_code,
//       account_number: selectedBank.account_no,
//       contact_id: dataUser?.razorpay_contact_id
//     }
//     const encryptedData = await encryptData(key, data);
//     try {
//       const response = await withdrawCash(dataUser._id, encryptedData);
//       console.log("response", response.data)
//       if (response.status === 0) {
//         Toast.show({
//           type: 'error',
//           position: 'top',
//           text1: 'Withdraw Request',
//           text2: response.message,
//           visibilityTime: 3000
//         })
//       } else {
//         console.log("response.data", response.data)
//         setModalVisible(!isModalVisible);
//         handleApproveRequest(response.data);
//       }

//     } catch (error) {
//       console.log("error", error)
//     }
//   }

//   const handleApproveRequest = async (requestId) => {
//     console.log("requestId", requestId)
//     setModalVisible(!isModalVisible);
//     console.log(" dataUser?.name", dataUser?.name)
//     console.log(" dataUser?.mobile", dataUser?.mobile)
//     const mobileNumber = dataUser?.mobile;
//     const username = dataUser?.name;
//     const aadharNumber = dataUser?.aadhaar;
//     const userId = dataUser?._id
//     const key = await generateKey(mobileNumber, username, aadharNumber, userId);
//     const data = {
//       _id: requestId,
//       amount: amount,
//       pay_amount: tdsData.current_withdraw,
//       user_id: dataUser?._id,
//       name: dataUser?.name,
//       ifsc: selectedBank.ifsc_code,
//       account_number: selectedBank.account_no,
//       mobileNumber : dataUser?.mobile,
//     }
//     console.log("data", data)
//     const encryptedData = await encryptData(key, data);
//     console.log("encryptedData", encryptedData)
//      try {
//       const response = await approvedRequest(dataUser._id,encryptedData);

//       console.log("response", response)
//       if (response.status === 1) {
//         Toast.show({
//           type: 'success',
//           position: 'top',
//           text1: 'Withdraw Request amount credited successfully to your bank account',
//           text2: response.message,
//           visibilityTime: 3000
//         })
//         setAmount('');
//       } else {
//         setModalVisible(!isModalVisible);
//         Toast.show({
//           type: 'error',
//           position: 'top',
//           text1: 'approved Request failed',
//           text2: response.message,
//           visibilityTime: 3000
//         })
//       } 
//      } catch (error) {
//       console.log("error", error)
//      }
//   }

 

//   const [isModalVisible, setModalVisible] = useState(false);
//   const toggleModal = async () => {
//     try {
//       const response = await showTds(dataUser._id, amount);
//       console.log("responseof showtds", response)
//       if (response.status == 1) {
//         setModalVisible(!isModalVisible);
//         setTdsData(response.data)
//       } else {
//         setVisible(true)
//         setMessage('withdraw request is required.')
//       }
//     } catch (error) {
//       console.log("error", error)
//     }

//   };
//   const toggleDropdown = () => {
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   const handleNavigation = () => {
//     if (account === "pan") {
//       setVisible(false)
//       navigation.navigate('PanVerification', { user_id: dataUser._id, mobile: dataUser.mobile })
//     } else if (account === "bank") {
//       setVisible(false)
//       navigation.navigate('BankAccount', { user_id: dataUser._id, mobile: dataUser.mobile })
//     } else {
//       setVisible(false)
//     }
//   }

//   const handleBankSelection = (item) => {
//     setSelectedBank(item);
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   useEffect(() => {
//     if (bankDetail.length === 1) {
//       handleBankSelection(bankDetail[0]);
//     }
//   }, [bankDetail]);

//   return (
//     <>
//       <AlertDialogRed visible={visible} onClose={() => setVisible(false)} message={message} onOkPress={() => handleNavigation()} />
//       <View style={{ flex: 1, backgroundColor: '#F3F3F3', marginTop: hp('2%') }}>
//         <View style={{ flex: 1, backgroundColor: 'white' }}>
//           <View style={{ flex: 0.3 }}>
//             <LinearGradient
//               colors={["#3d1911", "#6a1701"]}
//               start={{ x: 0, y: 0 }}
//               end={{ x: 1, y: 0 }}
//               style={styles.button}
//             >
//               <Icons name="account-balance-wallet" size={24} color={'white'} />
//               <Text style={styles.text}>Withdraw wallet Balance</Text>
//               <Text style={styles.amount}>₹{dataUser.total_earning}</Text>
//             </LinearGradient>
//           </View>
//           {/* Input Section */}
//           <View style={styles.container}>
//             <Text style={styles.title}>Withdraw Balance</Text>
//             <View style={styles.inputContainer}>
//               <Text style={styles.label}>Enter Amount</Text>
//               <TextInput
//                 style={styles.input}
//                 value={amount}
//                 onChangeText={setAmount}
//                 placeholderTextColor="#aaa"
//                 placeholderStyle={{ alignSelf: 'center' }}
//                 keyboardType="numeric"
//               />
//             </View>
//             <Text style={styles.infoText}>
//               {tdsData.tds_tax === undefined || tdsData.tds_tax === null
//                 ? `No Govt. Tax on this withdrawal ${''} `
//                 : tdsData.tds_tax === 0
//                   ? `No Govt. Tax on this withdrawal ${''} `
//                   : `${parseFloat(tdsData.tds_tax).toFixed(2)} Tax on this withdrawal `}
//               <TouchableOpacity onPress={toggleModal} style={{ marginBottom: hp('1.3%') }}>
//                 <Text style={styles.learnMore}>Learn More</Text>
//               </TouchableOpacity>
//             </Text>
//           </View>
//           <View style={{ flex: 0.8 }}>
//             <View style={styles.bankDetails}>
//               <View style={{ flex: 0.5 }}>
//                 <Text style={styles.bankDetailsLabel}>Send Winnings to</Text>
//                 {!selectedBank ? <Text style={[styles.bankDetailsLabel, { color: 'red', fontSize: 12, lineHeight: hp('1.5%') }]}>please select bank</Text> : null}
//               </View>
//               <View style={styles.bankInfo}>
//                 <Iconics name={'bank'} size={hp('3.5%')} />
//                 <View style={styles.dropdownContainer}>
//                   {dataUser?.is_account_verified == 1 ? (
//                     <>
//                       <TouchableOpacity
//                         style={styles.dropdownHeader}
//                         onPress={() => {
//                           if (bankDetail.length === 1) {
//                             console.log("bankDetail[0]", bankDetail[0])
//                             handleBankSelection(bankDetail[0]);
//                           } else {
//                             toggleDropdown();
//                           }
//                         }}
//                       >
//                         <View>
//                           <Text style={styles.bankName}>{selectedBank?.bank_name || bankDetail[0]?.bank_name}</Text>
//                           <Text style={styles.bankAccount}>{selectedBank?.account_no || bankDetail[0]?.account_no}</Text>
//                         </View>
//                         {bankDetail.length > 1 && (
//                           <Iconics name={isDropdownOpen ? 'chevron-up' : 'chevron-down'} size={hp('2.5%')} />
//                         )}
//                       </TouchableOpacity>

//                       {isDropdownOpen && bankDetail.length > 1 && (
//                         <View style={styles.dropdownList}>
//                           <FlatList
//                             data={bankDetail}
//                             keyExtractor={(item, index) => index.toString()}
//                             showsVerticalScrollIndicator={true}
//                             renderItem={({ item }) => (
//                               <TouchableOpacity
//                                 style={styles.dropdownItem}
//                                 onPress={() => handleBankSelection(item)}
//                                 activeOpacity={0.7}
//                               >
//                                 <View style={styles.bankRow}>
//                                   <Checkbox
//                                     status={selectedBank?.account_no === item.account_no ? 'checked' : 'unchecked'}
//                                     onPress={() => handleBankSelection(item)}
//                                     color="red"
//                                   />
//                                   <View style={styles.bankDetailsContainer}>
//                                     <Text style={styles.bankName}>{item.bank_name}</Text>
//                                     <Text style={styles.bankAccount}>{item.account_no}</Text>
//                                   </View>
//                                 </View>
//                               </TouchableOpacity>
//                             )}
//                           />
//                         </View>

//                       )}
//                     </>
//                   ) : (
//                     <Text style={styles.bankAccount}>Bank Details Not Found</Text>
//                   )}
//                 </View>
//               </View>
//             </View>
//           </View>

//           <View style={{ flex: 0.3 }}>
//             {
//               bankDetail.length === 0 ? (
//                 <TouchableOpacity
//                 style={[
//                   styles.withdrawButton,
//                   { opacity: amount ? 1 : 0.5 },
//                 ]}
//                 onPress={handleWithdraw}
//                 disabled={!amount}
//               >
//                 <Text style={styles.withdrawButtonText}>
//                   {isLoading ? 'PROCESSING...' : 'WITHDRAW CASH'}
//                 </Text>
//               </TouchableOpacity>
//               ):(
//                 <TouchableOpacity
//               style={[
//                 styles.withdrawButton,
//                 { opacity: amount && selectedBank && !isLoading ? 1 : 0.5 },
//               ]}
//               onPress={handleWithdraw}
//               disabled={!amount || !selectedBank || isLoading}
//             >
//               <Text style={styles.withdrawButtonText}>
//                 {isLoading ? 'PROCESSING...' : 'WITHDRAW CASH'}
//               </Text>
//             </TouchableOpacity>
//               )
//             }
            
//           </View>
//         </View>

//         {/* <View style={{ flex: 0.7, backgroundColor: 'white', marginTop: hp('1%') }}>
//           <TouchableOpacity style={styles.buttonContainer}>
//             <View style={styles.iconContainer}>
//               <Image
//                 source={Tds}
//                 style={styles.icon}
//               />
//             </View>
//             <Text style={styles.buttonText}>Download TDS Certificate</Text>
//             <View style={styles.arrowContainer}>
//               <Iconic name="chevron-forward-outline" size={hp('2%')} color={'black'} />
//             </View>
//           </TouchableOpacity>

//           <View style={styles.featuresRow}>
//             <View style={styles.feature}>
//               <Image
//                 source={{ uri: "https://img.icons8.com/color/48/security-checked.png" }}
//                 style={styles.featureIcon}
//               />
//               <Text style={styles.featureText}> 100% Safe {"\n"} Payments</Text>
//             </View>
//             <View style={styles.feature}>
//               <Image
//                 source={{ uri: "https://img.icons8.com/color/48/flash-on.png" }}
//                 style={styles.featureIcon}
//                 tintColor='#4FBF03'
//               />
//               <Text style={styles.featureText}>Instant Deposit {"\n"}And Withdrawal</Text>
//             </View>
//             <View style={styles.feature}>
//               <Image
//                 source={{ uri: "https://img.icons8.com/color/48/group.png" }}
//                 style={styles.featureIcon}
//                 tintColor='#4FBF03'
//               />
//               <Text style={styles.featureText}>Trusted by {"\n"}15cr+ Players</Text>
//             </View>
//           </View>
//         </View> */}
//         <FeaturesSection/>
//       </View>
     
//       {isModalVisible && (
//         <TDSBreakupDialog
//           isVisible={isModalVisible}
//           onClose={toggleModal}
//           setTdsData={setTdsData}
//           tdsData={tdsData}
//           handleWithdrawRequest={handleWithdrawRequest}
//         />
//       )}
//       <Toast ref={Toast.setRef} />
//     </>
//   )
// }
// const styles = StyleSheet.create({
//   container: {
//     alignItems: 'center',
//     flex: 0.5,
//   },
//   inputContainer: {
//     backgroundColor: '#DDF1E6',
//     width: wp('90%'),
//     borderBottomColor: 'black',
//     borderWidth: wp('0.2%'),
//     borderRadius: wp('3%'),
//     paddingBottom: hp('0.5%'),
//   },
//   label: {
//     position: 'absolute',
//     top: -hp('1.5%'),
//     left: wp('35%'),
//     backgroundColor: '#fff',
//     fontSize: hp('1.5%'),
//     color: '#555',
//     zIndex: 1,
//   },
//   featureIcon: {
//     width: wp('8%'),
//     height: hp('4%'),
//     marginBottom: hp('1%'),
//   },
//   input: {
//     borderWidth: wp('0.2%'),
//     borderColor: '#ddd',
//     borderRadius: wp('3%'),
//     fontSize: hp('2%'),
//     backgroundColor: '#fff',
//   },
//   header: {
//     marginBottom: hp('2%'),
//   },
//   headerTitle: {
//     fontSize: hp('2.2%'),
//     fontWeight: 'bold',
//     marginBottom: hp('1%'),
//     color: '#000',
//   },
//   button: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: '#4C2C2B',
//     paddingVertical: hp('1.5%'),
//     marginVertical: hp('1%'),
//     paddingHorizontal: wp('5%'),
//     borderRadius: wp('5%'),
//     width: wp('90%'),
//     marginLeft: wp('5%'),

//   },
//   icon: {
//     fontSize: hp('2%'),
//     color: '#fff',
//     marginRight: wp('2%'),
//   },
//   text: {
//     flex: 1,
//     color: '#fff',
//     fontSize: hp('2%'),
//     fontFamily: 'Montserrat-Medium',
//     paddingHorizontal: wp('2%'),
//   },
//   amount: {
//     color: '#fff',
//     fontSize: hp('2.2%'),
//     fontFamily: 'Montserrat-SemiBold',
//   },
//   title: {
//     fontSize: hp('1.9%'),
//     fontFamily: 'Montserrat-Medium',
//     color: '#000000',
//     marginBottom: hp('1%'),
//     textAlign: 'center',
//   },
//   inputWrapper: {
//     width: wp('90%'),
//     position: 'relative',
//     alignItems: 'center',
//   },
//   outerInputContainer: {
//     flex: 1,
//     alignItems: 'center',
//   },
//   infoText: {
//     fontSize: hp('1.5%'),
//     color: '#000000',
//     textAlign: 'center',
//     fontFamily: 'Montserrat-Regular',
//     paddingLeft: wp('5%'),
//     marginTop: hp('0.5%'),
//   },
//   learnMore: {
//     fontSize: hp('1.5%'),
//     color: '#000000',
//     textDecorationLine: 'underline',
//     fontFamily: 'Montserrat-Medium',
//   },
//   withdrawButton: {
//     backgroundColor: '#4FBF03',
//     borderRadius: wp('4%'),
//     paddingVertical: hp('1%'),
//     paddingHorizontal: wp('4%'),
//     alignItems: 'center',
//     borderColor: '#FFFFFF',
//     borderWidth: wp('0.5%'),
//     shadowColor: '#4FBF03',
//     shadowOffset: { width: 0, height: hp('1%') },
//     shadowOpacity: 2,
//     shadowRadius: wp('3%'),
//     elevation: 10,
//     width: wp('85%'),
//     marginLeft: wp('8%'),
//     zIndex: 1,
//     position: 'relative'
//   },
//   withdrawButtonText: {
//     fontSize: hp('2.5%'),
//     fontFamily: 'Inter_18pt-Bold',
//     color: '#FFFFFF',
//     letterSpacing: wp('0.5%'),
//     textShadowColor: '#F88600',
//     textShadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
//     textShadowRadius: wp('2%'),
//   },
//   bankDetails: {
//     flex: 1,
//     padding: hp('1.5%'),
//     backgroundColor: '#fff',
//     borderRadius: 10,
//     elevation: 5,
//     position: "relative",
//     zIndex: 9999999,
//     margin: hp('1%'),
//   },
//   bankInfo: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'center',
//     overflow: 'visible',
//     alignItems: 'center',
//     zIndex: 1,
//   },
//   dropdownContainer: {
//     flex: 1,
//     marginLeft: hp('2%'),
//     position: 'relative',
//     zIndex: 10,
//   },
//   dropdownHeader: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     padding: hp('1%'),
//     borderRadius: 8,
//   },
//   dropdownList: {
//     position: 'absolute',
//     top: hp('6%'), // or dynamically set using measureInWindow if needed
//     left: 0,
//     right: 0,
//     backgroundColor: 'white',
//     borderRadius: 8,
//     zIndex: 999,
//     elevation: 5,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.2,
//     shadowRadius: 4,
//   },
//   dropdownItem: {
//     padding: hp('1%'),
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     zIndex: 9999,
//     position: 'relative',
//   },
//   bankDetailsLabel: {
//     fontSize: hp('2%'),
//     color: '#000000',
//     fontFamily: 'Montserrat-Medium',
//     lineHeight: hp('3%'),
//   },
//   bankIcon: {
//     width: wp('10%'),
//     height: hp('5%'),
//     marginRight: wp('3%'),
//   },
//   bankName: {
//     fontSize: hp('1.8%'),
//     fontFamily: 'Montserrat-Medium',
//     color: '#000000',
//   },
//   bankAccount: {
//     fontSize: hp('1.6%'),
//     color: '#000000',
//     fontFamily: 'Montserrat-Medium',
//   },
//   footer: {
//     alignItems: 'center',
//   },
//   footerText: {
//     fontSize: hp('1.5%'),
//     color: '#607D8B',
//     marginBottom: hp('1%'),
//   },
//   featuresRow: {
//     // marginTop: hp('6%'),
//     margin: hp('2%'),
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   feature: {
//     alignItems: 'center',
//   },
//   featureText: {
//     fontSize: wp('3%'),
//     textAlign: 'center',
//     color: '#000000',
//     fontFamily: 'Montserrat-Regular',
//     lineHeight: wp('5%'),
//   },
//   buttonContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     backgroundColor: '#FFFFFF',
//     borderColor: '#00000033',
//     borderWidth: wp('0.5%'),
//     borderRadius: wp('4%'),
//     paddingVertical: hp('1.5%'),
//     paddingHorizontal: wp('4%'),
//     marginHorizontal: wp('4%'),
//     marginVertical: hp('5%'),
//   },
//   iconContainer: {
//     marginRight: wp('3%'),
//   },
//   arrowContainer: {
//     marginLeft: wp('2%'),
//   },
//   arrow: {
//     fontSize: hp('2%'),
//     color: '#333333',
//   },
//   buttonText: {
//     flex: 1,
//     fontSize: hp('1.8%'),
//     fontFamily: "Montserrat-Medium",
//     color: '#696969',
//   },
//   bankRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '100%',
//   },
//   bankDetailsContainer: {
//     marginLeft: 10,
//   },
// });245


import React, { useEffect, useState } from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { useNavigation } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import WalletBalance from '../../Components/WalletBalance';
import WithdrawInput from '../../Components/WithdrawInput';
import BankSelection from '../../Components/BankSelection';
import FeaturesSection from '../../Components/FeaturesSection';
import AlertDialogRed from '../../Components/AlertDialogRed';
import TDSBreakupDialog from '../../Components/TDSBreakupDialog';
import { showTds, withdrawCash, approvedRequest } from '../../Service/WithDraw';
import { bankAccountDetails } from '../../Service/Bank';
import { encryptData, generateKey } from '../../Utilities/utilies';

const Withdraw = ({ dataUser }) => {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [bankDetail, setBankDetail] = useState([]);
  const [tdsData, setTdsData] = useState({});
  const [selectedBank, setSelectedBank] = useState(null);
  const [account, setAccount] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchBankDetails = async () => {
      try {
        setIsLoading(true);
        const response = await bankAccountDetails(dataUser._id);
        const filterData = response.data.filter(item => item.status === 'approved');
        setBankDetail(filterData);
        if (filterData.length === 1) {
          setSelectedBank(filterData[0]);
        }
      } catch (error) {
        console.log('Bank details error:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchBankDetails();
  }, [dataUser._id]);

  const handleWithdraw = () => {
    if (parseFloat(amount) > dataUser.total_earning) {
      setVisible(true);
      setMessage(`Your wallet balance is ₹${dataUser.total_earning}. Please enter a valid amount.`);
    } else {
      validateWithdrawal();
    }
  };

  const validateWithdrawal = async () => {
    try {
      setIsLoading(true);
      if (dataUser.is_pan_verified !== 1) {
        setVisible(true);
        setMessage('Your PAN is not verified. Please verify your PAN to proceed.');
        setAccount('pan');
        return;
      }
      if (dataUser.is_account_verified !== 1) {
        setVisible(true);
        setMessage('Your bank is not verified. Please verify your bank to proceed.');
        setAccount('bank');
        return;
      }
      if (!amount) {
        setVisible(true);
        setMessage('Please enter an amount.');
        return;
      }
      if (selectedBank && parseFloat(amount) < selectedBank.minAmount) {
        setVisible(true);
        setMessage('Minimum withdrawal amount is 50 Rupees.');
        return;
      }
      await toggleTdsModal();
    } catch (error) {
      console.log('Validation error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTdsModal = async () => {
    try {
      const response = await showTds(dataUser._id, amount);
      console.log('TDS response:', response);
      if (response.status === 1) {
        setTdsData(response.data);
        setModalVisible(!isModalVisible);
      } else {
        console.log(response.message);
        setVisible(true);
        setMessage('Withdraw request is required.');
      }
    } catch (error) {
      console.log('TDS modal error:', error);
    }
  };

  const handleWithdrawRequest = async () => {
    try {
      const key = await generateKey(dataUser.mobile, dataUser.name, dataUser.aadhaar, dataUser._id);
      const data = {
        amount,
        pay_amount: parseFloat(tdsData.current_withdraw).toFixed(2),
        user_id: dataUser._id,
        name: dataUser.name,
        ifsc: selectedBank?.ifsc_code,
        account_number: selectedBank?.account_no,
        contact_id: dataUser.razorpay_contact_id,
      };
      const encryptedData = await encryptData(key, data);
      const response = await withdrawCash(dataUser._id, encryptedData);
      if (response.status === 0) {
        Toast.show({
          type: 'error',
          text1: 'Withdraw Request',
          text2: response.message,
          visibilityTime: 3000,
        });
      } else {
        setModalVisible(false);
        await handleApproveRequest(response.data);
      }
    } catch (error) {
      console.log('Withdraw request error:', error);
    }
  };

  const handleApproveRequest = async (requestId) => {
    try {
      const key = await generateKey(dataUser.mobile, dataUser.name, dataUser.aadhaar, dataUser._id);
      const data = {
        _id: requestId,
        amount,
        pay_amount: parseFloat(tdsData.current_withdraw).toFixed(2),
        user_id: dataUser._id,
        name: dataUser.name,
        ifsc: selectedBank?.ifsc_code,
        account_number: selectedBank?.account_no,
        mobileNumber: dataUser.mobile,
      };
      const encryptedData = await encryptData(key, data);
      const response = await approvedRequest(dataUser._id, encryptedData);
      if (response.status === 1) {
        Toast.show({
          type: 'success',
          text1: 'Withdraw Request',
          text2: 'Amount credited successfully to your bank account',
          visibilityTime: 3000,
        });
        setAmount('');
      } else {
        Toast.show({
          type: 'error',
          text1: 'Approval Failed',
          text2: response.message,
          visibilityTime: 3000,
        });
      }
    } catch (error) {
      console.log('Approve request error:', error);
    }
  };

  const handleNavigation = () => {
    setVisible(false);
    if (account === 'pan') {
      navigation.navigate('PanVerification', { user_id: dataUser._id, mobile: dataUser.mobile });
    } else if (account === 'bank') {
      navigation.navigate('BankAccount', { user_id: dataUser._id, mobile: dataUser.mobile });
    }
  };

  return (
    <>
    <AlertDialogRed
        visible={visible}
        onClose={() => setVisible(false)}
        message={message}
        onOkPress={handleNavigation}
      />
    <View style={styles.container}>
      <View style={styles.mainContent}>
        <WalletBalance balance={dataUser.total_earning} />
        <WithdrawInput
          amount={amount}
          setAmount={setAmount}
          tdsData={tdsData}
          onLearnMore={toggleTdsModal}
        />
        <BankSelection
          bankDetail={bankDetail}
          selectedBank={selectedBank}
          setSelectedBank={setSelectedBank}
          isAccountVerified={dataUser.is_account_verified}
        />
        <View style={styles.withdrawButtonContainer}>
          <TouchableOpacity
            style={[styles.withdrawButton, { opacity: amount && selectedBank && !isLoading ? 1 : 0.5 }]}
            onPress={handleWithdraw}
            disabled={!amount || !selectedBank || isLoading}
          >
            <Text style={styles.withdrawButtonText}>
              {isLoading ? 'PROCESSING...' : 'WITHDRAW CASH'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <FeaturesSection />
    </View>
    {isModalVisible && (
        <TDSBreakupDialog
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          tdsData={tdsData}
          handleWithdrawRequest={handleWithdrawRequest}
        />
      )}
      <Toast />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F3F3F3',
    marginTop: hp('2%'),
  },
  mainContent: {
    flex: 1,
    backgroundColor: 'white',
  },
  withdrawButtonContainer: {
    flex: 0.3,
    alignItems: 'center',
  },
  withdrawButton: {
    backgroundColor: '#4FBF03',
    borderRadius: wp('4%'),
    paddingVertical: hp('1%'),
    paddingHorizontal: wp('4%'),
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: wp('0.5%'),
    shadowColor: '#4FBF03',
    shadowOffset: { width: 0, height: hp('1%') },
    shadowOpacity: 0.2,
    shadowRadius: wp('3%'),
    elevation: 10,
    width: wp('85%'),
  },
  withdrawButtonText: {
    fontSize: hp('2.5%'),
    fontFamily: 'Inter_18pt-Bold',
    color: '#FFFFFF',
    letterSpacing: wp('0.5%'),
    textShadowColor: '#F88600',
    textShadowOffset: { width: wp('0.5%'), height: wp('0.5%') },
    textShadowRadius: wp('2%'),
  },
});

export default Withdraw;





