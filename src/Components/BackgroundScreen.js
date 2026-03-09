import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Vector from '../../assets/images/Screens/Vector.png'

const BackgroundScreen = () => {
  return (   
    <View style= {{flex: 1, position: 'absolute', width: '100%', height: '100%'}}>
    <LinearGradient
        colors={['#361911', '#361911', '#6A1700']}
        style={styles.linearGradient}>
          <Image source={Vector} style={styles.vectorImg} />
      </LinearGradient>
      </View>
  )
}

export default BackgroundScreen

const styles = StyleSheet.create({
    linearGradient: {
        flex: 1,
      },
      vectorImg: {
        height: '50%',   
        width: '50%',   
        position: 'absolute',
        bottom: 0,       
        left: 0,  
      },
})