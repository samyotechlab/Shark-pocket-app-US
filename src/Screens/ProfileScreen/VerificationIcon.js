import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';

const VerificationIcon = ({ isVerified }) => (
  <Icon
    style={styles.verificationIcon}
    name={isVerified ? 'check-circle' : 'dots-horizontal-circle'}
    size={styles.verificationIcon.width}
    color={isVerified ? '#21B600' : '#E90000'}
  />
);

export default VerificationIcon;