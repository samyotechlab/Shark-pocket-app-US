import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import Backarrow from '../../../assets/images/Applogo/arrow_back.png'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'

import Config from '../../Utilities/Config'
import Toast from 'react-native-toast-message'
import useLoginDataStorage from '../../Service/CustomStorageHook'
import { AdharVerificationSendOtp } from '../../Service/AadharVerification'
import { baseApiurl } from '../../Service/AxiosInstance'


const headers = {
  'Content-Type': 'application/json',
};

export default function AadharOtpVerify() {
  const route = useRoute()
  const { storeLoginData } = useLoginDataStorage();
  const { data,user_id ,aadhaar_number ,game_id } = route.params
  const navigation = useNavigation();
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const inputs = useRef([]);
  const [loader, setLoader] = useState(false);
  const [timer, setTimer] = useState(120);
  const [isResendDisabled, setIsResendDisabled] = useState(true);


  useEffect(() => {
    let interval = null;
    if (timer > 0) {
      setIsResendDisabled(true);
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    if (text && index < 5) {
      inputs.current[index + 1].focus();
    }
  }
  const handleBackspace = (text, index) => {
    if (!text && index > 0) {
      inputs.current[index - 1].focus();
    }
  };

  const formatTime = seconds => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendOtp = async () => {
    setTimer(120);
    setIsResendDisabled(true);
    setLoader(true)
    try {
      const response = await AdharVerificationSendOtp(aadhaar_number);
      console.log("response", response)
      if (response.status === 1) {
        setLoader(false)
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Otp ReSend',
          text2: 'Otp ReSend Succesffully in your given phone Number',
          visibilityTime: 5000
        });
      }
    } catch (error) {
      setLoader(false)
      console.log("error", error)
    }
  }

  const handleOtp = () => {
    const verificationData = {
      user_id: user_id,
      otp: otp.join(''),
      status: data.status,
      ref_id: data.ref_id,
      aadhaar_number: aadhaar_number
    }
    console.log("verificationData", verificationData)
    setLoader(true);
    try {
      axios
        .post(
          `${baseApiurl}/${Config.AdharVerifyOtp}`,
          {
            verificationData
          },
          headers,
        )
        .then(res => {
          if (res.data.status === 1) {
            setLoader(false)
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Welcome!',
              text2: 'Otp Verify Successfully',
              visibilityTime: 5000
            });
            storeLoginData(res.data)
            navigation.navigate('GameName',{game_id:game_id});
          } else {
            setLoader(false)
            Toast.show({
              type: 'error',
              position: 'top',
              text1: 'Error!',
              text2: 'Authentication Failed',
              visibilityTime: 4000,
            });
          }
        })
        .catch(err => {
          console.log('error--->', err);
          setLoader(false)
        });

    } catch (error) {
      setLoader(false)
      console.log('An error occurred:', error);
    }

  };
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
          <Text style={[styles.text, { fontFamily: 'Montserrat-Light' }]}>Please enter the 6-digit code sent to your
            phone number for verification.</Text>
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
          <CommonButton
            title={loader ? 'Verifying...' : 'Verify'}
            onPress={handleOtp}
            disabled={loader} />
            <Text style={styles.timer}>{formatTime(timer)}</Text>
          <TouchableOpacity
            onPress={handleResendOtp}
            disabled={isResendDisabled}
          >
            <Text
              style={[
                styles.resendOtp,
                { color: isResendDisabled ? '#CCCCCC' : '#FCFCFC' },
              ]}
            >
              Resend OTP
            </Text>
          </TouchableOpacity>
        </View>
        <Toast ref={Toast.setRef} />
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
    paddingHorizontal: wp('3%'),
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
  footerText: {
    color: '#FFFFFF',
    textAlign: 'center',
    paddingTop: hp('10%')
  }
})