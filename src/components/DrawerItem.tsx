import {
  DrawerDescriptorMap,
  DrawerNavigationHelpers,
} from '@react-navigation/drawer/lib/typescript/src/types';
import {
  CommonActions,
  DrawerActions,
  DrawerNavigationState,
  ParamListBase,
  useLinkBuilder,
} from '@react-navigation/native';
import Dialog from 'react-native-dialog';
import ColorList, {hexToRgba} from '@src/styles/colors';
import React, {useState} from 'react';
import {
  View,
  Text,
  StyleProp,
  TextStyle,
  ViewStyle,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
  Modal,
} from 'react-native';
import Button from './Button';
import CloseBtn from './CloseBtn';
import Typography from './Typography';
import {useRemoveListMutation} from '@src/services/lists.service';

interface Props {
  label:
    | string
    | ((props: {focused: boolean; color: string}) => React.ReactNode);
  icon?: (props: {
    focused: boolean;
    size: number;
    color: string;
  }) => React.ReactNode;
  to?: string;
  focused: boolean;
  onPress: () => void;
  onDelete?: () => void;
  activeTintColor?: string;
  inactiveTintColor?: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  pressColor?: string;
  pressOpacity?: number;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  allowFontScaling?: boolean;
  list?: IList;
}

export const DrawerItem: React.FC<Props> = ({
  icon,
  label,
  focused = false,
  activeTintColor = ColorList.light,
  inactiveTintColor = hexToRgba(ColorList.white, 0.68),
  activeBackgroundColor = hexToRgba(ColorList.white, 0.2),
  inactiveBackgroundColor = hexToRgba(activeTintColor, 0.12),
  style,
  onPress,
  onDelete,
  list,
  ...props
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const {borderRadius = 16} = StyleSheet.flatten(style || {});
  const color = focused ? activeTintColor : inactiveTintColor;
  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  const iconNode = icon ? icon({size: 24, focused, color}) : null;

  const onLongPress = () => {
    setModalVisible(true);
  };

  const onDeleteListItemPrompt = () => {
    setConfirmVisible(true);
  };

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
    }
  };

  return (
    <View
      collapsable={false}
      {...props}
      style={{...styles.itemStyles, backgroundColor, borderRadius}}>
      <TouchableOpacity
        onPress={onPress}
        onLongPress={onLongPress}
        delayLongPress={1000}
        accessibilityRole="button"
        accessibilityState={{selected: focused}}
        style={styles.linkStyles}>
        <View style={styles.buttonContent}>
          <ImageBackground
            source={require('@src/assets/images/list-icon.png')}
            resizeMode="contain"
          />
          {iconNode && (
            <View className="absolute bottom-0 right-0">{iconNode}</View>
          )}
          <Text
            className="text-tahiti-light w-full font-bold text-lg"
            numberOfLines={1}>
            {label}
          </Text>
          {list && (
            <Text className="text-sm text-tahiti-green-100">
              {list.products_total} products total
            </Text>
          )}
        </View>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View className="flex-1">
          <View className="modal m-5 bg-white rounded-3xl p-9 items-center shadow-black shadow-sm">
            <CloseBtn onPress={() => setModalVisible(false)} />
            <Typography>Do you want to delete &quot;{label}&quot;?</Typography>
            <View className="my-2">
              <Button
                fullWidth
                backgroundColor={ColorList.error}
                textColor={ColorList.white}
                onPress={onDeleteListItemPrompt}>
                Delete list
              </Button>
            </View>
            <Button fullWidth onPress={() => setModalVisible(false)}>
              Close window
            </Button>
          </View>
          <Dialog.Container visible={confirmVisible}>
            <Dialog.Title>Shopping list delete</Dialog.Title>
            <Dialog.Description>
              Are you sure you wish to delete &quot;{label}&quot; shopping list?
            </Dialog.Description>
            <Dialog.Button
              label="Cancel"
              onPress={() => setConfirmVisible(false)}
            />
            <Dialog.Button
              label="Delete"
              onPress={handleDelete}
              color={ColorList.error}
            />
          </Dialog.Container>
        </View>
      </Modal>
    </View>
  );
};

type ListProps = {
  state: DrawerNavigationState<ParamListBase>;
  navigation: DrawerNavigationHelpers;
  descriptors: DrawerDescriptorMap;
};

export const DrawerItemList: React.FC<ListProps> = ({
  state,
  navigation,
  descriptors,
}) => {
  const buildLink = useLinkBuilder();
  const [removeList] = useRemoveListMutation();

  return (
    <View style={styles.listStyles}>
      {state.routes.map((route, i) => {
        const focused = i === state.index;
        const onPress = () => {
          const event = navigation.emit({
            type: 'drawerItemPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!event.defaultPrevented) {
            navigation.dispatch({
              ...(focused
                ? DrawerActions.closeDrawer()
                : CommonActions.navigate({name: route.name, merge: true})),
              target: state.key,
            });
          }
        };

        const onDelete = () => {
          removeList(route.name);
        };

        const {
          title,
          drawerLabel,
          drawerIcon,
          drawerLabelStyle,
          drawerItemStyle,
          drawerAllowFontScaling,
        } = descriptors[route.key].options;

        return (
          <DrawerItem
            key={route.key}
            label={
              drawerLabel !== undefined
                ? drawerLabel
                : title !== undefined
                ? title
                : route.name
            }
            focused={focused}
            icon={drawerIcon}
            allowFontScaling={drawerAllowFontScaling}
            labelStyle={drawerLabelStyle}
            style={drawerItemStyle}
            to={buildLink(route.name, route.params)}
            onPress={onPress}
            onDelete={onDelete}
            list={route.params?.list}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  listStyles: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginLeft: -10,
    paddingLeft: 8,
  },
  itemStyles: {
    borderRadius: 16,
    flex: 0,
    width: Dimensions.get('screen').width / 2 - 15,
    height: Dimensions.get('screen').height / 6,
    marginLeft: 10,
    marginTop: 10,
  },
  linkStyles: {
    display: 'flex',
    paddingHorizontal: 16,
    paddingVertical: 16,
    flex: 1,
    width: '100%',
    height: '100%',
  },
  buttonContent: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    flex: 1,
    height: 250,
  },
});
