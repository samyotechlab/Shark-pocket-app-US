import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/Applogo/sharkPocket.png'
import { useNavigation } from '@react-navigation/native'
import BackgroundScreen from '../../Components/BackgroundScreen'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import useLoginDataStorage from '../../Service/CustomStorageHook'

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  const {loginData,isReady} = useLoginDataStorage();
  useEffect(() => {
    if (!isReady) return;
    const timer = setTimeout(() => {
      if (loginData) {
        navigation.navigate('HomeScreen');
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