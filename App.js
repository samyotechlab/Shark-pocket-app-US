/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import AppNavigation from './src/Navigation/AppNavigation/AppNavigation';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import crashlytics from '@react-native-firebase/crashlytics';

function App(){
  crashlytics().log("crash logging!");
  //crashlytics().crash();
  enableScreens();
  return (
  <>
  <GestureHandlerRootView>
      <NavigationContainer>
        <SafeAreaView style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <AppNavigation />
        </SafeAreaView>
      </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container:{flex: 1,backgroundColor:'white'}
})


export default App;
