import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AvailbleGameCard from './AvailableGameCard'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'

export default function LocalLeaderBoard() {
    const gameData = [
        {
            heading:"GET ₹3000 & PLAY NOW",
            title :"You will get the ₹3000 prize money  enroll yourself before game start",
            date:"Start 30 October",
            rupees:"₹ 3000 CASH WIN"
        },
        {
          heading:"GET ₹3000 & PLAY NOW",
          title :"You will get the ₹3000 prize money  enroll yourself before game start",
          date:"Start 30 October",
          rupees:"₹ 3000 CASH WIN"
      },
      {
        heading:"GET ₹3000 & PLAY NOW",
        title :"You will get the ₹3000 prize money  enroll yourself before game start",
        date:"Start 30 October",
        rupees:"₹ 3000 CASH WIN"
    }
    ]
    const renderItem = ()=>{
        return(<>
        <View style={{flex:1,paddingBottom:wp('4%')}}>
         <AvailbleGameCard />
         </View>
        </>)
    }
  return (
    <View style={styles.container}>
        <FlatList
            data={gameData}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
          />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        marginTop:wp('2%'),
    },
    scrollContainer: {
      marginBottom:20,
    },
})