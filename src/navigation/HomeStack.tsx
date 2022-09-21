import React from 'react';
import {Text} from 'react-native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

function HomeNav() {
  return <Text>HomeNav component</Text>;
}

const HomeStack: React.FC = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Home" component={HomeNav} />
    </Stack.Navigator>
  );
};

export default HomeStack;
