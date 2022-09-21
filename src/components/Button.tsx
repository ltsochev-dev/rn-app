import ColorList from '@src/styles/colors';
import React, {type PropsWithChildren, ReactNode} from 'react';
import {
  GestureResponderEvent,
  TouchableOpacity,
  StyleSheet,
  View,
} from 'react-native';
import Typography from './Typography';

interface Props {
  backgroundColor?: string;
  textColor?: string;
  disabled?: boolean;
  startIcon?: ReactNode;
  onPress?: (e: GestureResponderEvent) => void;
}

const Button: React.FC<PropsWithChildren<Props>> = ({
  onPress,
  backgroundColor = ColorList.light,
  textColor = ColorList.black,
  disabled = false,
  startIcon,
  children,
}) => {
  const minWidth = 200;

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.6}
      disabled={disabled}
      style={{
        ...styles.buttonBase,
        backgroundColor,
        minWidth,
      }}>
      {startIcon && <View className="mx-2">{startIcon}</View>}
      <Typography style={{...styles.buttonText, color: textColor}}>
        {children}
      </Typography>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonBase: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderWidth: 1,
    borderColor: 'transparent',
  },
  buttonText: {
    fontSize: 15,
    lineHeight: 23,
    textAlign: 'center',
    opacity: 1,
  },
});

export default Button;
