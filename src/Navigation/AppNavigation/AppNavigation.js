import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator,TransitionPresets} from '@react-navigation/stack'
import SplashScreen from '../../Screens/SplashScreen/SplashScreen';
import Login from '../../Screens/LoginScreen/Login';
import OtpVerify from '../../Screens/LoginScreen/OtpVerify';
import Disclaimer from '../../Screens/LoginScreen/Disclaimer';
import TabNavigation from '../TabNavigation';
import Home from '../../Screens/HomeScreen/Home';
import PrizeCard from '../../Components/PinkPrizeCard';
export default function AppNavigation() {
    const Stack = createStackNavigator();
  return (
   <>
     <Stack.Navigator
        screenOptions={{
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
           <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="LoginScreen"
          component={Login}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="OtpScreen"
          component={OtpVerify}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="DisclaimerScreen"
          component={Disclaimer}
          options={{
            headerShown: false,
          }}
        />
           <Stack.Screen
          name="HomeScreen"
          component={TabNavigation}
          // component={PrizeCard}
          options={{
            headerShown: false,
          }}
        />
           <Stack.Screen
          name="Home"
          component={Home}
          options={{
            headerShown: false,
          }}
        />
        </Stack.Navigator>

   </>
  )
}

const styles = StyleSheet.create({})