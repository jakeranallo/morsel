import React, {useEffect} from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import firebase from 'firebase';

// const LoadingScreen = (navigation) => {
  
  
  
//   return(
//     <View style={styles.container}>
//     <ActivityIndicator size="large" />
// </View>
//   )
// }




class LoadingScreen extends React.Component {
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
            this.props.navigation.navigate('App');
            } else {
            this.props.navigation.navigate('SignUp');
            }
        });
    }
    render() {
        return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    }
});
export default LoadingScreen;