import React, { useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Game from '../../../assets/images/Screens/game1.png';
import tickets from '../../../assets/images/Screens/ticket.png';
import timer from '../../../assets/images/Screens/timer.png';
import AlertDialogGreen from '../../Components/AlertDialogGreen';
import AlertDialog from '../../Components/AlertDialogRed';
import CloseDialog from '../../Components/CloseDialog';
import { BackHandler } from 'react-native';
import styles from './styles';

export default function TicketCard({
  ticket,
  userData,
  gameId,
  userId,
  question,
  onPurchase,
  checkState,
  navigation,
}) {
  const [visible, setVisible] = useState(false);
  const [visibles, setVisibles] = useState(false);
  const [closeVisible, setCloseVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [okPress, setOkPress] = useState('');
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [purchased, setPurchased] = useState(ticket.is_bought === 1);
  const [ticketCount, setTicketCount] = useState(ticket.purchase_count >= ticket.minimum_ticket_count);
  const [balance, setBalance] = useState(0);
  const [countData, setCountData] = useState('');

  const handlePurchaseModal = async () => {
    setIsBtnDisabled(true);
    const isValidState = await checkState();
    if (userData?.is_aadhar_verified === 0) {
      setVisible(true);
      setMessage('Aadhar not verified. Please verify your Aadhar first.');
      setOkPress('handleAadhar');
    } else if (userData?.is_valid_state === 0 || !isValidState) {
      setCloseVisible(true);
      setMessage('State is not valid.');
    } else {
      setVisible(true);
      setMessage('Are you sure you want to purchase the ticket?');
      setOkPress('handleStateCheck');
    }
  };

  const handleAadhar = () => {
    setVisible(false);
    navigation.navigate('DisclaimerScreen', { user_id: userId, game_id: gameId });
  };

  const handlePurchase = async () => {
    setVisible(false);
    const result = await onPurchase(ticket._id, ticket.price, () => {
      setPurchased(true);
      setTicketCount(false);
    });
    if (!result.success) {
      setBalance(result.balance);
      setVisibles(true);
      setMessage(result.message);
    }
  };

  const handleNavigate = () => {
    setVisibles(false);
    navigation.navigate('AddCash', {
      user_id: userId,
      amounts: balance,
      status: 1,
      ticket_id: ticket._id,
      game_id: gameId,
    });
    setIsBtnDisabled(false);
  };

  const handlePlay = () => {
    navigation.navigate('PlayingInstruction', {
      ticket_id: ticket._id,
      game_id: ticket.game_id,
      question,
    });
  };

  const toggleModel = () => {
    setVisible(true);
    setMessage('To start the game, the purchased tickets count must be greater than or equal to the minimum ticket count.');
    setCountData('count');
  };

  const handleClose = () => {
    setIsBtnDisabled(false);
    setVisible(false);
    setCountData('');
  };

  const handleDialogClose = () => {
    setIsBtnDisabled(false);
    setVisibles(false);
  }

  return (
    <>
      <AlertDialogGreen
        visible={visible}
        onClose={handleClose}
        onOkPress={okPress === 'handleAadhar' ? handleAadhar : handlePurchase}
        message={message}
        countData={countData}
      />
      <AlertDialog
        visible={visibles}
        onClose={handleDialogClose}
        onOkPress={handleNavigate}
        message={message}
        show={true}
      />
      <CloseDialog
        visible={closeVisible}
        onClose={() => BackHandler.exitApp()}
        message={message}
      />
      <View style={styles.container}>
        <LinearGradient
          colors={['#F38424', '#F7A552', '#F9D479']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.8, y: 1 }}
          style={styles.card}
        >
          <View style={styles.content}>
            <Image source={Game} style={styles.characterImage} />
            <View style={styles.textContainer}>
              <Text style={styles.description}>{ticket.title}</Text>
              <View style={styles.headerRow}>
                <Text style={styles.title}>Ticket Price</Text>
                <Text style={styles.title}>Attempts</Text>
                <Text style={styles.title}>Remaining</Text>
              </View>
              <View style={styles.dataRow}>
                <LinearGradient
                  colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.box}
                >
                  <Text style={[styles.boxText,{fontSize:18}]}>₹ </Text>
                  <Text style={styles.boxText}>{ticket.price}</Text>
                </LinearGradient>
                <LinearGradient
                  colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.box}
                >
                  <Image source={tickets}/>
                  <Text style={styles.boxText}>{ticket.entries}</Text>
                </LinearGradient>
                <LinearGradient
                  colors={['#FFDD07', '#F8CB1F', '#FFDD07']}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  style={styles.box}
                >
                  <Image source={timer} />
                  <Text style={styles.boxText}>{ticket.remaining_entries}</Text>
                </LinearGradient>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={[
                    styles.playButton,
                    {
                      backgroundColor: purchased ? '#f3bc01' : '#00b63d',
                      borderTopColor: purchased ? '#fbeb01' : '#00e968',
                      borderBottomColor: purchased ? '#eb8d01' : '#018312',
                    },
                  ]}
                  disabled={isBtnDisabled}
                  onPress={purchased ? (ticketCount ? handlePlay : toggleModel) : handlePurchaseModal}
                >
                  <Text style={styles.playButtonText}>
                    {purchased ? 'Play Now' : 'Purchase'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </LinearGradient>
      </View>
    </>
  );
}

