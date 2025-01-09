import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/Applogo/sharkPocket.png'
import { useNavigation } from '@react-navigation/native'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import useLoginDataStorage from '../../Service/CustomStorageHook'
import { verifyLogin } from '../../Service/Home'

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const {loginData,isReady} = useLoginDataStorage();
  const data = isReady && loginData && loginData?.data;
  const token = isReady && loginData && loginData?.token;
  const handelVerifyLogin =async ()=>{
    setIsLoading(true)
    try {
      const response = await verifyLogin(data._id,token);
      if(response.status == 1){
        navigation.navigate('HomeScreen',{userData:response.data})
      }
    } catch (error) {
       console.log("error",error)
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (!isReady) return;
    const timer = setTimeout(() => {
      if (loginData) {
        handelVerifyLogin();
      } else {
        navigation.navigate('LoginScreen');
      }
    }, 3000);
    return () => clearTimeout(timer);
  }, [isReady, loginData]);

 
  return (
    <>
       <View style={styles.container}>
           <Image source={Logo} style={{height:wp('100%'),width:wp('100%'),resizeMode:'contain'}}/>
       </View>
      
    </>
  );
}

const styles = StyleSheet.create({
   container:{
    flex:1,
      justifyContent:'center',
      alignItems:'center',
      backgroundColor:'#FFFFFF'
   }
});