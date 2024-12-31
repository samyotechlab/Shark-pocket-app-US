import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React  from 'react'
import LinearGradient from 'react-native-linear-gradient'
import CommonHeader from '../../Components/CommonHeader'
import { widthPercentageToDP as wp , heightPercentageToDP as hp } from 'react-native-responsive-screen'
import { useRoute } from '@react-navigation/native'
import { useNavigation } from '@react-navigation/native'
import AvailableCard from '../../Components/AvailableCard'


export default function AvailableGame() {
  const navigation = useNavigation()

  const route = useRoute();
  const {gameData} =  route.params
  console.log(gameData)
  
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
      const colors = gradientColors[index % gradientColors.length];
      const border = borderColors[index % borderColors.length]; 
        return(<>
         
               <TouchableOpacity style={styles.container1} onPress={()=>{
                navigation.navigate('GameName',{game_id:item._id})
               }} >
                   <AvailableCard gameData={item} status={"2"} index={index}/>
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
    container: {
        flex: 1,
        marginTop: hp('5%')
    },
    scrollContainer: {
        marginBottom: hp('5%'),
    },
    container1: {
        flex: 1,
        paddingLeft: wp('5%'),
        marginBottom: hp('2%')
    }
})
