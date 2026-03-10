import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import CommonButton from '../../Components/CommonButton'
import call from '../../../assets/images/Applogo/call.png'
import { useNavigation } from '@react-navigation/native'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import Config from '../../Utilities/Config'
import { baseApiurl } from '../../Service/AxiosInstance'
import CheckBox from 'react-native-check-box'
import { useOtpVerify } from 'react-native-otp-verify'
import useResponsive from '../../Utilities/ResponsiveScreen'  // ✅ import hook

const headers = { 'Content-Type': 'application/json' };

function Login() {
  const navigation = useNavigation();

  // ✅ Destructure only what you need
  const { wp, hp, fs, scale, vs, isTablet } = useResponsive();

  const [phoneNumber, setPhoneNumber]   = useState('');
  const [mobileError, setMobileError]   = useState('');
  const [loader, setLoader]             = useState(false);
  const [isChecked, setIsChecked]       = useState(false);
  const [mobilHash, setMobilHash]       = useState('');
  const { hash } = useOtpVerify({ numberOfDigits: 4 });

  useEffect(() => {
    if (hash?.length > 0) setMobilHash(hash?.toString());
  }, [hash]);

  const validateInputs = () => {
    let valid = true;
    const mobileRegex = /^[6-9]\d{9}$/;
    if (!phoneNumber.trim()) {
      setMobileError('Mobile number is required');
      valid = false;
    } else if (!mobileRegex.test(phoneNumber)) {
      setMobileError('Mobile number must be 10 digits');
      valid = false;
    } else {
      setMobileError('');
    }
    return valid;
  };

  const handleLogin = () => {
    setLoader(true);
    try {
      if (validateInputs()) {
        axios
          .post(`${baseApiurl}/${Config.Login}`, { phoneNumber, mobilHash }, headers)
          .then(res => {
            if (res.data.status === 1) {
              setLoader(false);
              navigation.navigate('OtpScreen', { data: res.data.data });
            } else {
              setLoader(false);
              Toast.show({
                type: 'error',
                position: 'top',
                text1: 'Error!',
                text2: 'Authentication Failed',
                visibilityTime: 3000,
              });
            }
          })
          .catch(err => {
            console.log('error--->', err);
            setLoader(false);
          });
      } else {
        setLoader(false);
      }
    } catch (error) {
      console.log('An error occurred:', error);
      setLoader(false);
    }
  };

  // ✅ Styles inside component so hook values are accessible
  const styles = StyleSheet.create({
    container: {
      flex: 0.5,
      marginHorizontal: scale(16),   // was hp(2)
      marginTop: vs(80),             // was hp(10)
    },
    box: {
      flex: 1,
      justifyContent: 'center',
    },
    titleText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontSize: fs(isTablet ? 28 : 22),   // ✅ tablet-aware font size
      fontFamily: 'Montserrat-Bold',
    },
    subtitleText: {
      textAlign: 'center',
      color: '#FFFFFF',
      fontSize: fs(14),
      fontFamily: 'Montserrat-Light',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#fff',
      borderRadius: scale(8),
      paddingHorizontal: scale(10),
      paddingVertical: vs(8),
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 2,
      width: '100%',
    },
    icon: {
      width: scale(20),              // ✅ responsive icon size
      height: scale(20),
      marginRight: scale(10),
      resizeMode: 'contain',
    },
    input: {
      flex: 1,
      fontSize: fs(16),              // ✅ was hardcoded 16
      color: '#000',
    },
    errorText: {
      color: 'red',
      fontSize: fs(13),
      marginTop: vs(8),
      marginLeft: scale(10),
    },
    checkboxContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: vs(20),          // was hardcoded 20
    },
    checkboxText: {
      fontSize: fs(13),              // was hardcoded 14
      marginLeft: scale(8),
      color: '#FFFFFF',
    },
    kycText: {
      color: '#FFFFFF',
      fontSize: fs(13),              // was hp('1.5')
      fontFamily: 'Montserrat-Regular',
      marginTop: vs(8),              // was hp('1%')
      textDecorationLine: 'underline',
      fontFamily: 'Montserrat-Bold',
    },
  });

  return (
    <>
      <BackgroundScreen />
      <View style={styles.container}>

        {/* ── Title Block ── */}
        <View style={styles.box}>
          <Text style={styles.titleText}>Welcome Back!</Text>
          <Text style={styles.subtitleText}>Please enter your phone number</Text>
        </View>

        {/* ── Input Block ── */}
        <View style={styles.box}>
          <View style={styles.inputContainer}>
            <Image source={call} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="gray"
              keyboardType="numeric"
              maxLength={10}
              value={phoneNumber}
              onChangeText={(text) => {
                const onlyNumbers = text.replace(/[^0-9]/g, '');
                setPhoneNumber(onlyNumbers);
                if (mobileError && /^[6-9]\d{0,9}$/.test(onlyNumbers)) {
                  setMobileError('');
                }
              }}
            />
          </View>
          {Boolean(mobileError) && (
            <Text style={styles.errorText}>{mobileError}</Text>
          )}
        </View>

        {/* ── Checkbox Block ── */}
        <View style={styles.checkboxContainer}>
          <CheckBox
            onClick={() => setIsChecked(!isChecked)}
            isChecked={isChecked}
            checkedCheckBoxColor="#FFD700"
            uncheckedCheckBoxColor="#9B9B9B"
            disabled={phoneNumber.trim() === ''}
          />
          <Text style={styles.checkboxText}>Accept all terms and conditions?</Text>
          <TouchableOpacity
            style={{ marginBottom: vs(9) }}
            onPress={() => navigation.navigate('T&CScreen')}
          >
            <Text style={styles.kycText}> Terms & Condition</Text>
          </TouchableOpacity>
        </View>

        {/* ── Button Block ── */}
        <View style={[styles.box, { position: 'relative' }]}>
          <CommonButton
            title={loader ? 'Loading...' : 'Login'}
            onPress={handleLogin}
            disabled={!isChecked}
          />
        </View>

        <Toast ref={Toast.setRef} />
      </View>
    </>
  );

}

export default Login;