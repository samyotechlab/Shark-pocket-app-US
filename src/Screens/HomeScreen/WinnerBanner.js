import React from 'react';
import { View, StyleSheet } from 'react-native';
import WinnerCard from '../../Components/WinnerCard';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function WinnerBanner({ data }) {
  return (
    <View style={styles.container}>
      <WinnerCard data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: hp('1%'),
  },
});