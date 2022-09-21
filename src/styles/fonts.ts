import {Platform} from 'react-native';

const FontList = {
  headerTitle: 'BadScript-Regular',
  ...Platform.select({
    ios: {
      regular: 'San Francisco',
    },
    android: {
      regular: 'Roboto',
    },
  }),
};

export default FontList;
