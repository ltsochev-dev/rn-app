import React from 'react';
import {View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import Button from './Button';

interface Props {
  onPress?: () => void;
  top?: number;
  right?: number;
  bottom?: number;
  left?: number;
}

const CloseBtn: React.FC<Props> = ({onPress, top = 0, right = 0}) => (
  <View className={`absolute top-${top} right-${right}`}>
    <Button backgroundColor="transparent" onPress={onPress} minWidth={0}>
      <Icon name="close" size={16} />
    </Button>
  </View>
);

export default CloseBtn;
