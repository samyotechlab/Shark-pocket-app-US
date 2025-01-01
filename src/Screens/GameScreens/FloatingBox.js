import React, {useState, useEffect, useRef} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Image,
  ImageBackground,
} from 'react-native';
import Coin from '../../../assets/images/Screens/CoinStack.png';
import Iconicons from 'react-native-vector-icons/Entypo';
import StarImage from '../../../assets/images/GameImage/star.png';
import BombImage from '../../../assets/images/GameImage/smash-icon.png';
import Speaker from '../../../assets/images/Screens/speaker.png';
import Sound from 'react-native-sound';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import {useGameLogic} from './GameLogic';
import GameFinishScreen from './GameFinishScreen';
import LinearGradient from 'react-native-linear-gradient';
import {finalScore} from '../../Service/Game';
import blurImage from '../../../assets/images/SVG/ellipse-blur.png';
import {BoxShadow} from 'react-native-shadow';
import AlertDialogGreen from '../../Components/AlertDialogGreen';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

const {width, height} = Dimensions.get('window');

const getRandomNumber = () => Math.floor(Math.random() * 300) + 1;

const getRandomX = () => Math.random() * (width - 100);

export default function FloatingBoxGame() {
  const {
    handleNumberClick,
    primeCount,
    oddCounts,
    superNumberCount,
    negativePoint,
    numberStringData,
  } = useGameLogic();
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [isGameOver, setIsGameOver] = useState(false);
  const [floatingBoxes, setFloatingBoxes] = useState([]);
  const [isMusicPlaying, setIsMusicPlaying] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [generatedBoxes, setGeneratedBoxes] = useState(0);
  const [scoreData, setScoreData] = useState(null);
  const route = useRoute();
  // console.log('floatinfgggggg',route.params);
  const routeData = route.params;

  const soundRef = useRef(null);
  const navigation = useNavigation();
  const superNumber = route.params.selectedNumber || 5;

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prevTime => prevTime + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    Sound.setCategory('Playback');

    soundRef.current = new Sound('sound.mp3', Sound.MAIN_BUNDLE, error => {
      if (error) {
        console.log('Failed to load the sound', error);
        return;
      }

      soundRef.current.setNumberOfLoops(-1);
    });

    return () => {
      soundRef.current?.release();
    };
  }, []);

  useEffect(() => {
    if (isGameOver) {
      soundRef.current?.stop();
    } else if (isMusicPlaying) {
      soundRef.current?.play();
    }

    return () => {
      soundRef.current?.stop();
    };
  }, [isGameOver, isMusicPlaying]);

  useEffect(() => {
    toggleMusic();
  }, []);

  const toggleMusic = () => {
    if (isGameOver) return;

    if (isMusicPlaying) {
      soundRef.current?.stop();
    } else {
      soundRef.current?.play();
    }
    setIsMusicPlaying(!isMusicPlaying);
  };

  useEffect(() => {
    if (!isGameOver) {
      const interval = setInterval(() => {
        if (floatingBoxes.length >= 7) {
          return;
        }

        if (generatedBoxes >= 300) {
          clearInterval(interval);
          handleCallApi();
          return () => clearInterval(interval);
        }
        const startY = height;
        const animatedY = new Animated.Value(startY);
        const opacityAnim = new Animated.Value(0);
        const scaleAnim = new Animated.Value(1);

        const xPosition = getRandomX();
        const alternateXPosition = getRandomX();
        const zigzagX = Math.random() < 0.5 ? xPosition : alternateXPosition;

        const newBox = {
          id: Math.random(),
          number: getRandomNumber(),
          x: new Animated.Value(zigzagX),
          y: animatedY,
          shakeAnimation: new Animated.Value(0),
          opacityAnim: opacityAnim,
          scaleAnim: scaleAnim,
          feedbackColor: null,
          feedbackImage: null,
          actionType: null,
          canClick: true,
        };

        if (soundRef.current && !isGameOver) {
          soundRef.current.play(success => {
            if (!success) {
              console.log('Sound playback failed');
            }
          });
        }

        Animated.timing(newBox.y, {
          toValue: -300,
          duration: 2400,
          useNativeDriver: true,
        }).start(() => {
          setFloatingBoxes(prev => prev.filter(box => box.id !== newBox.id));
        });

        setGeneratedBoxes(prev => prev + 1);

        setFloatingBoxes(prev => [...prev, newBox]);
      }, 300);

      return () => clearInterval(interval);
    }
  }, [isGameOver, floatingBoxes.length, generatedBoxes]);

  const handleBoxClick = box => {
    if (!box.canClick || box.feedbackColor) return;

    const points = handleNumberClick(box.number);

    setScore(points);

    const isOdd = box.number % 2 !== 0;
    const feedbackColor = isOdd ? '#569218' : '#921818';
    const feedbackImage = isOdd ? StarImage : BombImage;
    const feedbackBgColor = isOdd
      ? ['#438301', '#84CB3C', '#438301']
      : ['#830101', '#BF7474', '#830101'];

    const feedbackBorderColor = isOdd ? '#569218' : '#921818';
    const textColor = 'white';
    const actionType = isOdd ? 'success' : 'failure';

    Animated.parallel([
      Animated.timing(box.opacityAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(box.scaleAnim, {
        toValue: 2,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    setTimeout(() => {
      Animated.parallel([
        Animated.timing(box.opacityAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(box.scaleAnim, {
          toValue: 1,
          duration: 100,
          useNativeDriver: true,
        }),
      ]).start();
    }, 300);

    // Existing shake animation
    Animated.sequence([
      Animated.timing(box.shakeAnimation, {
        toValue: 1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(box.shakeAnimation, {
        toValue: -1,
        duration: 50,
        useNativeDriver: true,
      }),
      Animated.timing(box.shakeAnimation, {
        toValue: 0,
        duration: 50,
        useNativeDriver: true,
      }),
    ]).start();

    setFloatingBoxes(prev =>
      prev.map(item =>
        item.id === box.id
          ? {
              ...item,
              feedbackColor: feedbackColor,
              feedbackImage: feedbackImage,
              textColor: textColor,
              feedbackBgColor: feedbackBgColor,
              feedbackBorderColor: feedbackBorderColor,
              canClick: false,
              actionType: actionType,
            }
          : item,
      ),
    );
  };

  const handleCallApi = async () => {
    try {
      const defaultNumberStringData =
        numberStringData.trim() === '' ? '0' : numberStringData;

      const response = await finalScore(
        defaultNumberStringData,
        superNumber,
        routeData.game_id,
        routeData.ticket_id,
        routeData.user_id,
      );
      if (response) {
        setScoreData(response.data);
        setIsGameOver(true);
      }
    } catch (error) {
      console.log('error--------------->>>>>>>', error);
    }
  };

  const closeModal = () => {
    setIsGameOver(false);
  };

  const handleNavigate = () => {
    setIsGameOver(false);
    navigation.navigate('Home');
  };

  const getShadowOpt = type => {
    const shadowColors = {
      default: '#7C7FDF',
      success: '#569218',
      warning: '#FFC107',
      failure: '#921818',
    };

    const color = shadowColors[type] || shadowColors.default;

    return {
      width: widthPercentageToDP(23),
      height: heightPercentageToDP(12),
      color: color,
      border: 12,
      radius: 15,
      opacity: 0.7,
      x: 2,
      y: 2,
      style: {marginVertical: 5},
    };
  };
  return (
    <ImageBackground
      source={require('../../../assets/images/Screens/background-image.png')}
      style={styles.background}>
      <View style={styles.container}>
        <AlertDialogGreen
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          onOkPress={() => {
            handleNavigate();
          }}
          message={'Are you sure you want to Quit game?'}
        />

        {isGameOver ? (
          <GameFinishScreen
            isVisible={isGameOver}
            onClose={closeModal}
            gameHistoryData={scoreData}
            // gameHistoryData={{
            //   bonus_point_score: {bonusPoints: 10, superPoints: 20},
            //   double_digit: {
            //     assignedScore: 2,
            //     score: oddCounts.two * 2,
            //     selected: oddCounts.two,
            //   },
            //   prime_number: {
            //     assignedScore: 10,
            //     score: primeCount * 10,
            //     selected: primeCount,
            //   },
            //   quadruple_digit: {
            //     assignedScore: 4,
            //     score: oddCounts.three * 4,
            //     selected: oddCounts.four,
            //   },
            //   score: score,
            //   super_number: {
            //     assignedScore: 5,
            //     score: 5 * superNumberCount,
            //     selected: superNumberCount,
            //   },
            //   triple_digit: {
            //     assignedScore: 3,
            //     score: oddCounts.three * 3,
            //     selected: oddCounts.three,
            //   },
            //   wrong_selection_score: negativePoint,
            // }}
          />
        ) : (
          <>
            <View style={styles.header}>
              <View style={styles.timerContainer}>
                {/* <Image source={ClockImage} style={styles.clockImage} /> */}
                <Text style={styles.timerText}>
                  {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}
                  {timeLeft % 60}
                </Text>
              </View>
              <LinearGradient
                colors={['#00E000', '#00B300', '#00B300']}
                start={{x: 0, y: 0.5}}
                end={{x: 1, y: 0.5}}
                style={{
                  flexDirection: 'row',
                  paddingVertical: widthPercentageToDP('1.5%'),
                  paddingHorizontal: widthPercentageToDP('5%'),
                  borderRadius: 10,
                }}>
                <Image source={Coin} />
                <Text style={styles.score}>{score}</Text>
              </LinearGradient>
              <View
                style={{
                  flexDirection: 'row',
                  zIndex: 9999,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  fontSize: 20,
                }}>
                <View style={styles.magicNumberContainer}>
                  <Text style={styles.magicNumberText}>{superNumber}</Text>
                </View>

                <TouchableOpacity onPress={toggleMusic} style={{marginLeft: 5}}>
                  <Image
                    source={Speaker}
                    style={{
                      width: 30,
                      height: 30,
                    }}
                    // tintColor={'white'}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible(true);
                  }}>
                  <Iconicons name={'cross'} size={50} color={'red'} />
                </TouchableOpacity>
              </View>
            </View>

            {/* Game Area */}
            <View style={styles.gameArea}>
              {floatingBoxes.map(box => (
                <Animated.View
                  key={box.id}
                  style={[
                    styles.floatingBox,
                    {
                      transform: [
                        {translateX: box.x},
                        {translateY: box.y},
                        {
                          rotate: box.shakeAnimation.interpolate({
                            inputRange: [-1, 1],
                            outputRange: ['-10deg', '10deg'],
                          }),
                        },
                      ],
                      backgroundColor: box.feedbackBgColor,
                      // borderColor: box.feedbackBorderColor,
                      // borderWidth: box.feedbackColor === 'transparent' ? 5 : 1,
                      color: box.textColor,
                      borderRadius: 10,
                    },
                  ]}>
                  <TouchableWithoutFeedback onPress={() => handleBoxClick(box)}>
                    <View style={styles.boxButton}>
                      {box.feedbackImage ? (
                        <BoxShadow setting={getShadowOpt(box.actionType)}>
                          <LinearGradient
                            colors={box.feedbackBgColor}
                            style={[
                              styles.feedbackBoxwrapper,
                              {
                                backgroundColor: box.feedbackColor,
                                borderWidth: 3,
                                borderColor: box.feedbackBorderColor,
                              },
                            ]}>
                            <Animated.Image
                              source={box.feedbackImage}
                              style={[
                                styles.feedbackImage,
                                {
                                  transform: [{scale: box.scaleAnim}],
                                  opacity: box.opacityAnim,
                                },
                              ]}
                            />

                            <Text style={styles.boxText2}>{box.number}</Text>
                          </LinearGradient>
                        </BoxShadow>
                      ) : (
                        <BoxShadow setting={getShadowOpt('default')}>
                          <LinearGradient
                            colors={['#7F71BF', '#A4E2F2']}
                            style={styles.gradientBorder}>
                            <View style={styles.numberBox}>
                              <Image
                                source={blurImage}
                                style={styles.blurContainer}
                              />
                              <Text style={styles.boxText}>{box.number}</Text>
                            </View>
                          </LinearGradient>
                        </BoxShadow>
                      )}
                    </View>
                  </TouchableWithoutFeedback>
                </Animated.View>
              ))}
            </View>
          </>
        )}
      </View>
    </ImageBackground>
  );
}

// Styles
const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
  },
  container: {
    flex: 1,
  },
  magicNumberContainer: {
    backgroundColor: '#D5B723',
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#EFD635',
    borderWidth: 2,
    paddingVertical: 4,
    paddingHorizontal: 8,
    marginRight: 5,
  },
  magicNumberText: {
    fontSize: 22,
    color: 'white',
    fontFamily: 'LilitaOne-Regular',
  },
  header: {
    height: 80,
    width: '100%',
    backgroundColor: 'transparent',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    zIndex: 9999,
    marginTop: 10,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockImage: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  timerText: {
    fontSize: 25,
    color: '#FFFFFFCC',
    fontFamily: 'LilitaOne-Regular',
  },
  score: {
    color: '#FFFFFF',
    fontSize: 26,
    fontFamily: 'LilitaOne-Regular',
  },
  gameArea: {
    flex: 1,
    overflow: 'hidden',
    position: 'relative',
  },
  floatingBox: {
    position: 'absolute',
    width: 80,
    height: 80,
  },
  boxButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
  },
  gradientBorder: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(22) + 5,
    height: heightPercentageToDP(12) + 3,
  },
  numberBox: {
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#0916B9',
    width: widthPercentageToDP(21),
    height: heightPercentageToDP(11),
    position: 'relative',
  },
  boxText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 30,
    zIndex: 1,
  },

  blurContainer: {
    position: 'absolute',
    width: 140,
    height: 140,
    borderRadius: 25,
    overflow: 'hidden',
    alignSelf: 'center',
    opacity: 0.9,
  },

  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  gameOverText: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  finalScore: {
    color: 'white',
    fontSize: 24,
    marginBottom: 30,
  },
  restartButton: {
    backgroundColor: '#2ECC71',
    paddingHorizontal: 40,
    paddingVertical: 15,
    borderRadius: 10,
  },
  restartText: {
    color: 'white',
    fontSize: 20,
    fontWeight: 'bold',
  },

  feedbackBoxwrapper: {
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    width: widthPercentageToDP(22) + 5,
    height: heightPercentageToDP(12) + 3,
  },
  feedbackImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 99999,
    top: 0,
  },

  boxText2: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 32,
    position: 'relative',
    zIndex: 1,
  },
});
