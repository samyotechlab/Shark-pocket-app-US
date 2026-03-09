import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeScreen from '../Screens/HomeScreen/Home';
import ResultScreen from '../Screens/ResultScreen/Result';
import WalletScreen from '../Screens/WalletScreen/Wallet';
import ProfileScreen from '../Screens/ProfileScreen/Profile';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp,heightPercentageToDP as hp } from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';


export default function TabNavigation() {
  const { height } = Dimensions.get('window');
    const Tabs = createBottomTabNavigator();
    return (
        <Tabs.Navigator
        screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
              let iconName;
  
              // Assign icons for each tab
              if (route.name === 'Home') {
                iconName = focused ? 'home' : 'home-outline';
              } else if (route.name === 'Result') {
                iconName = focused ? 'trophy' : 'trophy-outline';
              } else if (route.name === 'Wallet') {
                iconName = focused ? 'wallet' : 'wallet-outline';
              } else if (route.name === 'Profile') {
                iconName = focused ? 'person' : 'person-outline';
              }
  
              // Return Icon
              return <Ionicons name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: '#FFD700', 
            tabBarInactiveTintColor: '#FFFFFF', 
            tabBarStyle: {
              backgroundColor: '#6A1700',            
              height: height * 0.1,
        
            },
            headerShown: false,
            
          })}>
          <Tabs.Screen
            name="Home"
            component={HomeScreen}
            options={{
                tabBarLabel: 'Home',
                headerShown: false,
                tabBarButton: CustomTabButton,
              }}
          />
          <Tabs.Screen
            name="Result"
            component={ResultScreen}
            options={{
                tabBarLabel: 'Result',
                headerShown: false,
                tabBarButton: CustomTabButton,
              }}
          />
          <Tabs.Screen
            name="Wallet"
            component={WalletScreen}
            options={{
                tabBarLabel: 'Wallets',
                headerShown: false,
                tabBarButton: CustomTabButton,
              }}
          />
          <Tabs.Screen
            name="Profile"
            component={ProfileScreen}
            options={{
                tabBarLabel: 'Profile',
                headerShown: false,
                tabBarButton: CustomTabButton,
              }}
          />
        </Tabs.Navigator>
      );
}


const CustomTabButton = props => {
  const isSelected = props.accessibilityState?.selected ?? false;

  console.log("props", props.accessibilityState);
  console.log("isSelected", isSelected);

  return (
    <TouchableOpacity
      {...props}
      style={[props.style, styles.touchable]}
    >
      {isSelected ? (
        <LinearGradient
          colors={['#67170080', '#FAB41D80']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={[
            styles.gradient,
            isSelected ? styles.selectedGradient : styles.inactiveGradient,
          ]}
        >
          {props.children}
        </LinearGradient>
      ) : (
        <View style={styles.iconContainer}>
          {props.children}
        </View>
      )}
    </TouchableOpacity>
  );
};


const styles = StyleSheet.create({
    touchable: {
        // flex: 1,
        // backgroundColor:'red'

      },
      gradient: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      selectedGradient: {
        borderBottomColor: '#FFCE63', 
        borderBottomWidth: wp('1%'), 
     
        width: wp('20%'),               
        alignSelf: 'center',  
      },
      inactiveGradient: {
        backgroundColor:'transparent',
        borderBottomWidth: 0,
        width: wp('20%'),
        alignSelf: 'center',
      },
      iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',  
        top:hp('1%')

      },
})