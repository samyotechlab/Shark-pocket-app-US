import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, SafeAreaView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Iconics from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from '@react-navigation/native';
import { bonusWallet, checkPaymentStatus, TransactionStore } from '../../Service/Transaction';
import PhonePePaymentSDK from 'react-native-phonepe-pg';
import AlertDialogRed from '../../Components/AlertDialogRed';
import LinearGradient from 'react-native-linear-gradient';

const AddCashScreen = () => {
  const navigation = useNavigation();
  const route = useRoute()
   const {user_id} = route.params
   const [amount, setAmount] = useState(null);
   const [visible, setVisible] = useState(false);
   const [data, setData] = useState({});
   const [message, setMessage] = useState('');
   const [dialog, setDialog] = useState(false);
   const [isLoading, setisLoading] = useState(false);
   const [checksPaymentStatus,setCheckPaymentStatus] =useState({})
   const [paymentStatus, setPaymentStatus] = useState(null);
  
  const handleAddCash = async () => {
    if (amount) {
      try {
        const response = await TransactionStore(user_id, amount);
        console.log("response",response)
        addBonusWallet(response)
        initPhonePeSDK(response);
        setData(response);
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

  const initPhonePeSDK = response => {
    PhonePePaymentSDK.init(
      response.environment_type,
      response.merchant_id,
      '',
      true,
    )
      .then(result => {
        console.log("result",result)
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
        console.log('aaaa', res);
        setMessage(JSON.stringify(res));
        setDialog(true);
        setisLoading(true);
        if (res.status) {
          const response = await checkPaymentStatus(transaction_id);
          console.log(response)
          setCheckPaymentStatus(response.data.data)
          setTimeout(() => {
            setisLoading(false);
            if (response?.data?.status == 1 && response.data.data.status == 1) {
              setPaymentStatus(response?.data?.message);
            }else{
              setPaymentStatus("Transaction Failed")
            }
          }, 3000);
        }
      })
      .catch(error => {
        setMessage('error:' + error.message);
      });
  };


    const handleAmountPress = value => {
    setAmount(value);
  };

  return (
  <SafeAreaView style={{flex:1,backgroundColor:'#361911'}}>
    <View style={styles.container}>
    <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Iconics name="chevron-back" size={wp("7%")} color={"white"} />
        </TouchableOpacity>
        <View style={{flex:1,marginRight:hp('5%')}}>
        <Text style={styles.title}>Add Cash</Text>
        </View>
        <View style={styles.wallet}>

          <LinearGradient 
          colors={['#FFFFFF1A','#FFFFFF1A','#5521131A']}
           style={{padding:wp('1%'),borderRadius:wp('2%'),paddingHorizontal:wp('4%'),flexDirection:'row'}}>
                     <Image
            source={{ uri: "https://img.icons8.com/color/48/wallet--v1.png" }}
            style={styles.walletIcon}
          />
          <Text style={styles.walletText}>₹ 1000</Text>
          </LinearGradient>
        </View>
      </View>

  <View style={{flex:1}}>  
   <View style={styles.addCashContainer}>
                    <View style={styles.inputContainer}>
                      <Text style={styles.label}>Enter Amount</Text>
                      <TextInput
                        style={styles.input}
                        value={amount}
                        placeholderTextColor="#aaa"
                        placeholderStyle={{ alignSelf: 'center' }}
                        onChangeText={text => setAmount(text)}
                      />
                    </View>
        <View style={styles.buttonsRow}>
          {["₹100", "₹500", "₹1000", "₹5000"].map((amount) => (
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
        <Image source={require("../../../assets/images/Screens/referal.png")} />
      </TouchableOpacity>
      </View>
      </View>  



    <AlertDialogRed visible={visible} onClose={() => setVisible(false)}  message={message}/>
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
    flex:1,
    padding: wp("4%"),
    paddingBottom: hp("12%"),
    paddingTop:hp('7%'),
    flexDirection: 'row',
  },
  backButton: {
    flex:1,
    justifyContent:'center',
    bottom:hp('0.5%'),
  },
  title: {
    fontSize: wp("5%"),
    fontFamily:'Montserrat-SemiBold',
    color: '#fff',
    textAlign: 'center',
  },
  wallet: {
    flex:1,
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
    fontFamily:'LuckiestGuy-Regular',
    fontSize: wp("5%"),
  },
  addCashContainer: {
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
    marginHorizontal:hp('2%')
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
    fontFamily:'Inter_18pt-Medium',
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
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: hp("2%"),
    marginTop: hp("5%"),
  },
  feature: {
    alignItems: 'center',
  },
  // featureIcon: {
  //   fontSize: wp("6%"),
  //   marginBottom: hp("1%"),
  // },
  featureText: {
    fontSize: wp("3%"),
    textAlign: 'center',
  },
  referralBanner: {
    marginVertical: hp("20%"),
    padding: wp("4%"),
    borderRadius: wp("2%"),
    alignItems: 'center',
  },
  inputContainer: {
    backgroundColor: '#DDF1E6',
    marginRight:wp('10%'),
    width: wp('85%'),
    borderBottomColor: 'black',
    marginVertical:wp('8%'),
    border: 1,
    borderRadius: wp('3%'),
    paddingBottom: hp(0.7),
    marginHorizontal:wp('4%')
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
    marginBottom:hp('4%'),
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
