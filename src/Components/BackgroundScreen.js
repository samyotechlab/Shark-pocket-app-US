import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Vector from '../../assets/images/Screens/Vector.png'
import  useResponsive  from '../Utilities/ResponsiveScreen'

 const BackgroundScreen = () => {
  const { width, height, wp, hp } = useResponsive();

  return (
    <View style={{ position: 'absolute', width, height }}>
      <LinearGradient colors={['#361911', '#6A1700']} style={{ flex: 1 }}>
        <Image
          source={Vector}
          style={{ width: wp(50), height: hp(50), position: 'absolute', bottom: 0, left: 0 }}
          resizeMode="contain"
        />
      </LinearGradient>
    </View>
  );
};

export default BackgroundScreen;


