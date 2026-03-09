import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import VerificationIcon from './VerificationIcon';
import styles from './styles';

const MenuItem = ({ item, userData, onNavigate, onModal }) => {
  const isAadharVerified = userData.is_aadhar_verified === 1;
  const isPanVerified = userData.is_pan_verified === 1;

  const handlePress = () => {
    if (item.url === 'AadharDetail') {
      if (!isAadharVerified) onNavigate(item.url);
    } else if (item.url === 'PanVerification') {
      if (!isAadharVerified) {
        onModal('Aadhar is not Verified, please verify aadhar first.', 'AadharDetail');
      } else if (!isPanVerified) {
        onNavigate(item.url);
      }
    } else if (item.url === 'BankAccount') {
      if (!isPanVerified) {
        onModal('Pancard is not verified, please verify pancard first.', 'PanVerification');
      } else {
        onNavigate(item.url);
      }
    } else {
      onNavigate(item.url);
    }
  };

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <LinearGradient
        colors={['#3D1911', '#3D1911', '#6A1701']}
        start={{ x: 1, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.cardImageContainer}
      >
        <Icon name={item.icon} size={styles.cardImage.width} color="#fff" style={styles.cardImage} />
      </LinearGradient>
      <View style={styles.cardTextContainer}>
        <Text style={styles.cardText}>{item.title}</Text>
      </View>
      {item.is_verified !== undefined && <VerificationIcon isVerified={item.is_verified} />}
      <Icon name="chevron-right" size={styles.arrowImage.width} color="#000000" style={styles.arrowImage} />
    </TouchableOpacity>
  );
};

export default MenuItem;