import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Trophy from '../../assets/images/Screens/trophy1.png'
import PlayNow from '../../assets/images/Screens/playNowBtn.png'
import LinearGradient from 'react-native-linear-gradient';

const UpcomingGameCard = () => {
  return (
    <View style={styles.container}>
      {/* First Card */}
      <LinearGradient
           colors={['#438301', '#438301', '#8BBE56']}
           start={{ x: 0.5, y: 0 }}
           end={{ x: 0.5, y: 1 }}
           style={styles.card}
         >
        <TouchableOpacity style={styles.button}>
            <Image source={PlayNow}/>
        </TouchableOpacity>
        <View style={styles.trophiesRow}>
          <Image source={Trophy} style={styles.trophyIcon} />
          <Text style={styles.winText}>WIN</Text>
          <Image source={Trophy} style={styles.trophyIcon} />
        </View>
        <Text style={styles.amountText}>₹7000</Text>
      </LinearGradient>

      {/* Second Card */}
       <LinearGradient
           colors={['#DC5A06', '#FDFDFD', '#DC5A06']}
           locations={[0, 0.5, 1]} 
           start={{ x: 0.5, y: 0 }}
           end={{ x: 0.5, y: 1 }}
           style={styles.cardAlt}
         >
        <Text style={styles.winNowText}>
          <Text style={styles.winTextAlt}>WIN</Text>
          <Text style={styles.nowTextAlt}> NOW</Text>
        </Text>
        <Text style={styles.gainText}>Gain</Text>
        <Text style={styles.amountTextAlt}>₹5000</Text>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'row',
    padding: 10,
    justifyContent:'space-evenly'
  },
  card: {
    width: 170,
    height: 120,
    backgroundColor: '#4CAF50',
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    borderColor:'#569218',
    borderWidth:7
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
    fontFamily:'Overlock-Bold',
  },
  cardAlt: {
    width: 170,
    height: 120,
    backgroundColor: '#F08030',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderColor:'#FFF278',
    borderWidth:7
  },
  winNowText: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily:'PatuaOne-Regular'
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
