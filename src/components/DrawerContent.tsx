import React, {useContext, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  DrawerContentScrollView,
  // DrawerItemList,
  type DrawerContentComponentProps,
} from '@react-navigation/drawer';
import Dialog from 'react-native-dialog';
import Toast from 'react-native-toast-message';
import firestore from '@react-native-firebase/firestore';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {AuthContext} from '@src/context/AuthContext';
import Typography from '@src/components/Typography';
import {DrawerItemList} from '@src/components/DrawerItem';
import ColorList from '@src/styles/colors';
import Config from '@src/config';
import Button from './Button';
import config from '@src/config';
import {useAddListMutation} from '@src/services/lists.service';

const DrawerContent: React.FC<DrawerContentComponentProps> = props => {
  const {user, logout} = useContext(AuthContext);
  const [addListVisibility, setAddListVisibility] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [addNewList, {isLoading: loading}] = useAddListMutation();

  const onLogoutClick = () => {
    logout();
  };

  const onCloseBar = () => {
    props.navigation.closeDrawer();
  };

  const handleCreateList = async () => {
    if (!user) {
      return;
    }

    try {
      await addNewList({
        author: user.displayName ?? 'Unknown user',
        name: newListName,
        products_total: 0,
        users: [user.uid],
        createdAt: firestore.Timestamp.now(),
        updatedAt: firestore.Timestamp.now(),
      });

      setAddListVisibility(false);
      setNewListName('');
    } catch (e) {
      console.error(e);
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: e.message,
      });
    }
  };

  return (
    <View className="flex-1 bg-dark-blue">
      <View className="flex w-full">
        <Text className="text-tahiti-light text-xl font-[BadScript-Regular] m-5 leading-8">
          {config.appName}
        </Text>
      </View>
      <TouchableOpacity onPress={onCloseBar} className="absolute top-5 right-5">
        <Icon name="close" size={30} color={ColorList.light} />
      </TouchableOpacity>
      {user && (
        <View className="flex flex-row items-center p-2 w-full">
          <Image
            source={{
              uri:
                user.photoURL ?? require('@src/assets/images/blank-avatar.png'),
              cache: 'only-if-cached',
              width: 56,
              height: 56,
            }}
            defaultSource={require('@src/assets/images/blank-avatar.png')}
            className="flex rounded-full w-14 h-14 mr-3"
          />
          <Typography className="flex text-tahiti-light text-lg">
            {user.displayName}
          </Typography>
        </View>
      )}
      <Text className="text-center text-3xl font-bold text-tahiti-light">
        Моите списъци
      </Text>
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <View className="absolute bottom-0 right-0 opacity-25 pointer-events-none">
        <Image
          source={require('@src/assets/images/recipe-list.png')}
          style={styles.backgroundImage}
          resizeMode="contain"
        />
      </View>
      <View className="flex justify-center items-center mt-10">
        <Button
          backgroundColor={ColorList['green-100']}
          textColor={ColorList.white}
          startIcon={<Icon name="add" size={20} color={ColorList.white} />}
          onPress={() => setAddListVisibility(true)}
          disabled={loading}>
          Добави нов списък
        </Button>
      </View>
      <View className="flex justify-center items-center mt-10 mb-4">
        <Button
          backgroundColor={ColorList.error}
          textColor={ColorList.white}
          onPress={onLogoutClick}>
          Излез от профила си
        </Button>
      </View>
      <View className="absolute bottom-2 right-2">
        <Typography className="text-tahiti-light text-sm">
          {Config.version}
        </Typography>
      </View>
      <Dialog.Container
        visible={addListVisibility}
        onBackdropPress={() => setAddListVisibility(false)}>
        <Dialog.Title>Добавяне на нов списък</Dialog.Title>
        <Dialog.Description>Въведете име за списъка</Dialog.Description>
        <Dialog.Input
          onChangeText={name => setNewListName(name)}
          value={newListName}
        />
        <Dialog.Button
          label="Cancel"
          onPress={() => setAddListVisibility(false)}
        />
        <Dialog.Button
          label="Create"
          onPress={handleCreateList}
          disabled={loading}
        />
      </Dialog.Container>
    </View>
  );
};

const styles = StyleSheet.create({
  drawerContent: {
    flex: 1,
  },
  backgroundImage: {
    zIndex: 0,
    width: Dimensions.get('window').width / 2,
    height: Dimensions.get('window').width / 2,
  },
});

export default DrawerContent;
