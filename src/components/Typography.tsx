import React, {type PropsWithChildren} from 'react';
import {Text, StyleSheet, type TextProps} from 'react-native';
import FontList from '@src/styles/fonts';
import {styled} from 'nativewind';

interface TypographyProps {
  font?: keyof typeof FontList;
}

const StyledText = styled(Text);

const Typography: React.FC<PropsWithChildren<TypographyProps & TextProps>> = ({
  children,
  font = 'regular',
  ...props
}) => (
  <StyledText style={styles[font]} {...props}>
    {children}
  </StyledText>
);

const styles = StyleSheet.create({
  regular: {
    fontFamily: FontList.regular,
  },
  headerTitle: {
    fontFamily: FontList.headerTitle,
  },
});

export default Typography;
