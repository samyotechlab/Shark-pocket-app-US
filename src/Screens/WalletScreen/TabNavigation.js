import React from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import styles from './styles';
const tabs = ['Deposite', 'Bonus', 'Winning', 'Withdraw'];

export default function TabNavigation({ selectedTab, onSelectTab }) {
  return (
    <View>
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.tabContainer}
    >
      {tabs.map((tab) => (
        <TouchableOpacity key={tab} onPress={() => onSelectTab(tab)}>
          <Text
            style={[
              styles.tabText,
              {
                color: selectedTab === tab ? '#FEB801' : '#FFFFFF',
                fontFamily:
                  selectedTab === tab ? 'Montserrat-Bold' : 'Montserrat-Regular',
                borderBottomColor: selectedTab === tab ? '#FEB801' : '#565656',
              },
            ]}
          >
            {tab}
          </Text>
        </TouchableOpacity>
      ))}
    </ScrollView>
    </View>
  );
}