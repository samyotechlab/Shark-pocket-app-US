import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import WinnerBadge from '../../assets/images/Screens/WinnerBadge.png'
import Trophy from '../../assets/images/Screens/trophy.png'
import User from '../../assets/images/Screens/user.png'
const WinnerCard = () => {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={User}
          style={styles.profileImage}
        />
        <View style={styles.content}>
          <View style={styles.winnerBadgeContainer}>
            <Image
                       source={WinnerBadge}
              style={styles.winnerBadge}
            />
          </View>
          <View style={styles.rankScoreContainer}>
            <Text style={styles.rankText}>1st Winner</Text>
            <Text style={styles.scoreText}>Score : 700</Text>
          </View>
          <View style={styles.rewardContainer}>
            <Image
          source={Trophy}
          style={styles.trophyIcon}
            />
            <Text style={styles.rewardText}>₹10,000</Text>
          </View>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  card: {
    backgroundColor: '#62C72A',
    borderRadius: 10,
    borderWidth: 5,
    borderColor: '#A6E832',
    width: '95%',
    height: 180,
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 10,
  },
  profileImage: {
    width:140, 
    height: 250,
    resizeMode: 'cover',
  },
  content: {
    flex: 1,
    justifyContent: 'space-evenly',
  },
  winnerBadgeContainer: {
    alignItems: 'center',
  },
  winnerBadge: {
    width: 200,
    height: 100,
    resizeMode: 'cover',
  },
  rankScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    marginBottom:10
  },
  rankText: {
    fontSize: 16,
    fontFamily:'Montserrat-SemiBold',
    color: '#48180B',
  },
  scoreText: {
    fontSize: 16,
    color: '#48180B',
    fontFamily:'Montserrat-SemiBold',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  marginBottom:10
  },
  trophyIcon: {
    width: 30,
    height: 30,
    marginRight: 5,
  },
  rewardText: {
    fontSize: 16,
    fontFamily:'Montserrat-Bold',
    color: '#48180B',
  },
});
export default WinnerCard;