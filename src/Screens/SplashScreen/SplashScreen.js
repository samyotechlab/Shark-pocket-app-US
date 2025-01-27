import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/Applogo/sharkPocket.png'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import useLoginDataStorage from '../../Service/CustomStorageHook'
import { verifyLogin } from '../../Service/Home'
import HomeScreen from '../HomeScreen/Home'
import { decryptData, generateKey } from '../../Utilities/utilies'

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const { loginData, isReady, storeLoginData } = useLoginDataStorage();

  const handelVerifyLogin = async (userdata, token) => {
    console.log("userdata======>", userdata)
    setIsLoading(true)
    try {
      const response = await verifyLogin(userdata?._id, token);
      const Responsedata = response.data;
      // const mobileNumber = userdata?.mobile;
      // const username = userdata?.name;
      // const aadharNumber = userdata?.aadhaar;
      // const userId = userdata?._id;
      // const key = generateKey(mobileNumber, username, aadharNumber, userId);
      const key = "sharkpocketdevelopedbysamyoindoreteam"
      const decrypt_data = decryptData(key,Responsedata)
      const data = JSON.parse(decrypt_data)
      const loginData = {
        data :data
      }
      if (response.status === 1) {
        navigation.navigate('HomeScreen')
      } else {
        navigation.navigate('LoginScreen')
      }
    } catch (error) {
      console.log("error======>", error)
      navigation.navigate('LoginScreen')
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    const data = isReady && loginData && loginData?.data;
    const token = isReady && loginData && loginData?.token;
    const timeout = setTimeout(() => {
      if (loginData && isReady) {
        handelVerifyLogin(data, token);
      } else {
        navigation.navigate('LoginScreen')
      }
    }, 3000)
    return () => clearTimeout(timeout);
  }, [isReady, loginData]);

  return (
    <>
      <View style={styles.container}>
        <Image source={Logo} style={{ height: wp('100%'), width: wp('100%'), resizeMode: 'contain' }} />
      </View>
      {/* <AnimatedLoader/> */}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF'
  }
});