import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import AvailbleGameCard from '../../Components/AvailableGameCard'
import { useRoute } from '@react-navigation/native'
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry'
import { getGameData } from '../../Service/Home'
import Game from '../../../assets/images/Screens/game1.png'
import { formatDate } from '../../Utilities/utilies'
import { useNavigation } from '@react-navigation/native'


export default function AvailableGame() {
  const navigation = useNavigation()

  const route = useRoute();
  const {gameData} =  route.params
  const myGames = gameData.filter(game => game.status === 3);

  const gradientColors = [
    ['#F38424', '#F7A552', '#F9D479'],
    ['#E3398C', '#CC8FAD'],           
    ['#75B831', '#BAFF74'],  
    ['#0916B9', '#A1A8FF'],         
];

const borderColors = [
  '#F2E30B', 
  '#5C233F', 
  '#78C800', 
  '#1A0DAB',
];

    const renderItem = ({item,index})=>{
      const formattedDate = formatDate(item.start_date);
      const colors = gradientColors[index % gradientColors.length];
      const border = borderColors[index % borderColors.length]; 
        return(<>
         
               <TouchableOpacity style={styles.container1} onPress={()=>{
                navigation.navigate('GameName',{game_id:item._id})
               }} >
                   <LinearGradient
                       colors={colors} 
                       start={{ x: 0, y: 0.5 }}
                       end={{ x: 0.8, y: 1 }}
                       style={[styles.card,{borderColor:border}]}
                   >
                       <View style={styles.content}>
                           <Image
                               source={Game}
                               style={styles.characterImage}
                           />
                           <View style={styles.textContainer}>
                               <Text style={styles.headerText}>
                                   GET ₹{item.enroll_cost} & PLAY NOW
                               </Text>
                               <Text style={styles.description}>
                                   You will get the ₹{item.winning_cost} prize money
                                   enroll yourself before game start
                               </Text>
                               <Text style={styles.startText}>
                                   Start <Text style={styles.dateText}>{formattedDate}</Text>
                               </Text>
                               <View style={styles.buttonContainer}>
                                   <TouchableOpacity style={styles.button}>
                                       <Text style={styles.buttonText}>₹ {item.winning_cost} CASH WIN</Text>
                                   </TouchableOpacity>
                               </View>
                           </View>
                       </View>
                   </LinearGradient>
               </TouchableOpacity>
        </>)
    }
  return (
     <LinearGradient
              colors={['#361911', '#361911', '#6A1700']}
              style={styles.linearGradient}>
                 <CommonHeader title={"Available Games"}/>
                 <View style={styles.container}>
                        <FlatList
                            data={myGames}
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
            marginBottom:30,
          },
          container1: {
            flex: 1,
            paddingLeft: 20,
            marginBottom:20
        },
        card: {
            // backgroundColor: '#F8B600',
            borderRadius: 6,
            // padding: 5,
            width: '95%',
            height: 160,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.3,
            shadowRadius: 5,
            elevation: 5,
            borderWidth: 4,
        },
        content: {
            flexDirection: 'row',
            alignItems: 'center',
            flex: 1,
        },
        characterImage: {
            width: 100,
            height: '120%',
            resizeMode: 'contain',
        },
        textContainer: {
            flex: 1,
            paddingLeft: 10,
            justifyContent: 'space-between',
        },
        headerText: {
            fontSize: 16,
            fontFamily: 'Audiowide-Regular',
            color: '#2A1610',
        },
        description: {
            fontSize: 12,
            color: '#000000',
            marginVertical: 5,
            fontFamily: 'Montserrat-Bold'
        },
        startText: {
            fontSize: 14,
            color: '#FFFFFF',
            fontFamily: 'Audiowide-Regular',
            fontSize: 16
        },
        dateText: {
            color: '#FFFFFF',
            paddingHorizontal: 5,
            borderRadius: 3,
            fontFamily: 'Audiowide-Regular',
            fontSize: 16
        },
        buttonContainer: {
            alignItems: 'flex-start',
            marginTop: 10,
        },
        button: {
            backgroundColor: '#3E2723',
            borderRadius: 8,
            paddingVertical: 10,
            paddingHorizontal: 30,
            alignItems: 'center',
            borderColor: '#F5D236',     
            borderWidth: 2,
        },
        buttonText: {
            fontSize: 18,
            fontFamily: 'Inter_18pt-Bold',
            color: '#FFDC4D',
            letterSpacing: 1,
            textShadowColor: '#F88600',
            textShadowOffset: { width: 0, height: 2 },
            textShadowRadius: 15,
        },
})