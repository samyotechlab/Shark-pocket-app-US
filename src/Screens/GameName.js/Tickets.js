import {
  BackHandler,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import Game from '../../../assets/images/Screens/game1.png';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { storeTicket, ticketList } from '../../Service/Tickets';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import coin from '../../../assets/images/Screens/coin2.png';
import ticket from '../../../assets/images/Screens/ticket.png';
import timer from '../../../assets/images/Screens/timer.png';
import AlertDialog from '../../Components/AlertDialogRed';
import AnimatedLoader from '../../Components/AnimatedLoader';
import AlertDialogGreen from '../../Components/AlertDialogGreen';
import Toast from 'react-native-toast-message';
import { userDetail } from '../../Service/Login';
import CloseDialog from '../../Components/CloseDialog';
import { stateList } from '../../Utilities/CurrentState';

export default function Tickets({ gameData }) {
  const question = gameData?.questions
  const navigation = useNavigation();
  const { loginData, isReady } = useLoginDataStorage();
  const data = isReady && loginData && loginData?.data;
  const [loader, setLoader] = useState(false);
  const [ticketData, setTicketData] = useState([]);
  const [visible, setVisible] = useState(false);
  const [visibles, setVisibles] = useState(false);
  const [closeVisible, setCloseVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [purchasedTickets, setPurchasedTickets] = useState({});
  const [okPress, setOkPress] = useState('')
  const [message, setMessage] = useState('');
  const [balances, setBalance] = useState('')
  const [usersData, setUserData] = useState({})
  const [modalVisible, setModalVisible] = useState(false);
  const route = useRoute();
  const { game_id } = route.params;
  const [refreshing, setRefreshing] = useState(false);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false); 
  const refreshData = () => {
    setRefreshing(true);
    setTimeout(() => {
      getAllTicket();
      setRefreshing(false);
    }, 2000);
  };

  async function checkState() {
    const isStatePresent = await stateList();
    return isStatePresent;
  }

  const userData = async (loginData) => {
    setLoader(true);
    try {
      const response = await userDetail(loginData ? loginData?._id : data?._id);
      setUserData(response.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  };

  const getAllTicket = async () => {
    setLoader(true);
    try {
      const response = await ticketList(game_id, data._id);
      setTicketData(response.data);
    } catch (error) {
      console.log('error', error);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (isReady && loginData) {
      userData(loginData?.data);
      getAllTicket();
    } else {
      setLoader(true);
    }
  }, [isReady, loginData]);

  const renderItem = ({ item }) => {
    const isPurchased = purchasedTickets[item._id] || item.is_bought === 1;
    const handlePurchase = async () => {
      try {
        setVisible(false);
        const response = await storeTicket(game_id, selectedItem._id, data._id);
        if (response.status === 0) {
          const total_price =
            (Number(response.total_balance) || 0) +
            (Number(response.total_earning) || 0) +
            (Number(response.bonus_wallet) || 0);
          const ticket_price = selectedItem.price
          const balance = ticket_price - total_price
          console.log('balance', balance)
          setBalance(balance)
          setVisibles(true);
          setMessage(response.message);
        } else {
          setPurchasedTickets(prev => ({ ...prev, [selectedItem._id]: true }));
          Toast.show({
            type: 'success',
            position: 'top',
            text1: 'Succesful!',
            text2: 'Ticket purchased Succesfully',
            visibilityTime: 3000,
          });
          setSelectedItem(null);
        }
      } catch (error) {
        console.log('Purchase failed:', error);
      }
    };

    const handleNavigate = () => {
      setVisibles(false);
      navigation.navigate("AddCash", { user_id: data._id, amounts: balances, status: 1, ticket_id: selectedItem._id, game_id: game_id });
    }

    const handlePurchaseModal = async () => {
      setIsBtnDisabled(true);
      const isValidState = await checkState();
      if (usersData?.is_aadhar_verified === 0) {
        setVisible(true);
        setMessage('Aadhar not Verified , Firstly Aadhar Verification...');
        setOkPress('handleAadhar')
      } else if (usersData?.is_valid_state === 0) {
        setCloseVisible(true);
        setMessage('State is Not Valid');
      }
      else if (!isValidState) {
        console.log("State is not valid", isValidState);
        setCloseVisible(true);
        setMessage('State is Not Valid=====>');
      }
      else {
        setSelectedItem(item);
        setVisible(true);
        setMessage('Are You Sure You Want to Purchase the Ticket.');
        setOkPress('handleStateCheck')
      }
    };

    const handleAadhar = () => {
      setVisible(false)
      navigation.navigate('DisclaimerScreen', { user_id: data._id, game_id: game_id })
    }

    const handlePlay = () => {
      navigation.navigate('PlayingInstruction', {
        ticket_id: item._id,
        game_id: item.game_id,
        question: question
      });
    };
    const handleClose =() =>{
      setIsBtnDisabled(false)
      setVisible(false)
    }
    return (
      <>

        <AlertDialogGreen
          visible={visible}
          onClose={() => handleClose()}
          onOkPress={okPress === 'handleAadhar' ? handleAadhar : handlePurchase}
          message={message}
        />
        <AlertDialog
          visible={visibles}
          onClose={() => setVisibles(false)}
          onOkPress={handleNavigate}
          message={message}
          show={true}
        />
        <CloseDialog visible={closeVisible} onClose={() => BackHandler.exitApp()} message={message} />
        <View style={styles.container1}>
          <LinearGradient
            colors={['#F38424', '#F7A552', '#F9D479']}
            start={{ x: 0, y: 0.5 }}
            end={{ x: 0.8, y: 1 }}
            style={styles.card}>
            <View style={styles.content}>
              <Image source={Game} style={styles.characterImage} />
              <View style={styles.textContainer}>

                <View style={{ flex: 0.1, }}>
                  <Text style={styles.description}>{item.title}</Text>
                </View>
                <View style={{ flex: 0.5, flexDirection: 'row', justifyContent: 'space-evenly', alignItems: 'center' }}>
                  <Text style={styles.title}>Amount</Text>
                  <Text style={styles.title}>Entries</Text>
                  <Text style={styles.title}>Rem. Entries</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                  <LinearGradient
                    colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.box}>
                    <Image source={coin} style={styles.boxIcon} />
                    <Text style={styles.boxText}>{item.price}</Text>
                  </LinearGradient>

                  <LinearGradient
                    colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.box}>
                    <Image source={ticket} style={styles.boxIcon1} />
                    <Text style={styles.boxText}>{item.entries}</Text>
                  </LinearGradient>

                  <LinearGradient
                    colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={styles.box}>
                    <Image source={timer} style={styles.boxIcon} />
                    <Text style={styles.boxText}>{item.remaining_entries}</Text>
                  </LinearGradient>
                </View>
                <View style={{ flex: 1 }}>
                  <View style={styles.buttonContainer}>
                    <TouchableOpacity
                      style={[
                        styles.playButton,
                        {
                          backgroundColor: isPurchased ? '#f3bc01' : '#00b63d',
                          borderTopColor: isPurchased ? '#fbeb01' : '#00e968',
                          borderBottomColor: isPurchased ? '#eb8d01' : '#018312',
                        },
                      ]}
                      disabled={isBtnDisabled}
                      onPress={isPurchased ? handlePlay : handlePurchaseModal}>
                      <Text style={styles.playButtonText}>
                        {' '}
                        {isPurchased ? 'Play Now' : 'Purchase'}
                      </Text>

                    </TouchableOpacity>
                  </View>
                </View>
              </View>
            </View>
          </LinearGradient>
        </View>
      </>
    );
  };

  return (
    <>
      <View style={styles.container}>
        {
          ticketData ? (!loader ? (
            <FlatList
              data={ticketData}
              renderItem={renderItem}
              keyExtractor={(item, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.scrollContainer}
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
              }
            />
          ) : (<AnimatedLoader />)) : (
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>
                No games or tickets are currently available.
              </Text>
            </View>
          )

        }

      </View>
      <Toast ref={Toast.setRef} />
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    borderWidth: 2,
    borderRadius: 10,
    height: 'auto',
    width: wp('40%'),
    marginVertical: 5,
    backgroundColor: 'white',
  },
  container1: {
    flex: 1,
    paddingLeft: wp('3%'),
    marginBottom: hp('2%'),
  },
  card: {
    borderRadius: wp('3%'),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: hp('0.4%') },
    shadowOpacity: 0.3,
    shadowRadius: wp('1.2%'),
    elevation: 5,
    borderWidth: wp('1%'),
    borderColor: '#F2E30B',
    marginRight: 15,
    marginLeft: 0,
    padding: hp('0.5%'),
  },
  content: {
    flexDirection: 'row',
    // alignItems: 'center',
    flex: 1,

  },
  characterImage: {
    width: wp('25%'),
    height: hp('20%'),
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
    // paddingLeft: wp('1%'),
    // justifyContent: 'space-between',
  },
  description: {
    fontSize: wp('4%'),
    color: '#000000',
    fontFamily: 'Audiowide-Regular',
    textAlign: 'center'
  },
  title: {
    fontSize: wp('3%'),
    color: '#000000',
    fontFamily: 'Audiowide-Regular',
    textAlign: 'center',
    textDecorationLine: 'underline'
  },
  boxContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('1%'),
  },
  box: {
    borderRadius: wp('2%'),
    padding: wp('0.5%'),
    alignItems: 'center',
    width: wp('20%'),
    flexDirection: 'row',
    borderColor: '#C59900',
    borderWidth: wp('0.3%'),
    justifyContent: 'space-evenly',
  },
  boxIcon: {
    width: wp('5%'),
    height: wp('5%'),
    marginBottom: hp('0.5%'),
  },
  boxIcon1: {
    width: wp('6%'),
    height: wp('6%'),
    marginBottom: hp('0.5%'),
    resizeMode: 'contain',
  },
  boxText: {
    fontSize: wp('3.5%'),
    fontFamily: 'LilitaOne-Regular',
    color: 'white',
    textShadowColor: 'black',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 1,
  },
  playButton: {
    borderRadius: 8,
    paddingVertical: hp('0.7%'),
    paddingHorizontal: wp('1%'),
    alignItems: 'center',
    marginRight: wp('25%'),
    borderRightWidth: 1,
    borderLeftWidth: 1,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    elevation: 20,
    shadowColor: 'rgba(0, 0, 0, 0.4)',
    shadowOpacity: 0.8,
    shadowRadius: 15,
    shadowOffset: { width: 1, height: 11 },
    width: '100%',
    borderTopRightRadius: wp(3.3),
  },
  playButtonText: {
    letterSpacing: 2,
    fontSize: wp('4.5%'),
    fontFamily: 'LilitaOne-Regular',
    color: '#FFFFFF',
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 1,
    textTransform: 'uppercase',
  },
  infoIconContainer: {
    position: 'absolute',
    bottom: hp('1%'),
    right: hp('1%'),
    padding: hp('0.5%'),
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '500',
    textAlign: 'center',
    paddingHorizontal: hp('2%'),
  },
});
