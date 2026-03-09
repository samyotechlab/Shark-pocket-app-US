import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { truncateName } from '../../Utilities/utilies';
import styles from './styles';

const ProfileHeader = ({ userData, onViewProfile }) => {
  const defaultImage = require('../../../assets/images/Screens/avatar.webp');

  return (
    <View style={styles.profileHeader}>
      <View style={styles.profileImageContainer}>
      <Image
          source={userData.userImage && userData.userImage !== '' ? { uri: userData.userImage } : defaultImage}
          style={styles.profileImage}
          resizeMode="cover"
        />
      </View>
      <View style={styles.profileDetailsContainer}>
        <Text style={styles.profileName}>{truncateName(userData.userName, 1)}</Text>
        <Text style={styles.profilePhone}>(+91) {userData.mobile}</Text>
        <Text style={styles.profileFullName}>{userData.name}</Text>
      </View>
      <TouchableOpacity style={styles.profileActionContainer} onPress={onViewProfile}>
        <Text style={styles.viewProfileText}>View Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ProfileHeader;