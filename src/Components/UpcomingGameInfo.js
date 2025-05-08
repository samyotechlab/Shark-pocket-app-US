import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useRoute } from '@react-navigation/native'
import CommonHeader from './CommonHeader'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import InfoModal from './GameInfo'


export default function UpcomingGameInfo() {
  const route = useRoute()
  console.log("route.params",route.params)
  const gameData = route.params
  console.log("gameData======>",gameData.game_name)
  return (
    <LinearGradient
      colors={['#361911', '#361911', '#6A1700']}
      style={styles.linearGradient}>
      <CommonHeader title={gameData?.game_name} screen_name={'Tickets'} />
      <View style={{ marginTop: 10, flex: 1 }}>
        <View
          style={{
            flexDirection: 'row',
            padding: hp('1%'),
            gap: wp('10%')
          }}>
          <TouchableOpacity>  
            <Text
              style={styles.GameInfo}>
              Game Info
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: 1 }}>
          <InfoModal gameData={gameData} />
        </View>
      </View>
    </LinearGradient>
  )
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  GameInfo: {
    fontSize: 18,
    borderBottomWidth: 3,
    borderBottomColor: '#FEB801',
    color: '#FEB801',
    fontFamily: 'Montserrat-Bold',
  }
})