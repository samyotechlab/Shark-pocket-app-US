import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useRef, useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import Backarrow from '../../../assets/images/Applogo/arrow_back.png'
import { useNavigation } from '@react-navigation/native'


export default function OtpVerify() {
  const navigation = useNavigation()
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 3) {
      inputs.current[index + 1].focus();
    }
  };

  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };
  const handleNavigation = ()=>{
    navigation.navigate('DisclaimerScreen')
  }
  return (
    <>
      <BackgroundScreen />
      <View style={styles.container}>
        <View style={[styles.box, { justifyContent: 'center' }]}>
          <View style={styles.headerContent}>
            <TouchableOpacity
              onPress={() => navigation.goBack()}
              style={styles.verification}>
              <Image source={Backarrow} style={styles.icon} />
            </TouchableOpacity>
            <View style={styles.headerLeft}>
              <Text style={styles.headerText}>Verification</Text>
            </View>
          </View>
          <Text style={[styles.text, { fontFamily: 'Montserrat-Light' }]}>Please enter the 4-digit code sent to your
            phone number ***1452 for verification.</Text>
        </View>
        <View style={[styles.box, { justifyContent: 'center' }]}>
          <View style={styles.inputContainer}>
            {otp.map((digit, index) => (
              <TextInput
                key={index}
                style={styles.input}
                value={digit}
                onChangeText={(text) => handleChange(text, index)}
                onKeyPress={({ nativeEvent }) =>
                  nativeEvent.key === 'Backspace' && handleBackspace(digit, index)
                }
                keyboardType="number-pad"
                maxLength={1}
                ref={(ref) => (inputs.current[index] = ref)}
              />
            ))}
          </View>
        </View>
        <View style={[styles.box, { paddingVertical: hp('4%'), padding: hp('2%') }]}>
          <CommonButton title={'Verify'} onPress={handleNavigation}/>
          <Text style={styles.timer}>00:30</Text>
          <Text style={styles.resendOtp}>Resend OTP</Text>
        </View>
      </View>
    
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 0.5,
    margin: hp(2),
    marginTop: hp(8)
  },
  box: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF',
    padding: wp('3%')
  },
  verification: {
    position: 'absolute',
    top: hp('1.3%')
  },
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp('10%'),
    marginTop: hp('0%'),
  },
  icon: {
    height: hp('2.5%'),
    width: wp('2.5%')
  },
  headerLeft: {
    marginLeft: hp('12%')
  },
  headerText: {
    fontSize: hp('2.5%'),
    color: '#FFFFFF',
    fontFamily: 'Montserrat-Bold'
  },
  headerContent: {
    flex: 1,
    paddingTop: 10,
    position: 'relative',
  },
  input: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    textAlign: 'center',
    fontSize: 18,
    borderRadius: 5,
    backgroundColor: '#f9f9f9',
  },
  resendOtp: {
    textDecorationLine: 'underline',
    color: '#FCFCFC',
    textAlign: 'center',
    paddingTop: hp('5%'),
    fontFamily: 'Montserrat-Bold'
  },
  timer: {
    color: '#FCFCFC',
    textAlign: 'right',
    paddingTop: hp('1.5%'),
    fontFamily: 'Montserrat-Medium',
    fontSize: hp('1.5%')
  },
  footerText:{
    color:'#FFFFFF',
    textAlign:'center',
    paddingTop:hp('10%')
  }
})