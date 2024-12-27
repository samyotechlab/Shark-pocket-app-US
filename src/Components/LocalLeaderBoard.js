import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import AvailbleGameCard from './AvailableGameCard'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { Loader } from './Loader'
import { gameList } from '../Service/Game'

export default function LocalLeaderBoard() {
  const [loader,setLoader] = useState(false)
  const [gameData,setGameData] = useState([])

  const availableGames = async () => {
    setLoader(true)
    try {
      const response = await gameList();
      if (response) {
        console.log('res', response);
        setGameData(response.data);
      } else {
        Toast.error(response.message);
      }
    } catch (error) {
      console.log('error', error);
      Toast.error(error);
    }finally{
      setLoader(false)
    }
  };

  useEffect(()=>{
    availableGames();
  },[])

    // const gameData = [
    //     {
    //         heading:"GET ₹3000 & PLAY NOW",
    //         title :"You will get the ₹3000 prize money  enroll yourself before game start",
    //         date:"Start 30 October",
    //         rupees:"₹ 3000 CASH WIN"
    //     },
    //     {
    //       heading:"GET ₹3000 & PLAY NOW",
    //       title :"You will get the ₹3000 prize money  enroll yourself before game start",
    //       date:"Start 30 October",
    //       rupees:"₹ 3000 CASH WIN"
    //   },
    //   {
    //     heading:"GET ₹3000 & PLAY NOW",
    //     title :"You will get the ₹3000 prize money  enroll yourself before game start",
    //     date:"Start 30 October",
    //     rupees:"₹ 3000 CASH WIN"
    // }
    // ]

    const renderItem = ({item})=>{
        return(<>
        <View style={{flex:1,paddingBottom:wp('4%')}}>
         <AvailbleGameCard gameData={item}/>
         </View>
        </>)
    }
  return (
    <View style={styles.container}>
      {
        !loader?( <FlatList
          data={gameData}
          renderItem={renderItem}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContainer}
        />) :(<Loader/>)
      }
       
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