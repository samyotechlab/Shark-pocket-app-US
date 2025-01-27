import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp , heightPercentageToDP as hp} from 'react-native-responsive-screen'
import Iconics from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';

export default function CommonHeader({title,screen_name,game_id}) {
  const navigation = useNavigation()
  const handleNavigation = () => {
    if (screen_name === 'GameName') {
      navigation.navigate('GameName', { game_id: game_id });
    } else if (screen_name === 'Tickets') {
      navigation.navigate('HomeScreen', { screen: 'Home' });
    } else {
      navigation.goBack();
    }
  };
  return (
      <View style={styles.headerContent}>
        <TouchableOpacity
          onPress={() => {handleNavigation()}}
          style={styles.back}
          >
          <Iconics name="chevron-back" size={hp('3%')} color={'white'} style={{paddingTop:wp('0.5%')}}/>
        </TouchableOpacity>
        <View style={styles.headerLeft}>
          <Text style={styles.headerText}>{title}</Text>
        </View>
      </View>
  )
}

export const styles = StyleSheet.create({
      headerContent: {
        paddingTop: hp('2%'),
        marginTop:wp('8%'),
        flexDirection:'row'
      },
      headerLeft: {
        marginLeft: wp('5%'),
        justifyContent:'center'
      },
      headerText: {
        fontSize: hp('2.3%'),
        color: '#FFFFFF',
        fontFamily:'Montserrat-SemiBold'
      },
      back:{
        paddingLeft:wp('6%'),
      }
})