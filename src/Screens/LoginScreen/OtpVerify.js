import { KeyboardAvoidingView, PermissionsAndroid, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import { useNavigation, useRoute } from '@react-navigation/native'
import axios from 'axios'
import Config from '../../Utilities/Config'
import Toast from 'react-native-toast-message'
import useLoginDataStorage from '../../Service/CustomStorageHook'
import Iconics from 'react-native-vector-icons/Ionicons';
import { baseApiurl } from '../../Service/AxiosInstance'
const headers = {
  'Content-Type': 'application/json',
};

export default function OtpVerify() {
  const route = useRoute()
  const { data } = route.params
  const navigation = useNavigation()
  const { storeLoginData } = useLoginDataStorage();
  // const [otps, setOtp] = useState('');
  const [otp, setOtp] = useState(['', '', '', '']);
  const inputs = useRef([]);
  const [timer, setTimer] = useState(120);
  const [otpVerified, setOtpVerified] = useState(false);
  const [loader, setLoader] = useState(false);
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

    const formatTime = seconds => {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

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


    const handleOtp = () => {
      clearInterval(timer);
      setLoader(true);
      try {
        axios
          .post(
            `${baseApiurl}/${Config.OtpVerify}`,
            {
              user_id: data.user_id,
              otp: otp.join(''),
              mobile: data.mobile
            },
            headers,
          )
          .then(res => {
            if (res.data.status === 1) {
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Welcome!',
                text2: 'Otp Verify Succesffully',
                visibilityTime: 5000
              });
              setOtpVerified(true);
              setTimeout(() => {
                setLoader(false);
                storeLoginData(res.data)
                navigation.navigate('HomeScreen');
              }, 3000);
            } else {
              setLoader(false);
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
            setLoader(false);
          });

      } catch (error) {
        console.log('An error occurred:', error);
        setLoader(false);
      }
    };

    const handleResendOtp = () => {
      setTimer(120);
      setIsResendDisabled(true);
      setLoader(true);
      try {
        axios
          .post(
            `${baseApiurl}/${Config.ResendOtp}`,
            {
              mobile: data.mobile
            },
            headers,
          )
          .then(res => {
            if (res.data.status === 1) {
              setLoader(false);
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Otp Send',
                text2: 'Otp Send Succesffully',
                visibilityTime: 5000
              });
            } else {
              setLoader(false);
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
            setLoader(false);
            console.log('error--->', err);
          });

      } catch (error) {
        setLoader(false);
        console.log('An error occurred:', error);
      }
    }


    return (
      <>
        <BackgroundScreen />
        <KeyboardAvoidingView style={styles.container}>

          <View style={{ flex: 1, margin: wp('6%') }}>
            <View style={styles.box}>
              <TouchableOpacity style={{ flex: 0.5, paddingTop: hp('0.5%') }} onPress={() => {
                navigation.goBack()
              }}>
                <Iconics name="chevron-back" size={27} color={'white'} />
              </TouchableOpacity>
              <View style={{ flex: 1.5, marginLeft: hp('1%') }}>
                <Text style={styles.headerText}>Verification</Text>
              </View>
            </View>
            <View style={{ marginTop: hp('3%') }}>
              <Text style={[styles.text, { fontFamily: 'Montserrat-Light' }]}>Please enter the 4-digit code sent to your
                phone number  for verification.</Text>
            </View>

            <View style={{ justifyContent: 'center', marginTop: hp('4%') }}>
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
                {/* <OtpInputs
                handleChange={(code) => setOtp(code)}
                numberOfInputs={4}
                inputStyles={styles.input}
                value={otps}
                autofillFromClipboard={true}
              /> */}
              </View>
            </View>

            <View style={{ marginTop: hp('10%') }}>
              <CommonButton
                onPress={handleOtp}
                title={loader ? 'Loading...' : 'Verify'}
                disabled={loader && !isResendDisabled}
              />
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

          </View>
          <Toast ref={Toast.setRef} />
        </KeyboardAvoidingView>


      </>
    )
  }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },

    box: {
      marginTop: hp('6%'),
      flexDirection: 'row'
    },
    text: {
      textAlign: 'center',
      color: '#FFFFFF',
      padding: wp('1%'),
      fontSize: hp('1.8%'),
      lineHeight: hp('2.8%')
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
      marginLeft: hp('12%'),
      // backgroundColor:'yellow'  
    },
    headerText: {
      fontSize: hp('2.8%'),
      color: '#FFFFFF',
      fontFamily: 'Montserrat-Bold',
      letterSpacing: wp(0.1)
    },
    headerContent: {
      flex: 1,
      backgroundColor: "red"
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
      paddingTop: hp('2%'),
      fontFamily: 'Montserrat-Medium',
      fontSize: hp('1.8%')
    },
    footerText: {
      color: '#FFFFFF',
      textAlign: 'center',
      paddingTop: hp('10%')
    },
    resendOtpButton: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      borderRadius: 5,
    },
    resendOtpText: {
      color: '#000',
      fontSize: 16,
    },
  })