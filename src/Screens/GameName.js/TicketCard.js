import React, { useState } from 'react';
import {
  Image,
  Text,
  TouchableOpacity,
  View,
  Platform,
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
  const [balance, setBalance] = useState(0);

  const BORDER_RADIUS = 16;
  const BORDER_WIDTH = 3;  
  const INNER_RADIUS = BORDER_RADIUS - BORDER_WIDTH;

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

  const handleClose = () => {
    setIsBtnDisabled(false);
    setVisible(false);
  };

  const handleDialogClose = () => {
    setIsBtnDisabled(false);
    setVisibles(false);
  };

  return (
    <>
      <AlertDialogGreen
        visible={visible}
        onClose={handleClose}
        onOkPress={okPress === 'handleAadhar' ? handleAadhar : handlePurchase}
        message={message}
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

      <View
        style={[
          styles.container,
          {
            borderRadius: BORDER_RADIUS,
            overflow: 'hidden',
            borderWidth: BORDER_WIDTH > 0 ? BORDER_WIDTH : 0,
            borderColor: '#F2E30B',
            ...Platform.select({
              ios: {
                shadowColor: '#000',
                shadowOffset: { width: 0, height: 3 },
                shadowOpacity: 0.25,
                shadowRadius: 6,
              },
              android: {
                elevation: 6,
              },
            }),
          },
        ]}
      >
        <LinearGradient
          colors={['#F38424', '#F7A552', '#F9D479']}
          start={{ x: 0, y: 0.5 }}
          end={{ x: 0.8, y: 1 }}
          style={{
            borderRadius: INNER_RADIUS,
            overflow: 'hidden', 
          }}
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
                <View style={[styles.box, { backgroundColor: '#FFDD07' }]}>
                  <Text style={[styles.boxText, { fontSize: 18 }]}>₹ {ticket.price}</Text>
                </View>

                <View style={[styles.box, { backgroundColor: '#FFDD07' }]}>
                  <Image source={tickets} style={{ width: 20, height: 20, marginRight: 4 }} />
                  <Text style={styles.boxText}>{ticket.entries}</Text>
                </View>

                <View style={[styles.box, { backgroundColor: '#FFDD07' }]}>
                  <Image source={timer} style={{ width: 20, height: 20, marginRight: 4 }} />
                  <Text style={styles.boxText}>{ticket.remaining_entries}</Text>
                </View>
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
                  onPress={purchased ? handlePlay : handlePurchaseModal}
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