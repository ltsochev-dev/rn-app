import React from 'react';
import {View, Text} from 'react-native';

interface Props {
  name: string;
  note?: string;
  complete: boolean;
}

const Product: React.FC<Props> = ({name, note, complete}) => (
  <View className="flex flex-row gap-2">
    <Text className={`text-black ${complete ? 'line-through' : ''}`}>
      {name}
    </Text>
    <Text className="text-black">{note}</Text>
  </View>
);

export default Product;
