import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, Button, Image } from 'react-native';
import firebase from 'firebase';


class HomeScreen extends React.Component {
  state = { user: {} };
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        this.setState({user: user});
      }
    })
 
  }

 
  render() {
    return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.container}>
        <Image style={{ width: 50, height: 50 }} source={{ uri: this.state.user.photoUrl }} />
          <Text>{this.state.user.email}</Text>
          <Button title="Log Off" onPress={() => {
            firebase.auth().signOut();
          }}/>
                    <Button title="Delete Account" onPress={() => {
            firebase.auth().currentUser.delete();
          }}/>
        </View>
      </SafeAreaView>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
export default HomeScreen;