/**
 * @format
 */
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {
    configureReanimatedLogger,
    ReanimatedLogLevel,
  } from 'react-native-reanimated';
  
  // Configure Reanimated logging
  configureReanimatedLogger({
    level: ReanimatedLogLevel.warn,
    strict: false,
  });

AppRegistry.registerComponent(appName, () => App);
