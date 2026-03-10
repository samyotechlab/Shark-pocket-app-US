import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Platform, useWindowDimensions } from 'react-native';
import Trophy from '../../assets/images/Screens/trophy1.png';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import Button from '../../assets/images/Screens/Button.png';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const Colors = {
  yellow: ['#F38424', '#F7A552', '#F9D479'],
  pink:   ['#E3398C', '#CC8FAD'],
  green:  ['#75B831', '#BAFF74'],
  blue:   ['#0916B9', '#A1A8FF'],
};

const borderColors = {
  yellow: '#F2E30B',
  pink:   '#5C233F',
  green:  '#78C800',
  blue:   '#1A0DAB',
};

const BORDER_WIDTH = 3;

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
    <Image source={Button} style={styles.buttonImage} resizeMode="contain" />
    <Text
      style={styles.heading}
      numberOfLines={2}
      adjustsFontSizeToFit
      minimumFontScale={0.65}
    >
      {title}
    </Text>
  </>
);

const UpcomingGameContent = ({ title, isAlternate }) => (
  <>
    {isAlternate ? (
      <>
        <WinNowText />
        <Text
          style={styles.gainText}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.65}
        >
          {title}
        </Text>
      </>
    ) : (
      <>
        <TrophiesRow />
        <Text
          style={styles.winLabel}
          numberOfLines={2}
          adjustsFontSizeToFit
          minimumFontScale={0.65}
        >
          {title}
        </Text>
      </>
    )}
  </>
);

const GradientCard = ({ children, gameColor, status, isAlternate }) => {
  useWindowDimensions(); 

  const BORDER_RADIUS = wp('5%');
  const INNER_RADIUS  = BORDER_RADIUS - BORDER_WIDTH;
  const cardWidth     = wp('43%');
  const cardHeight    = status === '1' ? hp('12%') : hp('14%');

  const gradientColors =
    status === '1'
      ? Colors[gameColor] || Colors.yellow
      : isAlternate
      ? Colors[gameColor] || Colors.yellow
      : ['#438301', '#438301', '#8BBE56'];

  const activeBorderColor =
    status === '1'
      ? borderColors[gameColor] || '#F2E30B'
      : isAlternate
      ? '#FFF278'
      : '#569218';

  return (
    <View
      style={[
        styles.borderWrapper,
        {
          borderColor:  activeBorderColor,
          borderRadius: BORDER_RADIUS,
          borderWidth:  BORDER_WIDTH,
          width:        cardWidth,
          height:       cardHeight,
        },
      ]}
    >
      <LinearGradient
        colors={gradientColors}
        start={isAlternate ? { x: 0.5, y: 0 } : { x: 0, y: 0.5 }}
        end={isAlternate   ? { x: 0.5, y: 1 } : { x: 0.8, y: 1 }}
        style={[
          styles.innerGradient,
        ]}
      >
        {children}
      </LinearGradient>
    </View>
  );
};

const GameCardContainer = ({ index, item, status }) => {
  const navigation  = useNavigation();
  const isAlternate = index % 2 !== 0;

  const handleNavigation = () => {
    if (status === '1') {
      navigation.navigate('AllGameName', {
        game_id:   item._id,
        title:     item.title,
        game_info: item.game_info,
      });
    } else {
      navigation.navigate('UpcomingGameInfo', {
        game_id:   item._id,
        game_name: item.title,
        game_info: item.game_info,
      });
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleNavigation} activeOpacity={0.85}>
        <GradientCard
          gameColor={item.gameColor}
          status={status}
          isAlternate={isAlternate}
        >
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
    padding: wp('2%'),
  },
  borderWrapper: {
    overflow: 'visible', 
  },
  innerGradient: {
    flex: 1,
    borderRadius: wp('5%') - 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width:      wp('35%'),
    height:     hp('5%'),
    resizeMode: 'contain',
  },
  trophiesRow: {
    flexDirection: 'row',
    alignItems:    'center',
  },
  trophyIcon: {
    width:            wp('7%'),
    height:           wp('7%'),
    marginHorizontal: wp('1.5%'),
    resizeMode:       'contain',
  },
  winText: {
    fontSize:   wp('4.5%'),
    fontWeight: 'bold',
    color:      '#FFD700',
  },
  winLabel: {
    fontSize:   wp('3.5%'),
    fontWeight: 'bold',
    color:      '#FFD700',
    textAlign:  'center',
  },
  winNowText: {
    fontSize:   wp('5%'),
    textAlign:  'center',
    fontFamily: 'PatuaOne-Regular',
  },
  winTextAlt: {
    color: '#FFD700',
  },
  nowTextAlt: {
    color: '#FFFF00',
  },
  gainText: {
    fontSize:   wp('4%'),
    fontWeight: '600',
    color:      '#000',
    marginTop:  hp('1%'),
    textAlign:  'center',
  },
  heading: {
    color:            '#2A1610',
    fontSize:         wp('5%'),
    fontFamily:       'PatuaOne-Regular',
    marginTop:        hp('0.5%'),
    textTransform:    'uppercase',
    textShadowColor:  '#000000',
    textShadowOffset: { width: 1, height: 2 },
    textShadowRadius: 2,
    letterSpacing:    1,
    textAlign:        'center',
  },
});

export default UpcomingGameCard;