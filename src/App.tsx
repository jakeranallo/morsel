import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import AuthService from './services/Auth';

interface State {
  user: firebase.User | null;
}

export default class App extends React.Component<{}, State> {
  public state = { user: null };

  public componentDidMount() {
    AuthService.subscribeAuthChange(user => this.setState({ user }));
  }

  public render() {
    if (this.state.user) {
      return (
        <View style={styles.container}>
          <Text>You are logged in!</Text>
          <Button onPress={AuthService.logout} title='Logout' />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Text>Welcome!</Text>
        <Button onPress={AuthService.loginWithFacebook} title='Login with Facebook' />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});