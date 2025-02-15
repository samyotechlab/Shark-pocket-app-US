import { Image, KeyboardAvoidingView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import BackgroundScreen from '../../Components/BackgroundScreen'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import CommonButton from '../../Components/CommonButton'
import call from '../../../assets/images/Applogo/call.png'
import { useNavigation } from '@react-navigation/native'
import { login } from '../../Service/Login'
import axios from 'axios'
import Toast from 'react-native-toast-message'
import Config from '../../Utilities/Config'
import { baseApiurl } from '../../Service/AxiosInstance'
import CheckBox from 'react-native-check-box'


const headers = {
  'Content-Type': 'application/json',
};

export default function Login() {
  const navigation = useNavigation();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [mobileError, setMobileError] = useState('');
  const [loader, setLoader] = useState(false);
  const [isChecked, setIsChecked] = useState(false);


  const validateInputs = () => {
    let valid = true;
    const mobileRegex = /^[0-9]{10}$/;
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
          .post(
            `${baseApiurl}/${Config.Login}`,
            {
              phoneNumber,
            },
            headers,
          )
          .then(res => {
            console.log("response=====>", res.data)
            if (res.data.status === 1) {
              Toast.show({
                type: 'success',
                position: 'top',
                text1: 'Otp Send!',
                text2: 'Otp Send Succesffully in the given Number',
                visibilityTime: 3000
              });
              setTimeout(() => {
                setLoader(false);
                navigation.navigate('OtpScreen', { data: res.data.data });
              }, 3000);
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

      }
      else {
        setLoader(false)
      }
    } catch (error) {
      console.log('An error occurred:', error);
      setLoader(false);

    }
  };

  return (
    <>
      <BackgroundScreen />
      <View style={styles.container}>
        <View style={[styles.box, { justifyContent: 'center' }]}>
          <Text style={[styles.text, {
            fontSize: hp('3%'),
            fontFamily: 'Montserrat-Bold'
          }]}>Welcome Back!</Text>
          <Text style={[styles.text, { fontFamily: 'Montserrat-Light' }]}>Please enter your phone number</Text>
        </View>
        <View style={[styles.box, { justifyContent: 'center' }]}>
          <View style={styles.inputContainer}>
            <Image source={call} style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Phone Number"
              placeholderTextColor="gray"
              keyboardType="numeric"
              maxLength={10}
              value={phoneNumber}
              onChangeText={(text) => setPhoneNumber(text)}
              error={Boolean(mobileError)}
            />

          </View>
          {Boolean(mobileError) && (
            <Text style={styles.errorText}>{mobileError}</Text>
          )}
        </View>
        <View style={styles.checkboxContainer}>
          <CheckBox
            style={styles.checkBox}
            onClick={() => setIsChecked(!isChecked)}
            isChecked={isChecked}
            checkedCheckBoxColor="#FFD700"
            uncheckedCheckBoxColor="#9B9B9B"
          />
          <Text style={styles.checkboxText}>Accept all terms and conditions ?
            <TouchableOpacity style={{ marginBottom: hp('1.1%') }} onPress={() => {
              navigation.navigate('T&CScreen')
            }}>
              <Text style={[styles.kycText, { textDecorationLine: 'underline', fontFamily: 'Montserrat-Bold', }]}> Terms & Condition</Text>
            </TouchableOpacity>
          </Text>
        </View>
        <View style={[styles.box, { padding: hp('2%'), position: 'relative' }]}>
          <CommonButton
            title={loader ? 'Loading...' : 'Login'}
            onPress={handleLogin}
            disabled={!isChecked}
          />
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
    marginTop: hp(10),
  },
  box: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
    color: '#FFFFFF'
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
    width: '100%',

  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#000',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
    marginLeft: 10
  },
  loaderOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 10, 
    zIndex: 10,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  checkboxText: {
    fontSize: 16,
    marginLeft: 8,
    color: '#FFFFFF',
  },
  kycText: {
    color: '#FFFFFF',
    fontSize: hp('1.5'),
    fontFamily: 'Montserrat-Regular',
    marginTop: hp('1%'),
  }
})