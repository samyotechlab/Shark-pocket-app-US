import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Win from '../../assets/images/Screens/Rectangle.png';
import Winner from '../../assets/images/Screens/Winner.png';

const GoldenCard = ({item}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#D5B723', '#FDFDFD', '#D5B723']}
        locations={[0, 0.5, 1]} 
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.card}
      >
        <View style={styles.innerCard}>
      
          <Image source={Win}/>
          <Text style={styles.playWin}>PLAY TO WIN</Text>
            <Image source={Winner} style={styles.winnerImage} />
            <Text style={styles.winnerText}>WINNER</Text>
         
          <Text style={styles.amount}>₹{item.game_winning_cost}</Text>
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
  },
  card: {
    width: 180,
    height: 130,
    borderRadius: 20,
    borderColor: '#EFD635',
    borderWidth: 5,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  innerCard: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  winnerImage: {
    marginBottom: 5,
  },
  winnerText: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'light',
    textAlign:'center',
    left:55,
    top:40
  },
  amount: {
    color: '#463614',
    fontSize: 24,
    fontFamily:'Overlock-Bold',
    marginTop: 5,
  },
 
playWin: {
    position: 'absolute',
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'light',
    textAlign: 'center',
    top: 3, 
  }
});

export default GoldenCard;
