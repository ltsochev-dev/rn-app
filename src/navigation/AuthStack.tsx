import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '@src/screens/LoginScreen';
import RegisterScreen from '@src/screens/RegisterScreen';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

const Stack = createStackNavigator();

const AuthStack = () => {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '782867258885-0bnaanoked9r5ovigve1jjdrumomnl2f.apps.googleusercontent.com',
      offlineAccess: true,
    });
  }, []);

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

export default AuthStack;
