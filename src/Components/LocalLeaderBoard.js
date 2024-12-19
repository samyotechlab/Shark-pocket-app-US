import { FlatList, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import AvailbleGameCard from './AvailableGameCard'

export default function LocalLeaderBoard() {
    const gameData = [
        {
            heading:"GET ₹3000 & PLAY NOW",
            title :"You will get the ₹3000 prize money  enroll yourself before game start",
            date:"Start 30 October",
            rupees:"₹ 3000 CASH WIN"
        }
    ]
    const renderItem = ()=>{
        return(<>
         <AvailbleGameCard/>
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
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          />
    </View>
  )
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:'white'
    }
})