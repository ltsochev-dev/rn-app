import {
  Image,
  ImageBackground,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from 'react-native';
import React, {useContext} from 'react';
import firestore from '@react-native-firebase/firestore';
import {DrawerContentScrollView} from '@react-navigation/drawer';
import {AuthContext} from '@src/context/AuthContext';

const CustomDrawer = (props: any) => {
  const {user} = useContext(AuthContext);

  const userInfo = () => {
    firestore()
      .collection('users')
      .doc(user?.uid)
      .get()
      .then(documentSnapshot => {
        // console.log(documentSnapshot.data());
      });
  };

  return (
    <View style={{flex: 1}}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{backgroundColor: 'black'}}>
        <ImageBackground
          source={require('../assets/images/dnavbg.jpg')}
          style={{padding: 20}}>
          <Image
            source={require('../assets/images/icon.jpg')}
            style={styles.imageStyles}
          />

          <TouchableOpacity
            onPress={userInfo}
            style={{backgroundColor: 'red', height: 100, width: 100}}
          />
        </ImageBackground>
        <Text>React native stuff</Text>
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawer;

const styles = StyleSheet.create({
  imageStyles: {
    width: 100,
    height: 100,
    borderRadius: 100,
    marginBottom: 10,
  },
});
