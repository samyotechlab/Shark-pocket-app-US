import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import TDSBreakupDialog from '../../Components/TDSBreakupDialog'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import Icons from 'react-native-vector-icons/MaterialIcons';
import Iconics from 'react-native-vector-icons/FontAwesome';
import secure from '../../../assets/images/Screens/Safe.png';
import light from '../../../assets/images/Screens/light.png';
import profile from '../../../assets/images/Screens/profile.png';
import AlertDialogRed from '../../Components/AlertDialogRed';
import { withdrawCash } from '../../Service/WithDraw';
import Toast from 'react-native-toast-message';
import Tds from '../../../assets/images/Screens/tds.png';
import Iconic from 'react-native-vector-icons/Ionicons';

export default function Withdraw({ dataUser }) {
  const [amount, setAmount] = useState('');
  const [visible, setVisible] = useState(false)
  const [message, setMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false);

  const handleWithdraw = () => {
    console.log("value", amount)
    if (parseFloat(amount) > dataUser.total_earning) {
      setVisible(true);
      setMessage(`Your wallet balance is ₹${dataUser.total_earning}. Please enter a valid amount.`)
    } else {
      console.log('Withdrawal successful:', amount);
      handleCick();
    }
  };
  const handleCick = async () => {
    try {
      setIsLoading(true);
      if (amount) {
        if (amount >= 50) {
          const response = await withdrawCash(dataUser._id, amount);
          console.log("response", response)
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Otp Send!',
            text2: 'Otp Send Succesffully in the given Number',
            visibilityTime: 3000
          })
        } else {
          setVisible(true);
          setMessage('Minimun Withdrawl amount is 50 Rupees');
        }
      } else {
        setVisible(true);
        setMessage('please enter amount');
      }
    } catch (error) {
      console.log('error', error);
    } finally {
      setIsLoading(false);
    }
  };


  const [isModalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <>
      <AlertDialogRed visible={visible} onClose={() => setVisible(false)} message={message} />
      <View style={{ flex: 1, backgroundColor: '#F3F3F3' }}>
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
          <View style={{ marginTop: 5 }}>
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
              />
            </View>
          </View>

          {/* Tax and Learn More */}
          <View>
            <Text style={styles.infoText}>
              No Govt. Tax on this withdrawal {' '}
              <TouchableOpacity onPress={toggleModal} >
                <Text style={styles.learnMore}>Learn More</Text>
              </TouchableOpacity>
            </Text>
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

        <View style={{ flex: 1, backgroundColor: 'white', marginTop: 10 }}>
          <View style={styles.bankDetails}>
            <Text style={styles.bankDetailsLabel}>Send Winnings to</Text>
            <View style={styles.bankInfo}>
              <Iconics name={'bank'} size={30} />
              <View>
                <Text style={styles.bankName}>ICICI BANK LIMITED</Text>
                <Text style={styles.bankAccount}>XXXXXXXXXXXX0213</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.buttonContainer}>
            <View style={styles.iconContainer}>
              <Image
                source={Tds}
                style={styles.icon}
              />
            </View>
            <Text style={styles.buttonText}>Download TDS Certificate</Text>
            <View style={styles.arrowContainer}>
              <Iconic name="chevron-forward-outline" size={20} color={'black'} />
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
    border: 1,
    borderRadius: wp('3%'),
    paddingBottom: hp(0.7),
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
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: wp('3%'),
    fontSize: hp('2%'),
    backgroundColor: '#fff',
  },
  header: {
    marginBottom: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#000',
  },

  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#4C2C2B',
    paddingVertical: 15,
    marginVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "90%",
    marginLeft: "5%",
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  icon: {
    fontSize: 18,
    color: '#fff',
    marginRight: 10,
  },
  text: {
    flex: 1,
    color: '#fff',
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    paddingHorizontal: 10
  },
  amount: {
    color: '#fff',
    fontSize: 18,
    fontFamily: 'Montserrat-SemiBold',
  },
  title: {
    fontSize: 18,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center'
  },
  inputWrapper: {
    width: '90%',
    position: 'relative',
    alignItems: 'center',
  },
  outerInputcontainer: {
    flex: 1,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 20,
    textAlign: 'center',
    marginTop: 10,
    fontFamily: 'Montserrat-Regular',
  },
  learnMore: {
    fontSize: 14,
    color: '#000000',
    textDecorationLine: 'underline',
    fontFamily: 'Montserrat-Medium',
    // paddingBottom:10,
    // marginBottom:10
  },

  withdrawButton: {
    backgroundColor: '#4FBF03',
    borderRadius: 15,
    paddingVertical: 15,
    paddingHorizontal: 30,
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
  bankDetails: {
    backgroundColor: 'white',
    padding: 30,
  },
  bankDetailsLabel: {
    fontSize: 18,
    marginBottom: 10,
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  bankIcon: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  bankName: {
    fontSize: 16,
    fontFamily: 'Montserrat-Medium',
    color: '#000000',
  },
  bankAccount: {
    fontSize: 14,
    color: '#000000',
    fontFamily: 'Montserrat-Medium',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#607D8B',
    marginBottom: 4,
  },
  featuresRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: hp("6%"),
  },
  feature: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: wp("3%"),
    textAlign: 'center',
    color:'#000000',
    fontFamily:'Montserrat-Regular',
    lineHeight:wp('5%')
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#00000033',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },

  arrowContainer: {
    marginLeft: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#333333',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderColor: '#00000033',
    borderWidth: 1,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginHorizontal: 16,
  },
  iconContainer: {
    marginRight: 12,
  },
  icon: {
    width: 24,
    height: 24,
  },
  buttonText: {
    flex: 1,
    fontSize: 16,
    fontFamily: "Montserrat-Medium",
    color: '#696969',
  },
  arrowContainer: {
    marginLeft: 8,
  },
  arrow: {
    fontSize: 18,
    color: '#333333',
  },
});




