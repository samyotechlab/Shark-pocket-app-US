import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import Iconics from 'react-native-vector-icons/Ionicons'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen'
import LeaderBoard from '../../Components/LeaderBoard'
import AvailbleGameCard from '../../Components/AvailableGameCard'

export default function ResultScreen() {

  const renderItem = ({item}) =>{
    console.log("hellooooo")
      return (<>
         <AvailbleGameCard />
      </>)
  }
  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#361911', '#361911', '#6A1700']}
        style={styles.linearGradient}>
        <View style={{ flex: 1.5 }}>
          <View style={styles.leaderBoard}>
            <Text style={styles.leaderTxt}>Leader Board</Text>
            <Iconics name="search-sharp" size={25} color={'white'} />
          </View>
          <View style={{ flex: 1 }}>
            <LeaderBoard />
          </View>
        </View>
        <View style={{ flex: 6}}>
          <FlatList
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}

          />
        </View>
      </LinearGradient>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  linearGradient: {
    flex: 1,
  },
  leaderBoard: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
    padding: wp('4%'),
    justifyContent: 'space-between'
  },
  leaderTxt: {
    color: 'white',
    fontFamily: 'Montserrat-SemiBold',
    fontSize: 20,
    // letterSpacing:hp('0.2%')
  }

})