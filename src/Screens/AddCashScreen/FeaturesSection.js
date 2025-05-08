import React from 'react';
import { View, Image, Text } from 'react-native';
import styles from './styles';
import { COLORS } from './constants';

const FeaturesSection = () => (
  <View style={styles.featuresRow}>
    {[
      {
        icon: 'https://img.icons8.com/color/48/security-checked.png',
        text: '100% Safe Payments',
      },
      {
        icon: 'https://img.icons8.com/color/48/flash-on.png',
        text: 'Instant Deposit\nAnd Withdrawal',
        tintColor: COLORS.green,
      },
      {
        icon: 'https://img.icons8.com/color/48/group.png',
        text: 'Trusted by\n15cr+ Players',
        tintColor: COLORS.green,
      },
    ].map((feature, index) => (
      <View key={index} style={styles.feature}>
        <Image
          source={{ uri: feature.icon }}
          style={styles.featureIcon}
          tintColor={feature.tintColor}
        />
        <Text style={styles.featureText}>{feature.text}</Text>
      </View>
    ))}
  </View>
);

export default FeaturesSection;