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

const DrawerItem: React.FC<Props> = ({
  icon,
  label,
  labelStyle,
  to,
  focused = false,
  allowFontScaling,
  activeTintColor = ColorList.light,
  inactiveTintColor = hexToRgba(ColorList.white, 0.68),
  activeBackgroundColor = hexToRgba(activeTintColor, 0.12),
  inactiveBackgroundColor = 'transparent',
  style,
  onPress,
  pressColor,
  pressOpacity,
  ...props
}) => {
  const {borderRadius = 4} = StyleSheet.flatten(style || {});
  const color = focused ? activeTintColor : inactiveTintColor;
  const backgroundColor = focused
    ? activeBackgroundColor
    : inactiveBackgroundColor;

  // @todo - finish this module

  const iconNode = icon ? icon({size: 24, focused, color}) : null;
  return (
    <View collapsable={false} {...props}>
      <TouchableOpacity
        onPress={onPress}
        accessibilityRole="button"
        accessibilityState={{selected: focused}}
        className="flex-row">
        <View>
          {iconNode}
          <Text>Hello World</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default DrawerItem;
