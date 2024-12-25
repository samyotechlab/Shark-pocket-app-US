import React, { useState, useEffect, useRef } from 'react';
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
import ClockImage from '../../../assets/images/GameImage/clock-image.png';
import LogoutIcon from '../../../assets/images/GameImage/logoutM.png';
import Icon from 'react-native-vector-icons/Feather';
import StarImage from '../../../assets/images/GameImage/star.png';
import BombImage from '../../../assets/images/GameImage/smash-icon.png';
import Sound from 'react-native-sound';
import { useNavigation, useRoute } from '@react-navigation/native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import { useGameLogic } from './GameLogic';
import GameFinishScreen from './GameFinishScreen';
import { finalScore } from '../../Service/FinalScore';
import LinearGradient from 'react-native-linear-gradient';

const { width, height } = Dimensions.get('window');

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
  const [isModalVisible2, setIsModalVisible2] = useState(false);
  const [generatedBoxes, setGeneratedBoxes] = useState(0);
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

      const duration = soundRef.current.getDuration();

      soundRef.current.setNumberOfLoops(-1);

      soundRef.current.play();
    });

    return () => {
      soundRef.current?.release();
    };
  }, []);

  useEffect(() => {
    toggleMusic();
  }, []);

  const toggleMusic = () => {
    if (isMusicPlaying) {
      soundRef.current.stop();
    } else {
      soundRef.current.play();
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
          setIsGameOver(true);
          return () => clearInterval(interval);
        }
        const startY = height;
        const animatedY = new Animated.Value(startY);
        const opacityAnim = new Animated.Value(0); // Opacity for fade-in/fade-out
        const scaleAnim = new Animated.Value(1); // Scale for zoom-in/zoom-out

        const xPosition = getRandomX();
        const alternateXPosition = getRandomX();
        const zigzagX = Math.random() < 0.5 ? xPosition : alternateXPosition;

        const newBox = {
          id: Math.random(),
          number: getRandomNumber(),
          x: new Animated.Value(zigzagX),
          y: animatedY,
          shakeAnimation: new Animated.Value(0),
          opacityAnim: opacityAnim, // Add opacity animation here
          scaleAnim: scaleAnim, // Add scale animation here
          feedbackColor: null,
          feedbackImage: null, // Holds the star or bomb image
          canClick: true,
        };

        Animated.timing(newBox.y, {
          toValue: -100,
          duration: 3000, // Adjusted for medium scroll speed
          useNativeDriver: true,
        }).start(() => {
          setFloatingBoxes(prev => prev.filter(box => box.id !== newBox.id));
        });

        setGeneratedBoxes(prev => prev + 1);

        setFloatingBoxes(prev => [...prev, newBox]);
      }, 300); // Reduced interval for faster number generation

      return () => clearInterval(interval);
    }
  }, [isGameOver, floatingBoxes.length, generatedBoxes]);

  const handleBoxClick = box => {
    if (!box.canClick || box.feedbackColor) return;

    const points = handleNumberClick(box.number);

    setScore(points);

    const isOdd = box.number % 2 !== 0;
    const feedbackColor = isOdd ? '#6AB365' : "#D28989";
    const feedbackImage = isOdd ? StarImage : BombImage;
    const feedbackBgColor = isOdd ? ['#438301','#84CB3C','#438301'] : ['#830101','#BF7474','#830101'];


    const feedbackBorderColor = isOdd ? '#569218' : "#921818";
    const textColor = 'white';

    Animated.parallel([
      Animated.timing(box.opacityAnim, {
        toValue: 1, // Fade-in to opacity 1
        duration: 100, // Reduced duration (from 300ms to 150ms)
        useNativeDriver: true,
      }),
      Animated.timing(box.scaleAnim, {
        toValue: 2,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start();

    // Apply faster zoom-out and fade-out after a delay
    setTimeout(() => {
      Animated.parallel([
        Animated.timing(box.opacityAnim, {
          toValue: 0, // Fade-out to opacity 0
          duration: 100, // Reduced duration (from 300ms to 150ms)
          useNativeDriver: true,
        }),
        Animated.timing(box.scaleAnim, {
          toValue: 1, // Zoom-out to original size
          duration: 100, // Reduced duration (from 300ms to 150ms)
          useNativeDriver: true,
        }),
      ]).start();
    }, 300); // Delay before fade-out and zoom-out (500ms or less to speed up)

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
          }
          : item,
      ),
    );
  };

  const handleCallApi = async () => {
    console.log("hello")
    // try {
    //   const response = await finalScore(
    //     numberStringData,
    //     superNumber,
    //     routeData.game_id,
    //     routeData.ticket_id,
    //     routeData.user_id,
    //   );
    //   console.log('i want response hereeeeee', response);
    // } catch (error) {
    //   console.log('error--------------->>>>>>>', error);
    // }
  };

  const handleOnYes = () => {
    navigation.goBack();
  };

  useEffect(() => {
    if (isGameOver) {
      handleCallApi();
    }
  }, [isGameOver]);

  return (
    <ImageBackground
      source={require("../../../assets/images/Screens/background-image.png")}
      style={styles.background}
    >
      <View style={styles.container}>
        {/* Header */}

        {/* <ConfirmationModal
        visible={isModalVisible2}
        onClose={() => setIsModalVisible2(false)}
        onYes={handleOnYes}
        title="Are you sure you want to Quit game?"
        //  closeTitle="No"
        //  heading="Confirmation"
      /> */}

        {isGameOver ? (
          <GameFinishScreen
            gameHistoryData={{
              bonus_point_score: { bonusPoints: 10, superPoints: 20 },
              double_digit: {
                assignedScore: 2,
                score: oddCounts.two * 2,
                selected: oddCounts.two,
              },
              prime_number: {
                assignedScore: 10,
                score: primeCount * 10,
                selected: primeCount,
              },
              quadruple_digit: {
                assignedScore: 4,
                score: oddCounts.three * 4,
                selected: oddCounts.four,
              },
              score: score,
              super_number: {
                assignedScore: 5, 
                score: 5 * superNumberCount, 
                selected: superNumberCount,
              },
              triple_digit: {
                assignedScore: 3,
                score: oddCounts.three * 3,
                selected: oddCounts.three,
              },
              wrong_selection_score: negativePoint,
            }} />
        ) : (
          <>
            <View style={styles.header}>
              <View style={styles.timerContainer}>
                <Image source={ClockImage} style={styles.clockImage} />
                <Text style={styles.timerText}>
                  {Math.floor(timeLeft / 60)}:{timeLeft % 60 < 10 ? '0' : ''}
                  {timeLeft % 60}
                </Text>
              </View>
              <View>
                <Text style={styles.score}>{score}</Text>
              </View>
              <View
                style={{
                  fontSize: 20,
                  position: 'relative',
                  zIndex: 9999,
                  flexDirection: 'row',
                  gap: 10,
                }}>
                <View
                  style={{
                    backgroundColor: isMusicPlaying ? '#ff5722' : 'grey',
                    borderRadius: 20,
                    justifyContent: 'center',
                    alignItems: 'center',
                    padding: 7,
                    elevation: 5,
                    alignContent: 'center',
                  }}>
                  <Icon
                    name={isMusicPlaying ? 'volume-1' : 'volume-x'}
                    size={25}
                    color={'white'}
                    onPress={toggleMusic}
                  />
                </View>
                <TouchableOpacity
                  onPress={() => {
                    setIsModalVisible2(true);
                  }}
                  style={{
                    backgroundColor: '#ff5722',
                    borderRadius: 20,
                    padding: 7,
                    justifyContent: 'center',
                    alignItems: 'center',
                    elevation: 5,
                    alignContent: 'center',
                  }}>
                  <Image
                    source={LogoutIcon}
                    style={{ width: 25, height: 25, alignSelf: 'center' }}
                    tintColor={'white'}
                  />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.magicNumberContainer}>
              <Text style={styles.magicNumberText}>{superNumber}</Text>
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
                        { translateX: box.x },
                        { translateY: box.y },
                        {
                          rotate: box.shakeAnimation.interpolate({
                            inputRange: [-1, 1],
                            outputRange: ['-10deg', '10deg'],
                          }),
                        },
                      ],
                      backgroundColor: box.feedbackBgColor,
                      borderColor: box.feedbackBorderColor,
                      borderWidth: box.feedbackColor === 'transparent' ? 5 : 1,
                      color: box.textColor,
                      borderRadius: 10,
                    },
                  ]}>
                  <TouchableOpacity
                    onPress={() => handleBoxClick(box)}
                    style={styles.boxButton}>
                        <LinearGradient
                      colors={['#0916B9', '#7F71BF', '#0916B9']}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={styles.gradientBorder}>
                    <LinearGradient colors={['#0916B9', '#7F71BF','#0916B9']}
                                   start={{ x: 1, y: 0}}
                                   end={{ x: 1, y: 1 }} 
                      style={[
                        styles.numberBox,
                        box.feedbackColor && styles.highlighedtBox,
                      ]}>
                      {box.feedbackImage ? (
                        <View
                          style={[
                            styles.feedbackBoxwrapper,
                            {
                              backgroundColor:
                                box.feedbackColor === 'black'
                                  ? 'transparent'
                                  : 'white',
                              borderWidth: box.feedbackColor === 'black' ? 0 : 5,
                            },
                          ]}>
                          <Animated.Image
                            source={box.feedbackImage}
                            style={[
                              styles.feedbackImage,
                              {
                                transform: [{ scale: box.scaleAnim }],
                                opacity: box.opacityAnim,
                              },
                            ]}
                          />
                          <Text
                            style={[
                              styles.boxText2,
                              {
                                color:
                                  box.feedbackColor === 'black'
                                    ? 'white'
                                    : '#ff5722',
                              },
                            ]}>
                            {box.number}
                          </Text>
                        </View>
                      ) : (
                        <Text style={styles.boxText}>{box.number}</Text>
                      )}
                    </LinearGradient>
                    </LinearGradient>
                  </TouchableOpacity>
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
    position: 'absolute',
    left: 0,
    top: 70,
    left: 20,
    backgroundColor: "#7C7FDF",
    zIndex: 9999,
    height: 45,
    width: 45,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  magicNumberText: {
    fontSize: 20,
    color: 'white',
    fontWeight: '700',
  },
  header: {
    height: 80,
    width: '100%',
    backgroundColor: 'none',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'absolute',
    zIndex: 9999,
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
    fontSize: 20,
    color: 'black',
    fontWeight: '700',
  },
  score: {
    color: 'black',
    fontSize: 24,
    fontWeight: '700',
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
    backgroundColor: 'red'
  },
  gradientBorder: {
    width: widthPercentageToDP(21) + 6, 
    height: heightPercentageToDP(11) + 6, 
    borderRadius: 14, 
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#7C7FDF',
    shadowOffset: { width: 3, height: 2 },
    shadowOpacity: 1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  numberBox: {
    width: widthPercentageToDP(21),
    height: heightPercentageToDP(11),
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  boxText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 24,
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
    // borderWidth: 5,
    borderColor: '#ff5722',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    // backgroundColor: 'transparent',
  },
  feedbackImage: {
    width: 50,
    height: 50,
    position: 'absolute',
    zIndex: 99999,
    top: 0,
  },

  boxText2: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 30,
    position: 'relative',
    zIndex: -1,

  },

  highlighedtBox: {
    display: 'flex',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',

    position: 'relative',
  },
});
