import React from 'react';
import { Image, Text, View } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import styles from './styles';
export default function WalletBalance({ totalAmount }) {
  return (
    <LinearGradient
      colors={['#3B191080', '#FFFFFF80', '#FFFFFF80']}
      style={styles.balanceContainer}
    >
      <View style={styles.balanceRow}>
        <Text style={styles.sectionTitle}>BALANCE</Text>
        <View style={styles.balanceContent}>
          <Image
            source={{ uri: 'https://img.icons8.com/color/48/wallet--v1.png' }}
            style={styles.walletIcon}
          />
          <Text style={styles.balanceAmount}>₹{totalAmount.toFixed(2)}</Text>
        </View>
      </View>
    </LinearGradient>
  );
}