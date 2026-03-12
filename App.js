/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { StatusBar, StyleSheet  } from 'react-native';
import AppNavigation from './src/Navigation/AppNavigation/AppNavigation';
import { enableScreens } from 'react-native-screens';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SafeAreaProvider } from 'react-native-safe-area-context';
function App(){
  //crashlytics().crash();
  enableScreens();
  return (
  <>
  <GestureHandlerRootView>
      <NavigationContainer>
        <SafeAreaProvider style={styles.container}>
          <StatusBar
            translucent
            backgroundColor="transparent"
            barStyle="light-content"
          />
          <AppNavigation />
        </SafeAreaProvider>
      </NavigationContainer>
      </GestureHandlerRootView>
    </>
  );
}

const styles = StyleSheet.create({
  container:{flex: 1,backgroundColor:'white'}
})


export default App;
