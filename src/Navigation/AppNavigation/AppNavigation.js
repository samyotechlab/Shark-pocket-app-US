import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator,TransitionPresets} from '@react-navigation/stack'
import SplashScreen from '../../Screens/SplashScreen/SplashScreen';
import Login from '../../Screens/LoginScreen/Login';
import OtpVerify from '../../Screens/LoginScreen/OtpVerify';
import Disclaimer from '../../Screens/LoginScreen/Disclaimer';
import TabNavigation from '../TabNavigation';
import Home from '../../Screens/HomeScreen/Home';
import LocalGameBoard from '../../Components/LocalGameBoard';
import WalletDetails from '../../Screens/WalletScreen/WalletDetails';
import AvailableGame from '../../Screens/AvailableGame/AvailableGame';
import GameName from '../../Screens/GameName.js/GameName';
import PlayingInstruction from '../../Screens/PlayingInstruction/PlayingInstruction';
import FloatingBoxGame from '../../Screens/GameScreens/FloatingBox';
import PaymentDetails from '../../Screens/PaymentDetails.js/PaymentDetails';
import AddCashScreen from '../../Screens/AddCashScreen/AddCashScreen';
import WithdrawWalletScreen from '../../Screens/WithdrawWalletScreen/WithdrawWalletScreen';
import DepositeDetails from '../../Components/DepositeDetails';
import ViewProfile from '../../Screens/ProfileScreen/ViewProfile';
import AadharDetail from '../../Screens/KycScreen/AadharDetail';
import AadharOtpVerify from '../../Screens/KycScreen/AadharOtpVerify';
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
          <Stack.Screen
          name="LocalGameBoard"
          component={LocalGameBoard}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="WalletDetails"
          component={WalletDetails}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="AvailableGame"
          component={AvailableGame}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="GameName"
          component={GameName}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="PlayingInstruction"
          component={PlayingInstruction}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="GameScreen"
          component={FloatingBoxGame}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="PaymentDetails"
          component={PaymentDetails}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="AddCash"
          component={AddCashScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="WithdrawWallet"
          component={WithdrawWalletScreen}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="DepositeDetails"
          component={DepositeDetails}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="ViewProfile"  
          component={ViewProfile}
          options={{
            headerShown: false,
          }}
        />
          <Stack.Screen
          name="AadharDetail"  
          component={AadharDetail}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="AadharOtpVerify"  
          component={AadharOtpVerify}
          options={{
            headerShown: false,
          }}
        />
        </Stack.Navigator>

   </>
  )
}

const styles = StyleSheet.create({})