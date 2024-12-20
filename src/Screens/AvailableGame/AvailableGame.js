import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AvailbleGameCard from '../../Components/AvailableGameCard'


export default function AvailableGame() {

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
         <AvailbleGameCard/>
         </View>
        </>)
    }
  return (
     <LinearGradient
              colors={['#361911', '#361911', '#6A1700']}
              style={styles.linearGradient}>
                 <CommonHeader title={"Available Games"}/>
                 <View style={styles.container}>
                        <FlatList
                            data={gameData}
                            renderItem={renderItem}
                            keyExtractor={(item, index) => index.toString()}
                            showsVerticalScrollIndicator={false}
                            contentContainerStyle={styles.scrollContainer}
                          />
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
          scrollContainer: {
            marginBottom:20,
          },
})