import React from 'react';
import {styled} from 'nativewind';
import {
  SafeAreaView,
  type SafeAreaViewProps,
} from 'react-native-safe-area-context';
import {View, StyleSheet} from 'react-native';

const StyledView = styled(SafeAreaView);
const RoundedView = styled(View);

interface Props {
  bgClassname?: string;
}

const MainView: React.FC<SafeAreaViewProps & Props> = ({
  children,
  bgClassname = 'bg-white',
  ...props
}) => (
  <StyledView {...props} className="bg-dark-blue flex-1">
    <RoundedView
      className={`${bgClassname} flex-1 p-2 pt-4 mt-2`}
      style={styles.roundedView}>
      {children}
    </RoundedView>
  </StyledView>
);

const styles = StyleSheet.create({
  roundedView: {
    borderRadius: 18,
  },
});

export default MainView;
