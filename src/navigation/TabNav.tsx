import React, {useContext} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Text, View} from 'react-native';
import MainView from '@src/components/MainView';
import {AuthContext} from '@src/context/AuthContext';
import DrawerStack from './DrawerStack';
import ColorList from '@src/styles/colors';

const Tab = createBottomTabNavigator();

const DrawerNav = () => <DrawerStack />;

const ChatNav = () => {
  const auth = useContext(AuthContext);

  return (
    <MainView>
      <View>
        <Text className="text-tahiti-light">
          Well hello {auth.user?.displayName}
        </Text>
      </View>
    </MainView>
  );
};

const ShopsNav = () => (
  <MainView>
    <View>
      <Text className="text-tahiti-light">Show stores in the area</Text>
    </View>
  </MainView>
);

const TabNav: React.FC = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: ColorList.light,
        tabBarInactiveTintColor: ColorList.black,
        tabBarStyle: {
          elevation: 0,
          borderTopWidth: 0,
          backgroundColor: ColorList.brown,
        },
        tabBarActiveBackgroundColor: ColorList.darkBlue,
      }}>
      <Tab.Screen
        name="Home"
        component={DrawerNav}
        options={{
          tabBarIcon: () => (
            <Icon name="list-alt" size={25} color={ColorList.light} />
          ),
          tabBarLabel: 'Shopping List',
        }}
      />
      <Tab.Screen
        name="Stores"
        component={ShopsNav}
        options={{
          tabBarIcon: () => (
            <Icon name="store" size={25} color={ColorList.light} />
          ),
          tabBarLabel: 'Stores',
        }}
      />
      <Tab.Screen
        name="Chat"
        component={ChatNav}
        options={{
          tabBarIcon: () => (
            <Icon name="chat" size={25} color={ColorList.light} />
          ),
          tabBarLabel: 'Chat',
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNav;
