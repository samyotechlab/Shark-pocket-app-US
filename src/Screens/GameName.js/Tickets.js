import React, { useEffect, useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  RefreshControl,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Toast from 'react-native-toast-message';
import useLoginDataStorage from '../../Service/CustomStorageHook';
import { storeTicket } from '../../Service/Tickets';
import { stateList } from '../../Utilities/CurrentState';
import AccordionSection from './AccordianSection';
import TicketCard from './TicketCard';
import AnimatedLoader from '../../Components/AnimatedLoader';
import useTicketData from './useTicketData';

export default function Tickets({ gameData }) {
  const navigation = useNavigation();
  const { params: { game_id } } = useRoute();
  const { loginData, isReady } = useLoginDataStorage();
  const userId = isReady && loginData?.data?._id;
  const {
    ticketData,
    userData,
    loader,
    refreshing,
    fetchUserData,
    fetchTickets,
    refreshData,
    setLoader
  } = useTicketData(game_id, userId);

  useEffect(() => {
    if (isReady && userId) {
      fetchUserData();
      fetchTickets();
    } else {
      setLoader(true);
    }
  }, [isReady, userId]);

  const handlePurchase = async (ticketId, price, callback) => {
    try {
      const response = await storeTicket(game_id, ticketId, userId);
      if (response.status === 0) {
        const totalBalance =
          (Number(response.total_balance) || 0) +
          (Number(response.total_earning) || 0) +
          (Number(response.bonus_wallet) || 0);
        const balance = price - totalBalance;
        return { success: false, message: response.message, balance };
      } else {
        Toast.show({
          type: 'success',
          position: 'top',
          text1: 'Successful!',
          text2: 'Ticket purchased successfully',
          visibilityTime: 3000,
        });
        callback();
        return { success: true };
      }
    } catch (error) {
      console.error('Purchase failed:', error);
      return { success: false, message: 'Purchase failed' };
    }
  };

  const checkState = async () => {
    try {
      const isStatePresent = await stateList();
      return isStatePresent;
    } catch (error) {
      console.error('Error checking state:', error);
      return false;
    }
  };

  const renderTicket = ({ item }) => (
    <TicketCard
      ticket={item}
      userData={userData}
      gameId={game_id}
      userId={userId}
      question={gameData?.questions}
      onPurchase={handlePurchase}
      checkState={checkState}
      navigation={navigation}
    />
  );

  return (
    <View style={styles.container}>
      <AccordionSection />
      {ticketData.length > 0 ? (
        !loader ? (
          <FlatList
            data={ticketData}
            renderItem={renderTicket}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContainer}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
            }
          />
        ) : (
          <AnimatedLoader/>
        )
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>
            No games or tickets are currently available.
          </Text>
        </View>
      )}
      <Toast ref={Toast.setRef} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContainer: {
    paddingBottom: hp('2%'),
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

