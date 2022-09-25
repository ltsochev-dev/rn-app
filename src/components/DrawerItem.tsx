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
import ColorList, {hexToRgba} from '@src/styles/colors';
import React from 'react';
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
} from 'react-native';

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
  activeTintColor?: string;
  inactiveTintColor: string;
  activeBackgroundColor?: string;
  inactiveBackgroundColor?: string;
  pressColor?: string;
  pressOpacity?: number;
  labelStyle?: StyleProp<TextStyle>;
  style?: StyleProp<ViewStyle>;
  allowFontScaling?: boolean;
}

export const DrawerItem: React.FC<Props> = ({
  icon,
  label,
  labelStyle,
  to,
  focused = false,
  allowFontScaling,
  activeTintColor = ColorList.light,
  inactiveTintColor = hexToRgba(ColorList.white, 0.68),
  activeBackgroundColor = hexToRgba(ColorList.white, 0.2),
  inactiveBackgroundColor = hexToRgba(activeTintColor, 0.12),
  style,
  onPress,
  pressColor,
  pressOpacity,
  ...props
}) => {
  const {borderRadius = 16} = StyleSheet.flatten(style || {});
  const color = focused ? activeTintColor : inactiveTintColor;
  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  const iconNode = icon ? icon({size: 24, focused, color}) : null;
  return (
    <View
      collapsable={false}
      {...props}
      style={{...styles.itemStyles, backgroundColor, borderRadius}}>
      <TouchableOpacity
        onPress={onPress}
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
          <Text className="text-sm text-tahiti-green-100">
            {Math.round(Math.random() * 10)} products total
          </Text>
        </View>
      </TouchableOpacity>
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
    justifyContent: 'space-around',
  },
  itemStyles: {
    borderRadius: 16,
    flex: 0,
    width: Dimensions.get('screen').width / 2 - 15,
    height: Dimensions.get('screen').height / 6,
    marginTop: 15,
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
