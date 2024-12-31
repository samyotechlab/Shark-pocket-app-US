import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import PlayedHistory from '../GameName.js/PlayedHistory'
import LinearGradient from 'react-native-linear-gradient'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useRoute } from '@react-navigation/native'


export default function AllGameName() {
  const route = useRoute()

  return (
 <LinearGradient
              colors={['#361911', '#361911', '#6A1700']}
              style={styles.linearGradient}>
                 <CommonHeader title={"Game Name"}/>
                 <View style={styles.container}>
                      <PlayedHistory/>
                    </View>
            </LinearGradient>
  )
}

const styles = StyleSheet.create({
   linearGradient: {
          flex: 1,
        },
          container:{
                flex:1,
                marginTop:wp('10%')
            },
})