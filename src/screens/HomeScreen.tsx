import React, { useRef, useState } from 'react';
import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import firebase from 'firebase';
import { CubeNavigationHorizontal } from 'react-native-3dcube-navigation';
import AllStories from '../constants/AllStories';
import StoryContainer from '../components/StoryContainer';


const HomeScreen = (props) => {
  const [isModelOpen, setModel] = useState(false);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [currentScrollValue, setCurrentScrollValue] = useState(0);
  const modalScroll = useRef(null);

  const onStorySelect = (index) => {
    setCurrentUserIndex(index);
    setModel(true);
  };

  const onStoryClose = () => {
    setModel(false);
  };

  const onStoryNext = (isScroll) => {
    const newIndex = currentUserIndex + 1;
    if (AllStories.length - 1 > currentUserIndex) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    } else {
      setModel(false);
    }
  };

  const onStoryPrevious = (isScroll) => {
    const newIndex = currentUserIndex - 1;
    if (currentUserIndex > 0) {
      setCurrentUserIndex(newIndex);
      if (!isScroll) {
        modalScroll.current.scrollTo(newIndex, true);
      }
    }
  };

  const onScrollChange = (scrollValue) => {
    if (currentScrollValue > scrollValue) {
      onStoryNext(true);
      console.log('next');
      setCurrentScrollValue(scrollValue);
    }
    if (currentScrollValue < scrollValue) {
      onStoryPrevious();
      console.log('previous');
      setCurrentScrollValue(scrollValue);
    }
  };

  const renderSeperator = () => (
    <View style={{ height: 1, backgroundColor: '#ccc' }} />
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={AllStories}
        horizontal
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onStorySelect(index)}>
            <Image
              style={styles.circle}
              source={{ uri: item.profile }}
              isHorizontal
            />
            <Text style={styles.title}>{item.title}</Text>

          </TouchableOpacity>
        )}
      />


      <FlatList
        data={AllStories}
        ItemSeparatorComponent={renderSeperator}
        style={{ paddingHorizontal: 10 }}
        renderItem={({ item, index }) => (
          <TouchableOpacity onPress={() => onStorySelect(index)} style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Image
              style={styles.circle}
              source={{ uri: item.profile }}
            />
            <Text style={styles.title}>{item.title}</Text>

          </TouchableOpacity>
        )}
      />


      <Modal
        animationType="slide"
        transparent={false}
        visible={isModelOpen}
        style={styles.modal}
        onShow={() => {
          if (currentUserIndex > 0) {
            modalScroll.current.scrollTo(currentUserIndex, false);
          }
        }}
        onRequestClose={onStoryClose}
      >
        {/* eslint-disable-next-line max-len */}
        <CubeNavigationHorizontal callBackAfterSwipe={g => onScrollChange(g)} ref={modalScroll} style={styles.container}>
          {AllStories.map((item, index) => (
            <StoryContainer
              onClose={onStoryClose}
              onStoryNext={onStoryNext}
              onStoryPrevious={onStoryPrevious}
              user={item}
              isNewStory={index !== currentUserIndex}
            />
          ))}
        </CubeNavigationHorizontal>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    paddingVertical: 50,
    backgroundColor: 'rgba(255,255,255,255)',
  },
  circle: {
    width: 66,
    margin: 4,
    height: 66,
    borderRadius: 33,
    borderWidth: 2,
    borderColor: '#72bec5',
  },
  modal: {
    flex: 1,
  },
  title: {
    fontSize: 9, textAlign: 'center',
  },
});


// class HomeScreen extends React.Component {
//   state = { user: {} };
//   componentDidMount() {
//     firebase.auth().onAuthStateChanged((user) => {
//       if (user != null) {
//         this.setState({user: user});
//       }
//     })
 
//   }

 
//   render() {
//     return (
//       <SafeAreaView style={{ flex: 1 }}>
//         <View style={styles.container}>
//         <Image style={{ width: 50, height: 50 }} source={{ uri: this.state.user.photoUrl }} />
//           <Text>{this.state.user.email}</Text>
//           <Button title="Log Off" onPress={() => {
//             firebase.auth().signOut();
//           }}/>
//                     <Button title="Delete Account" onPress={() => {
//             firebase.auth().currentUser.delete();
//           }}/>
//         </View>
//       </SafeAreaView>
//     );
//   }
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
export default HomeScreen;