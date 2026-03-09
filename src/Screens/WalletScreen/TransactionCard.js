import React from 'react';
import {Text, TouchableOpacity, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Iconics from 'react-native-vector-icons/Ionicons';
import styles from './styles';

export default function TransactionCard({ onPress }) {
  return (
    <TouchableOpacity style={styles.transactionContainer} onPress={onPress}>
      <LinearGradient
        colors={['#3E180E1A', '#FFFFFF1A']}
        style={styles.transactionIcon}
      >
        <Iconics name="timer-outline" size={22} color="white" />
      </LinearGradient>
      <View>
        <Text style={styles.label}>My Transactions</Text>
        <Text style={styles.transactionText}>
          Deposit and withdrawal history
        </Text>
      </View>
      <Iconics
        name="chevron-forward-outline"
        size={25}
        color="white"
        style={styles.chevron}
      />
    </TouchableOpacity>
  );
}