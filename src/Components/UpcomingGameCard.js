import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import Trophy from '../../assets/images/Screens/trophy1.png';
import PlayNow from '../../assets/images/Screens/playNowBtn.png';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Button from '../../assets/images/Screens/Button.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Colors = {
  yellow: ['#F38424', '#F7A552', '#F9D479'],
  pink: ['#E3398C', '#CC8FAD'],
  green: ['#75B831', '#BAFF74'],
  blue: ['#0916B9', '#A1A8FF'],
};

const borderColor = {
  yellow: '#F2E30B',
  pink: '#5C233F',
  green: '#78C800',
  blue: '#1A0DAB',
};

const TrophiesRow = () => (
  <View style={styles.trophiesRow}>
    <Image source={Trophy} style={styles.trophyIcon} />
    <Text style={styles.winText}>WIN</Text>
    <Image source={Trophy} style={styles.trophyIcon} />
  </View>
);

const WinNowText = () => (
  <Text style={styles.winNowText}>
    <Text style={styles.winTextAlt}>WIN</Text>
    <Text style={styles.nowTextAlt}> NOW</Text>
  </Text>
);

const ActiveGameContent = ({ title }) => (
  <>
    <View style={styles.button}>
      <Image source={Button} />
    </View>
    <View style={styles.trophiesRow}>
      <Text style={styles.heading}>{title}</Text>
    </View>
  </>
);

const UpcomingGameContent = ({ title, isAlternate }) => (
  <>
    {isAlternate ? (
      <>
        <WinNowText />
        <Text style={styles.gainText}>{title}</Text>
      </>
    ) : (
      <>
        <TrophiesRow />
        <Text style={styles.winText}>{title}</Text>
      </>
    )}
  </>
);

const GradientCard = ({ children, gameColor, status, isAlternate }) => (
  <LinearGradient
    colors={
      status === '1'
        ? Colors[gameColor] || ['#F38424', '#F7A552', '#F9D479']
        : isAlternate
        ? Colors[gameColor] || ['#F38424', '#F7A552', '#F9D479']
        : ['#438301', '#438301', '#8BBE56']
    }
    start={isAlternate ? { x: 0.5, y: 0 } : { x: 0, y: 0.5 }}
    end={isAlternate ? { x: 0.5, y: 1 } : { x: 0.8, y: 1 }}
    style={[
      status === '1' ? styles.card1 : isAlternate ? styles.cardAlt : styles.card,
      {
        borderColor:
          status === '1'
            ? borderColor[gameColor] || '#F2E30B'
            : isAlternate
            ? '#FFF278'
            : '#569218',
      },
    ]}
  >
    {children}
  </LinearGradient>
);

const GameCardContainer = ({ index, item, status }) => {
  const navigation = useNavigation();
  const isAlternate = index % 2 !== 0;

  const handleNavigation = () => {
    if (status === '1') {
      navigation.navigate('AllGameName', {
        game_id: item._id,
        title: item.title,
        game_info: item.game_info,
      });
    } else {
      console.log('Upcoming Game');
      navigation.navigate('UpcomingGameInfo', {
        game_id: item._id,
        game_name: item.title,
        game_info: item.game_info,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigation}>
        <GradientCard gameColor={item.gameColor} status={status} isAlternate={isAlternate}>
          {status === '1' ? (
            <ActiveGameContent title={item.title} />
          ) : (
            <UpcomingGameContent title={item.title} isAlternate={isAlternate} />
          )}
        </GradientCard>
      </TouchableOpacity>
    </View>
  );
};

const UpcomingGameCard = ({ items, status }) => {
  const { index, item } = items;
  return <GameCardContainer index={index} item={item} status={status} />;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'space-evenly',
  },
  card: {
    width: 170,
    height: 120,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    borderWidth: 4,
  },
  card1: {
    width: 170,
    height: 100,
    borderRadius: 20,
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: 10,
    borderWidth: 4,
  },
  cardAlt: {
    width: 170,
    height: 120,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderWidth: 4,
  },
  button: {
    paddingHorizontal: 20,
    borderRadius: 10,
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
  winNowText: {
    fontSize: 24,
    textAlign: 'center',
    fontFamily: 'PatuaOne-Regular',
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
  heading: {
    color: '#2A1610',
    fontSize: hp('2%'),
    fontFamily: 'PatuaOne-Regular',
    marginTop: hp('1%'),
    textTransform: 'uppercase',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
    letterSpacing: 1,
  },
});

export default UpcomingGameCard;