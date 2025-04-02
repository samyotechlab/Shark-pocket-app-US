import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import TDSBreakupDialog from '../../Components/TDSBreakupDialog'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icons from 'react-native-vector-icons/MaterialIcons';
import Iconics from 'react-native-vector-icons/FontAwesome';
import AlertDialogRed from '../../Components/AlertDialogRed';
import { showTds, withdrawCash } from '../../Service/WithDraw';
import Toast from 'react-native-toast-message';
import Tds from '../../../assets/images/Screens/tds.png';
import Iconic from 'react-native-vector-icons/Ionicons';
import { bankAccountDetails } from '../../Service/Bank';
import { encryptData, generateKey } from '../../Utilities/utilies';
import { useNavigation } from '@react-navigation/native';

export default function Withdraw({ dataUser }) {
  const navigation = useNavigation();
  const [amount, setAmount] = useState('');
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false);
  const [bankDetail, setBankDetail] = useState([])
  const [tdsData, setTdsData] = useState({})
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedBank, setSelectedBank] = useState(bankDetail[0] || null);
  const [account, setAccount] = useState('')
  // console.log("dataUser",dataUser)
  const handleWithdraw = () => {
    if (parseFloat(amount) > dataUser.total_earning) {
      setVisible(true);
      setMessage(`Your wallet balance is ₹${dataUser.total_earning}. Please enter a valid amount.`)
    } else {
      handleCick();
    }
  };
  const bankDetails = async () => {
    try {
      setIsLoading(true);
      const response = await bankAccountDetails(dataUser._id);
      const filterData = response.data.filter((item) => item.status === "approved")
      console.log("filterData", filterData)
      setBankDetail(filterData)
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    bankDetails();
  }, [])
  const handleCick = async () => {
    try {
      setIsLoading(true);
      if (dataUser?.is_pan_verified !== 1) {
        setVisible(true);
        setMessage('Your PAN is not verified. Please verify your PAN to proceed.');
        setAccount('pan')
        return;
      } else {
        if (dataUser?.is_account_verified !== 1) {
          setVisible(true);
          setMessage('Your bank is not verified. Please verify your bank to proceed.');
          setAccount('bank')
          return;
        }
        else {
          if (amount) {
            if (amount >= bankDetail[0].minAmount) {
              toggleModal()
            } else {
              setVisible(true);
              setMessage('Minimun Withdrawl amount is 50 Rupees');
            }
          } else {
            setVisible(true);
            setMessage('please enter amount');
          }
        }
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleWithdrawRequest = async () => {
    setModalVisible(!isModalVisible);
    const mobileNumber = dataUser?.mobile;
    const username = dataUser?.name;
    const aadharNumber = dataUser?.aadhaar;
    const userId = dataUser?._id
    const key = await generateKey(mobileNumber, username, aadharNumber, userId);
    const data = {
      amount: amount,
      user_id: dataUser?._id,
      name:dataUser?.name,
      ifsc: selectedBank.ifsc_code,
      account_number: selectedBank.account_no,
      contact_id:dataUser?.razorpay_contact_id
    }
    const encryptedData =await encryptData(key, data);
    try {
      const response = await withdrawCash(dataUser._id, encryptedData);
      console.log("response")
      if(response.status === 0){
        Toast.show({
          type: 'error',
          position: 'top',
          text1: 'Withdraw Request',
          text2: response.message,
          visibilityTime: 3000
        })
      }else{
        setModalVisible(!isModalVisible);
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Withdraw Request',
          text2: 'Withdraw Request generate successfully',
          visibilityTime: 3000
        })
      }
     
    } catch (error) {
      console.log("error", error)
    }
  }


  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = async () => {
    try {
      const response = await showTds(dataUser._id, amount);
      console.log("responseof showtds", response)
      if (response.status == 1) {
        setModalVisible(!isModalVisible);
        setTdsData(response.data)
      } else {
        setVisible(true)
        setMessage('withdraw request is required.')
      }
    } catch (error) {
      console.log("error", error)
    }

  };
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNavigation = () => {
    if (account === "pan") {
      setVisible(false)
      navigation.navigate('PanVerification', { user_id: dataUser._id, mobile: dataUser.mobile })
    } else if (account === "bank") {
      setVisible(false)
      navigation.navigate('BankAccount', { user_id: dataUser._id, mobile: dataUser.mobile })
    } else {
      setVisible(false)
    }
  }

  return (
    <>
      <AlertDialogRed visible={visible} onClose={() => setVisible(false)} message={message} onOkPress={() => handleNavigation()} />
      <View style={{ flex: 1, backgroundColor: '#F3F3F3', marginTop: hp('2%') }}>
        <View style={{ flex: 1, backgroundColor: 'white' }}>
          <LinearGradient
            colors={["#3d1911", "#6a1701"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.button}
          >
            <Icons name="account-balance-wallet" size={24} color={'white'} />
            <Text style={styles.text}>Withdraw wallet Balance</Text>
            <Text style={styles.amount}>₹ {dataUser.total_earning}</Text>
          </LinearGradient>
          <View style={{ marginTop: hp('1%') }}>
            <Text style={styles.title}>Withdraw Balance</Text>
          </View>

          {/* Input Section */}
          <View style={styles.container}>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Enter Amount</Text>
              <TextInput
                style={styles.input}
                value={amount}
                onChangeText={setAmount}
                placeholderTextColor="#aaa"
                placeholderStyle={{ alignSelf: 'center' }}
                keyboardType="numeric"
              />
            </View>
          </View>

          <View style={{ flex: 0.8, justifyContent: 'center' }}>
            <Text style={styles.infoText}>
              {tdsData.tds_tax === undefined || tdsData.tds_tax === null
                ? `No Govt. Tax on this withdrawal ${''} `
                : tdsData.tds_tax === 0
                  ? `No Govt. Tax on this withdrawal ${''} `
                  : `${parseFloat(tdsData.tds_tax).toFixed(2)} Tax on this withdrawal `}
              <TouchableOpacity onPress={toggleModal} style={{ marginBottom: hp('1.3%') }}>
                <Text style={styles.learnMore}>Learn More</Text>
              </TouchableOpacity>
            </Text>
          </View>
          <View style={styles.bankDetails}>
            <Text style={styles.bankDetailsLabel}>Send Winnings to</Text>

            <View style={styles.bankInfo}>
              <Iconics name={'bank'} size={hp('3.5%')} />

              <View style={styles.dropdownContainer}>
                {dataUser?.is_account_verified == 1 ? (
                  <>
                    <TouchableOpacity style={styles.dropdownHeader} onPress={toggleDropdown}>
                      <View>
                        <Text style={styles.bankName}>{selectedBank?.bank_name || bankDetail[0]?.bank_name}</Text>
                        <Text style={styles.bankAccount}>{selectedBank?.account_no || bankDetail[0]?.account_no}</Text>
                      </View>
                      <Iconics name={isDropdownOpen ? 'chevron-up' : 'chevron-down'} size={hp('2.5%')} />
                    </TouchableOpacity>

                    {isDropdownOpen && (
                      <FlatList
                        data={bankDetail}
                        keyExtractor={(item, index) => index.toString()}
                        style={styles.dropdownList}
                        renderItem={({ item }) => (
                          <TouchableOpacity
                            style={styles.dropdownItem}
                            onPress={() => {
                              console.log("item",item)
                              setSelectedBank(item);
                              setIsDropdownOpen(false);
                            }}
                          >
                            <Text style={styles.bankName}>{item.bank_name}</Text>
                            <Text style={styles.bankAccount}>{item.account_no}</Text>
                          </TouchableOpacity>
                        )}
                      />
                    )}
                  </>
                ) : (
                  <Text style={styles.bankAccount}>Bank Details Not Found</Text>
                )}
              </View>
            </View>
          </View>
          <TouchableOpacity
            style={[
              styles.withdrawButton,
              { opacity: amount && !isLoading ? 1 : 0.5 },
            ]}
            onPress={handleWithdraw}
            disabled={!amount || isLoading}
          >
            <Text style={styles.withdrawButtonText}>
              {isLoading ? 'PROCESSING...' : 'WITHDRAW CASH'}
            </Text>
          </TouchableOpacity>

        </View>

        <View style={{ flex: 0.5, backgroundColor: 'white', marginTop: hp('1%') }}>


          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={Tds}
                style={styles.icon}
              />
            </View>
            <Text style={styles.buttonText}>Download TDS Certificate</Text>
            <View style={styles.arrowContainer}>
              <Iconic name="chevron-forward-outline" size={hp('2%')} color={'black'} />
            </View>
          </TouchableOpacity>
          <View style={styles.featuresRow}>
            <View style={styles.feature}>
              <Image
                source={{ uri: "https://img.icons8.com/color/48/security-checked.png" }}
                style={styles.featureIcon}
              />
              <Text style={styles.featureText}> 100% Safe {"\n"} Payments</Text>
            </View>
            <View style={styles.feature}>
              <Image
                source={{ uri: "https://img.icons8.com/color/48/flash-on.png" }}
                style={styles.featureIcon}
                tintColor='#4FBF03'
              />
              <Text style={styles.featureText}>Instant Deposit {"\n"}And Withdrawal</Text>
            </View>
            <View style={styles.feature}>
              <Image
                source={{ uri: "https://img.icons8.com/color/48/group.png" }}
                style={styles.featureIcon}
                tintColor='#4FBF03'
              />
              <Text style={styles.featureText}>Trusted by {"\n"}15cr+ Players</Text>
            </View>
          </View>
        </View>

      </View>
      {isModalVisible && (
        <TDSBreakupDialog
          isVisible={isModalVisible}
          onClose={toggleModal}
          setTdsData={setTdsData}
          tdsData={tdsData}
          handleWithdrawRequest={handleWithdrawRequest}
        />
      )}
      <Toast ref={Toast.setRef} />
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#DDF1E6',
    width: wp('90%'),
    borderBottomColor: 'black',
    borderWidth: wp('0.2%'),
    borderRadius: wp('3%'),
    paddingBottom: hp('0.7%'),
  },
  label: {
    position: 'absolute',
    top: -hp('1%'),
    left: wp('35%'),
    backgroundColor: '#fff',
    paddingHorizontal: wp('2%'),
    fontSize: hp('1.5%'),
    color: '#555',
    zIndex: 1,
  },
  featureIcon: {
    width: wp('8%'),
    height: hp('4%'),
    marginBottom: hp('1%'),
  },
  input: {
    borderWidth: wp('0.2%'),
    borderColor: '#ddd',
    borderRadius: wp('3%'),
    fontSize: hp('2%'),
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: hp('2%'),
  },
  headerTitle: {
    fontSize: hp('2.2%'),
    fontWeight: 'bold',
    marginBottom: hp('1%'),
    color: '#000',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4C2C2B',
    paddingVertical: hp('2%'),
    marginVertical: hp('2%'),
    paddingHorizontal: wp('5%'),
    borderRadius: wp('5%'),
    width: wp('90%'),
    marginLeft: wp('5%'),
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.5%') },
    shadowOpacity: 0.2,
    shadowRadius: wp('1%'),
  },
  icon: {
    fontSize: hp('2%'),
    color: '#fff',
    marginRight: wp('2%'),
  },
  text: {
    flex: 1,
    color: '#fff',
    fontSize: hp('2%'),
    fontFamily: 'Montserrat-Medium',
    paddingHorizontal: wp('2%'),
  },
  amount: {
    color: '#fff',
    fontSize: hp('2.2%'),
    fontFamily: 'Montserrat-SemiBold',
  },
  title: {
    fontSize: hp('1.9%'),
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    marginBottom: hp('2%'),
    textAlign: 'center',
  },
  inputWrapper: {
    width: wp('90%'),
    position: 'relative',
    alignItems: 'center',
  },
  outerInputContainer: {
    flex: 1,
    alignItems: 'center',
  },
  infoText: {
    fontSize: hp('1.5%'),
    color: '#000000',
    textAlign: 'center',
    fontFamily: 'Montserrat-Regular',
    // backgroundColor: 'red',
    paddingLeft: wp('5%')

  },
  learnMore: {
    fontSize: hp('1.5%'),
    color: '#000000',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Medium',
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
    shadowOpacity: 2,
    shadowRadius: wp('3%'),
    elevation: 10,
    width: wp('85%'),
    marginLeft: wp('8%'),
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
  bankDetails: {
    padding: hp('2%'),
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    margin: hp('1%'),
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  dropdownContainer: {
    flex: 1,
    marginLeft: hp('2%'),
  },
  dropdownHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: hp('1%'),
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 8,
    backgroundColor: 'white',
  },
  dropdownList: {
    maxHeight: hp('20%'),
    backgroundColor: '#fff',
    // borderWidth: 1,
    // borderColor: '#ccc',
    borderRadius: 8,
    marginTop: hp('1%'),
  },
  dropdownItem: {
    padding: hp('1%'),
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bankDetailsLabel: {
    fontSize: hp('2%'),
    marginBottom: hp('1%'),
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  bankIcon: {
    width: wp('10%'),
    height: hp('5%'),
    marginRight: wp('3%'),
  },
  bankName: {
    fontSize: hp('1.8%'),
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
  bankAccount: {
    fontSize: hp('1.6%'),
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: hp('1.5%'),
    color: '#607D8B',
    marginBottom: hp('1%'),
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp('6%'),
  },
  feature: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: wp('3%'),
    textAlign: 'center',
    color: '#000000',
    fontFamily: 'Montserrat-Regular',
    lineHeight: wp('5%'),
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#00000033',
    borderWidth: wp('0.5%'),
    borderRadius: wp('4%'),
    paddingVertical: hp('1.5%'),
    paddingHorizontal: wp('4%'),
    marginHorizontal: wp('4%'),
  },
  iconContainer: {
    marginRight: wp('3%'),
  },
  arrowContainer: {
    marginLeft: wp('2%'),
  },
  arrow: {
    fontSize: hp('2%'),
    color: '#333333',
  },
  buttonText: {
    flex: 1,
    fontSize: hp('1.8%'),
    fontFamily: "Montserrat-Medium",
    color: '#696969',
  },
});




