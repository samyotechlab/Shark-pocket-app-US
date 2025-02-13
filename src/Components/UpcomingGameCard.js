import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Trophy from '../../assets/images/Screens/trophy1.png'
import PlayNow from '../../assets/images/Screens/playNowBtn.png'
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';

const UpcomingGameCard = ({ items ,status}) => {
  console.log("status",status)
  const navigation = useNavigation()
  const { index,item } = items
  const game_color = item.gameColor 
  const Colors = {
    yellow: ['#F38424', '#F7A552', '#F9D479'],
    pink: ['#E3398C', '#CC8FAD'],
    green: ['#75B831', '#BAFF74'],
    blue: ['#0916B9', '#A1A8FF']
  }
  const borderColor = {
    yellow: '#F2E30B',
    pink: "#5C233F",
    green: "#78C800",
    blue: "#1A0DAB"
  }
  const handleNavigation = () => {
    if(status === "1"){
      navigation.navigate('AllGameName', { game_id: item._id,game_name:item.title })
    }else{
      navigation.navigate('UpcomingGameInfo', { game_id: item._id,game_name:item.title })
    }
  }
  return (
    <View style={styles.container}>
      {
        index % 2 == 0 ? (
        <TouchableOpacity onPress={() => {handleNavigation()}}> 
        <LinearGradient
          colors={
            status === "1" ? Colors[game_color] ? Colors[game_color] : ['#F38424', '#F7A552', '#F9D479']: ['#438301', '#438301', '#8BBE56']
          }
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.8, y: 1 }}
          style={
            status === "1" ?  [styles.card,
              { 
                borderColor: borderColor[game_color] ? borderColor[game_color] : "#F2E30B" 
              }] : [styles.card]
           }
        >
          <View style={styles.button}>
            <Image source={PlayNow} />
          </View>
          <View style={styles.trophiesRow}>
            <Image source={Trophy} style={styles.trophyIcon} />
            <Text style={styles.winText}>{status === "1" ? item.title:"WIN"}</Text>
            <Image source={Trophy} style={styles.trophyIcon} />
          </View>
          <Text style={styles.amountText}>₹{item.winning_cost}</Text>
        </LinearGradient>
        </TouchableOpacity> 
        ) : (
        <TouchableOpacity onPress={() => {handleNavigation()}}>
        <LinearGradient
         colors={
          Colors[game_color] ? Colors[game_color] : ['#F38424', '#F7A552', '#F9D479']
        }
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          style={[styles.cardAlt, {borderColor: borderColor[game_color] ? borderColor[game_color] : "#F2E30B" }]}
        >
          <Text style={styles.winNowText}>
            <Text style={styles.winTextAlt}>WIN</Text>
            <Text style={styles.nowTextAlt}> NOW</Text>
          </Text>
          <Text style={styles.gainText}>{status === "1" ? item.title:"Gain"}</Text>
          <Text style={styles.amountTextAlt}>₹{item.winning_cost}</Text>
        </LinearGradient>
        </TouchableOpacity>
        )
      }

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly'
  },
  card: {
    width: 170,
    height: 120,
    // backgroundColor: '#4CAF50',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    borderColor: '#569218',
    borderWidth: 4
  },
  button: {
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  trophiesRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  trophyIcon: {
    width: 30,
    height: 30,
    marginHorizontal: 5,
  },
  winText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFD700',
  },
  amountText: {
    fontSize: 22,
    color: '#FFF',
    fontFamily: 'Overlock-Bold',
  },
  cardAlt: {
    width: 170,
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor: '#FFF278',
    borderWidth: 4
  },
  winNowText: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'PatuaOne-Regular'
  },
  winTextAlt: {
    color: '#FFD700',

  },
  nowTextAlt: {
    color: '#FFFF00',
  },
  gainText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginTop: 10,
  },
  amountTextAlt: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFF',
    marginTop: 10,
  },
});

export default UpcomingGameCard;
