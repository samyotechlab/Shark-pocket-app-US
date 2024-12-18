import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Logo from '../../../assets/images/Applogo/logo.png'
import { useNavigation } from '@react-navigation/native'
import BackgroundScreen from '../../Components/BackgroundScreen'

export default function SplashScreen() {
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate('LoginScreen');
    }, 2000);

    return () => clearTimeout(timer); 
  }, []);
  return (
    <>
       <BackgroundScreen/> 
       <View style={styles.container}>
           <Image source={Logo}/>
       </View>
      
    </>
  );
}

const styles = StyleSheet.create({
   container:{
    flex:1,
      justifyContent:'center',
      alignItems:'center'
   }
});