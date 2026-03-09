import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import Iconics from 'react-native-vector-icons/Ionicons';
import LinearGradient from 'react-native-linear-gradient';
import PropTypes from 'prop-types';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { COLORS, FONTS, SIZES } from './constants';
import styles from './styles';

const Header = ({ balance, onBackPress }) => (
  <View style={styles.header}>
    <TouchableOpacity style={styles.backButton} onPress={onBackPress}>
      <Iconics name="chevron-back" size={wp('7%')} color={COLORS.white} />
    </TouchableOpacity>
    <View style={{ flex: 1, marginRight: hp('5%') }}>
    <Text style={styles.title}>Add Cash</Text>
    </View>
    <View style={styles.wallet}>
      <LinearGradient
        colors={['#FFFFFF1A', '#FFFFFF1A', '#5521131A']}
        style={styles.walletGradient}
      >
        <Image
          source={{ uri: 'https://img.icons8.com/color/48/wallet--v1.png' }}
          style={styles.walletIcon}
        />
        <Text style={styles.walletText}>₹ {balance.toFixed(2) || 0}</Text>
      </LinearGradient>
    </View>
  </View>
);

Header.propTypes = {
  balance: PropTypes.number,
  onBackPress: PropTypes.func.isRequired,
};

export default Header;