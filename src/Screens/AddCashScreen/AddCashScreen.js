import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Iconics from "react-native-vector-icons/Ionicons";
import { useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { bonusWallet, checkPaymentStatus, TransactionStore } from '../../Service/Transaction';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import AlertDialogRed from '../../Components/AlertDialogRed';
import LinearGradient from 'react-native-linear-gradient';
import PaymentStatusCard from '../../Components/PaymentStatusCard';
import { userDetail } from '../../Service/Login';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import AnimatedLoader from '../../Components/AnimatedLoader';
import { encryptData, generateKey } from '../../Utilities/utilies';
import { storeTicket } from '../../Service/Tickets';

const AddCashScreen = () => {
  const navigation = useNavigation();
  const route = useRoute()
  const { user_id, status, amounts,ticket_id,game_id} = route.params
  const [amount, setAmount] = useState(null);
  const [visible, setVisible] = useState(false);
  const [data1, setData] = useState({});
  const [message, setMessage] = useState('');
  const [dialog, setDialog] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [checksPaymentStatus, setCheckPaymentStatus] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState(null);
  const [usersData, setUserData] = useState();
  const [loader, setLoader] = useState();
  const [isPaymentSuccess, setIsPaymentSuccess] = useState("")
  const { loginData, isReady } = useLoginDataStorage();
  const [buttonText, setButtonText] = useState("")
  const [toast, setToast] = useState(false);

  const data = isReady && loginData && loginData?.data

  const currentDate = new Date();
  const formattedDate = currentDate.toLocaleString();

  useEffect(() => {
    if (status === 1 && amounts) {
      setAmount(amounts.toString());
    }
  }, [status, amounts]);

  const userData = async () => {
    setLoader(true);
    try {
      const response = await userDetail(data._id);
      const formattedData = {
        ...response.data,
        total_balance: parseFloat(response?.data?.total_balance).toFixed(2),
        bonus_wallet: parseFloat(response?.data?.bonus_wallet).toFixed(2),
      };
      setUserData(formattedData);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  };

  useFocusEffect(
    React.useCallback(() => {
      if (isReady && loginData) {
        userData();
      }
    }, [isReady])
  );

  const handleAddCash = async () => {
    if (amount) {
      const mobileNumber = usersData?.mobile;
      const username = usersData?.name;
      const aadharNumber = usersData?.aadhaar;
      const userId = usersData?._id
      const key = generateKey(mobileNumber, username, aadharNumber, userId);
      const encryptedData = encryptData(key, amount);
      try {
        const response = await TransactionStore(usersData?._id, encryptedData);
        console.log("response====>",response.status)
        if(response.status === 0){
          console.log("heloooooo")
          initPhonePeSDK(response);
          setData(response);
        }else{
          addBonusWallet(response)
          initPhonePeSDK(response);
          setData(response);
        }
      } catch (error) {
        console.log('error', error);
      }
    } else {
      setVisible(true);
      setMessage('Enter a amount')
    }
  };

  const addBonusWallet = async (res) => {
    try {
      const response = await bonusWallet(res);
    } catch (error) {
      console.log("error", error)
    }
  }

  const handlePurchase = async () => {
    try {
      setVisible(false);
      const response = await storeTicket(game_id, ticket_id, data._id);
      if (response.status === 1) {
        setToast(true)
      }
    } catch (error) {
      console.log('Purchase failed:', error);
    }
  };

  const initPhonePeSDK = response => {
    PhonePePaymentSDK.init(
      response.environment_type,
      response.merchant_id,
      '',
      true,
    )
      .then(result => {
        console.log("result======>",result)
        setMessage('Message: SDK Initialisation ->' + JSON.stringify(result));
        handleStartTransaction(
          response.base64,
          response.checksum,
          response.callBack_url,
          response?.transaction_id,
        );
      })
      .catch(error => {
        setMessage('error:' + error.message);
      });
  };


  const handleStartTransaction = (
    base64,
    checksum,
    callBack_url,
    transaction_id,
  ) => {
    PhonePePaymentSDK.startTransaction(
      base64,
      checksum,
      'com.sharkpocket',
      callBack_url,
    )
      .then(async res => {
        setCheckPaymentStatus(true)
        setMessage(JSON.stringify(res));
        setDialog(true);
        setisLoading(true);
        if (res.status) {
          const response = await checkPaymentStatus(transaction_id);
          setTimeout(() => {
            setCheckPaymentStatus(false)
          }, 3000)
          setisLoading(false);
          if (response?.data?.status == 1) {
            setIsPaymentSuccess("success")
            if(status === 1){ 
              handlePurchase();
              setButtonText("Start Game")
            }
            setPaymentStatus(response?.data?.message);
          } else {
            setIsPaymentSuccess("failed")
            setPaymentStatus("Transaction Failed")
          }
        }
      })
      .catch(error => {
        setMessage('error:' + error.message);
        setCheckPaymentStatus(false)
        setIsPaymentSuccess("")
      });
  };
  const
    handleAmountPress = value => {
      setAmount(value);
    };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#361911' }}>
      {
        !loader ? (<>
          <View style={styles.container}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
                <Iconics name="chevron-back" size={wp("7%")} color={"white"} />
              </TouchableOpacity>
              <View style={{ flex: 1, marginRight: hp('5%') }}>
                <Text style={styles.title}>Add Cash</Text>
              </View>
              <View style={styles.wallet}>
                <LinearGradient
                  colors={['#FFFFFF1A', '#FFFFFF1A', '#5521131A']}
                  style={{ padding: wp('1%'), borderRadius: wp('2%'), paddingHorizontal: wp('4%'), flexDirection: 'row' }}>
                  <Image
                    source={{ uri: "https://img.icons8.com/color/48/wallet--v1.png" }}
                    style={styles.walletIcon}
                  />
                  <Text style={styles.walletText}>₹ {usersData?.total_balance}</Text>
                </LinearGradient>
              </View>
            </View>

            <View style={{ flex: 1, backgroundColor: '#FFFFFF' }}>
              <View style={styles.addCashContainer}>
                <View style={styles.inputContainer}>
                  <Text style={styles.label}>Enter Amount</Text>
                  <TextInput
                    style={styles.input}
                    value={amount !== null && amount !== "" ? `₹${amount}` : ""}
                    placeholderTextColor="#aaa"
                    placeholderStyle={{ alignSelf: 'center' }}
                    onChangeText={text => {
                      const numericValue = text.replace(/[^0-9]/g, "");
                      setAmount(numericValue);
                    }}
                    keyboardType="numeric"
                  />
                </View>
                <View style={styles.buttonsRow}>
                  {["100", "500", "1000", "5000"].map((amount) => (
                    <TouchableOpacity key={amount} style={styles.amountButton} onPress={() => handleAmountPress(amount)}>
                      <Text style={styles.amountText}>{amount}</Text>
                    </TouchableOpacity>
                  ))}
                </View>
                <TouchableOpacity style={styles.withdrawButton} onPress={handleAddCash}>
                  <Text style={styles.withdrawButtonText}>ADD CASH</Text>
                </TouchableOpacity>
              </View>

              <View style={styles.featuresRow}>
                <View style={styles.feature}>
                  <Image
                    source={{ uri: "https://img.icons8.com/color/48/security-checked.png" }}
                    style={styles.featureIcon}
                  />
                  <Text style={styles.featureText}>100% Safe Payments</Text>
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
              <TouchableOpacity style={styles.referralBanner}>
                <Image source={require("../../../assets/images/Screens/referal.png")} style={styles.image} />
              </TouchableOpacity>
            </View>
          </View>

        </>) : (<AnimatedLoader />)
      }
      <AlertDialogRed visible={visible} onClose={() => setVisible(false)} message={message} onOkPress={() => setVisible(false)} />
      <>
        <PaymentStatusCard checksPaymentStatus={checksPaymentStatus}
          status={isPaymentSuccess}
          setIsPaymentSuccess={setIsPaymentSuccess}
          setCheckPaymentStatus={setCheckPaymentStatus}
          amount={amount}
          date={formattedDate}
          buttonText = {buttonText}
          toast = {toast}
          ticket_id = {ticket_id}
          game_id = {game_id}
          user_id = {user_id}
        />

      </>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'absolute',
    width: "100%",
  },
  header: {
    backgroundColor: "#361911",
    flex: 1,
    padding: wp("4%"),
    paddingBottom: hp("12%"),
    paddingTop: hp('7%'),
    flexDirection: 'row',
  },
  backButton: {
    flex: 1,
    justifyContent: 'center',
    bottom: hp('0.5%'),
  },
  title: {
    fontSize: wp("5%"),
    fontFamily: 'Montserrat-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
  wallet: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  walletIcon: {
    width: hp('3%'),
    height: hp('3%'),
    marginRight: 8,
  },
  featureIcon: {
    width: wp('8%'),
    height: hp('4%'),
    marginBottom: 8,
  },
  walletText: {
    color: '#fff',
    fontFamily: 'LuckiestGuy-Regular',
    fontSize: wp("5%"),
  },
  addCashContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: wp("3%"),
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: wp("2%"),
    elevation: 4,
    marginTop: -hp("10%"),
    marginHorizontal: wp("4%"),
  },
  input: {
    fontSize: wp("6%"),
    textAlign: 'center',
    color: '#000',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    marginBottom: hp("2%"),
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp("2%"),
    marginHorizontal: hp('2%')
  },
  amountButton: {
    borderWidth: 1,
    borderColor: '#000000B2',
    borderRadius: wp("2%"),
    padding: wp("2%"),
    minWidth: wp("15%"),
    alignItems: 'center',
  },
  amountText: {
    fontSize: wp("4%"),
    fontFamily: 'Inter_18pt-Medium',
    color: '#000000B2',
  },
  addCashButton: {
    backgroundColor: '#39B54A',
    padding: hp("2%"),
    borderRadius: wp("2%"),
    alignItems: 'center',
  },
  addCashButtonText: {
    fontSize: wp("4.5%"),
    color: '#fff',
    fontWeight: 'bold',
  },
  featuresRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp("2%"),
    marginTop: hp("5%"),
  },
  feature: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: wp("3%"),
    textAlign: 'center',
  },
  referralBanner: {
    marginVertical: wp("30%"),
    margin: hp('2%'),
    flex: 1,
  },
  image: {
    height: hp('20%'),
    width: wp('90%'),
    resizeMode: 'contain'
  },
  inputContainer: {
    backgroundColor: '#DDF1E6',
    marginRight: wp('10%'),
    width: wp('85%'),
    borderBottomColor: 'black',
    marginVertical: wp('8%'),
    border: 1,
    borderRadius: wp('3%'),
    paddingBottom: hp(0.7),
    marginHorizontal: wp('4%')
  },
  label: {
    position: 'absolute',
    top: -hp('1%'),
    left: wp('30%'),
    backgroundColor: '#fff',
    paddingHorizontal: wp('2%'),
    fontSize: hp('1.5%'),
    color: '#555',
    zIndex: 1,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp('3%'),
    fontSize: hp('2%'),
    backgroundColor: '#fff',
  },
  withdrawButton: {
    backgroundColor: '#4FBF03',
    borderRadius: wp('3%'),
    paddingVertical: hp('1.5%'),
    marginBottom: hp('4%'),
    alignItems: 'center',
    borderColor: '#FFFFFF',
    borderWidth: 2,
    shadowColor: '#4FBF03',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 2,
    shadowRadius: 15,
    elevation: 10,
    width: '90%',
    marginLeft: '5%',
  },
  withdrawButtonText: {
    fontSize: 20,
    fontFamily: 'Inter_18pt-Bold',
    color: '#FFFFFF',
    letterSpacing: 2,
    textShadowColor: '#F88600',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 10,
  },

});

export default AddCashScreen;
