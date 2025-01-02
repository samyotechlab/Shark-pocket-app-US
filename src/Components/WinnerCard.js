import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import WinnerBadge from '../../assets/images/Screens/WinnerBadge.png'
import Trophy from '../../assets/images/Screens/trophy.png'
import User from '../../assets/images/Screens/user.png'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
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
        <View style={styles.linesContainer}>
          <View style={styles.line} />
          <View style={[styles.line, styles.secondLine]} />
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
    backgroundColor: '#CDFA2E',
    borderRadius: wp(3), 
    borderBottomWidth: wp(1.3),
    borderBottomColor: '#3DA600',
    margin: wp(1.5), 
  },
  card: {
    backgroundColor: '#69C60A',
    borderRadius: wp(2.5), 
    width: wp(90),
    height: hp(22), 
    flexDirection: 'row',
    overflow: 'hidden',
    elevation: 10,
    margin: wp(1.5),
  },
  profileImage: {
    width: wp(35),
    height: hp(30), 
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
    width: wp(50),
    height: hp(12),
    resizeMode: 'cover',
  },
  rankScoreContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: wp(5),
    marginBottom: hp(1.2),
  },
  rankText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-SemiBold',
    color: '#48180B',
  },
  scoreText: {
    fontSize: wp(4),
    color: '#48180B',
    fontFamily: 'Montserrat-SemiBold',
  },
  rewardContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: hp(1.2),
  },
  trophyIcon: {
    width: wp(8),
    height: wp(8),
    marginRight: wp(1.2),
  },
  rewardText: {
    fontSize: wp(4),
    fontFamily: 'Montserrat-Bold',
    color: '#48180B',
  },
  linesContainer: {
    position: 'absolute',
    right: 15,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
    flexDirection: 'row',
    gap : wp(1.5),
   },
  line: {
    width: wp(3), 
    height: '100%',
    backgroundColor: '#FFFFFF33', 
    marginVertical: hp(0.5),
    alignSelf: 'center',
  },
  secondLine: {
    marginTop: hp(1),
  },
});
export default WinnerCard;