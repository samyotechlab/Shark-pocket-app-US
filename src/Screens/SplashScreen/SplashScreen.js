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
  const {loginData,isReady,storeLoginData} = useLoginDataStorage();
 
  const handelVerifyLogin =async (id,token)=>{
    setIsLoading(true)
    try {
      const response = await verifyLogin(id,token);
      // console.log("response",response)
      if(response.status == 1){
        navigation.navigate('HomeScreen',{userData:response.data})
      }else{
        navigation.navigate('LoginScreen')
      }
    } catch (error) {
       console.log("error======>",error)
       navigation.navigate('LoginScreen')
    }finally{
      setIsLoading(false)
    }
  }

  useEffect(() => {
    const data = isReady && loginData && loginData?.data;
    const token = isReady && loginData && loginData?.token;
    const timeout = setTimeout (()=>{
      if(loginData && isReady){
        handelVerifyLogin(data?._id,token);
      }else{
        navigation.navigate('LoginScreen')
      }
    },3000)
    return () => clearTimeout(timeout);
  }, [isReady,loginData]);


 
  return (
    <>
       <View style={styles.container}>
           <Image source={Logo} style={{height:wp('100%'),width:wp('100%'),resizeMode:'contain'}}/>
        
       </View>
       {/* <AnimatedLoader/> */}
      
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