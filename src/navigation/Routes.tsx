import React, {useContext, useState, useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import messaging from '@react-native-firebase/messaging';
import firestore from '@react-native-firebase/firestore';
import {Platform} from 'react-native';
import {getUniqueId, getManufacturer} from 'react-native-device-info';
import {AuthContext} from '@src/context/AuthContext';
import AuthStack from './AuthStack';
import DrawerStack from './DrawerStack';

export default function Routes() {
  const {user, setUser} = useContext(AuthContext);
  const [initializing, setInitializing] = useState(true);

  const onAuthStateChanged = async (
    authUser: FirebaseAuthTypes.User | null,
  ) => {
    setUser(authUser);
    if (initializing) {
      setInitializing(false);
    }

    if (authUser) {
      try {
        const deviceId = await getUniqueId();
        const fcmToken = await messaging().getToken();
        const manufacturer = await getManufacturer();

        const payload = {
          deviceId,
          fcmToken,
          manufacturer,
          model: Platform.constants!.Model,
          brand: Platform.constants!.Brand,
          osName: Platform.OS,
          osVersion: Platform.Version,
        } as const;

        // Create or update the current user
        await firestore().collection('users').doc(authUser.uid).set({
          uid: authUser.uid,
          displayName: authUser.displayName,
          email: authUser.email,
          emailVerified: authUser.emailVerified,
          photoURL: authUser.photoURL,
          phoneNumber: authUser.phoneNumber,
        });

        // Update user devices
        await firestore()
          .collection('user-devices')
          .doc(authUser.uid)
          .collection('tokens')
          .doc(deviceId)
          .set(payload, {merge: true});
      } catch (e) {
        console.error(e);
      }
    }
  };

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (initializing) {
    return null;
  }

  return (
    <NavigationContainer>
      {user ? <DrawerStack /> : <AuthStack />}
    </NavigationContainer>
  );
}
