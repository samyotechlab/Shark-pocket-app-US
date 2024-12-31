import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Button from '../../assets/images/Screens/Button.png'


const PinkPrizeCard = ({item}) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#F387B8', '#601339']}
        style={styles.borderContainer}
      >
    
        <LinearGradient
          colors={['#E3398C', '#E77DB2', '#FFFFFF', '#E77DB2', '#E3398C']}
          locations={[0, 0.25, 0.5, 0.75, 1]} 
          start={{ x: 0, y: 0.5 }} 
          end={{ x: 1, y: 0.5 }}  
          style={styles.card}
        >
          <LinearGradient
            colors={['#601339', '#3A1D31']}
            style={styles.button}
          >
          <Image source={Button}/>
          </LinearGradient>

          {/* Card Text */}
          <Text style={styles.heading}>WIN YOUR PRIZE</Text>
          <Text style={styles.amount}>₹{item.game_winning_cost}</Text>
        </LinearGradient>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingLeft:10
  },
  borderContainer: {
    borderRadius: 25,
    padding: 6,
  },
  card: {
    width: 170,
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 8,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 18,
  },
  heading: {
    color: '#5F1137',
    fontSize: 18,
    fontFamily:'PatuaOne-Regular',
    marginTop: 10,
    textTransform: 'uppercase',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 5,
    letterSpacing:1
  },
  amount: {
    color: '#60123A',
    fontSize: 24,
    fontFamily:'Overlock-Bold',
    marginTop: 5,
  },
});

export default PinkPrizeCard;


