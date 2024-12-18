import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp , heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Backarrow from '../../assets/images/Applogo/arrow_back.png'

export default function CommonHeader({title}) {

  return (
      <View style={styles.headerContent}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{position: 'absolute', top: hp('1.3%'), left: hp('1.8%')}}>
           <Image source={Backarrow} style={styles.icon}/>
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
  )
}

export const styles = StyleSheet.create({
      headerContent: {
        flex: 1,
        paddingTop: 10,
        position: 'relative',
      },
      headerLeft: {
        marginLeft: '20%',
      },
      headerText: {
        fontSize: hp('2.5%'),
        color: '#FFFFFF',
      },
})