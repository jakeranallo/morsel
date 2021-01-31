import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import AuthNavigator from './src/navigation/AuthNavigator';
import HomeScreen from './src/screens/HomeScreen';
import firebase from 'firebase'
import { config } from './src/config';

firebase.initializeApp(config.firebase);

export default createAppContainer(
  
  createSwitchNavigator(
    {
      Auth: AuthNavigator,
      App: HomeScreen,
    },
    {
      initialRouteName: 'Auth'
    }
  )
);