import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator, TransitionPresets } from '@react-navigation/stack'
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
import GameFinishScreen from '../../Screens/GameScreens/GameFinishScreen';
import GameFinishHistory from '../../Screens/GameScreens/GameFinishHistory';
import AmountDetails from '../../Components/AmountDetails';
import Notification from '../../Screens/Notification/Notification';
import BankAccount from '../../Screens/BankAccount/BankAccount';
import PanVerfication from '../../Screens/PanVerfication/PanVerification';
import AllPlayedGames from '../../Screens/GameHistory/AllPlayedGames';
import AllGameName from '../../Screens/GameHistory/AllGameName';
import PaymentStatusCard from '../../Components/PaymentStatusCard';
import { FAQScreen, ContactScreen, HowToPlayScreen, RefundPolicyScreen, TCScreen,SupportScreen } from '../../Screens/Screens/Screen';
import SelectedNumbers from '../../Screens/GameScreens/SelectedNumbers';
import UpcomingGameInfo from '../../Components/UpcomingGameInfo';

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
        <Stack.Screen
          name="GameFinish"
          component={GameFinishScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GameFinishHistory"
          component={GameFinishHistory}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AmountDetails"
          component={AmountDetails}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Notification"
          component={Notification}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="BankAccount"
          component={BankAccount}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PanVerification"
          component={PanVerfication}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="ContactUs"
          component={ContactScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="T&CScreen"
          component={TCScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Refund"
          component={RefundPolicyScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="HowtoPlay"
          component={HowToPlayScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Support"
          component={SupportScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="Faq"
          component={FAQScreen}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="GameHistory"
          component={AllPlayedGames}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="AllGameName"
          component={AllGameName}
          options={{
            headerShown: false,
          }}
        />
        <Stack.Screen
          name="PaymentStatusCard"
          component={PaymentStatusCard}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="SelectedNumbers"
          component={SelectedNumbers}
          options={{
            headerShown: false,
          }}
        />
         <Stack.Screen
          name="UpcomingGameInfo"
          component={UpcomingGameInfo}
          options={{
            headerShown: false,
          }}
        />

      </Stack.Navigator>

    </>
  )
}

const styles = StyleSheet.create({})