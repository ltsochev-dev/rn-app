import React, {type PropsWithChildren} from 'react';
import {StatusBar} from 'react-native';
import ColorList from '@src/styles/colors';
import MainView from './MainView';

interface Props {
  MainViewProps?: any;
}

const BaseLayout: React.FC<PropsWithChildren<Props>> = ({
  children,
  ...props
}) => {
  return (
    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor={ColorList.darkBlue}
      />
      <MainView {...props.MainViewProps}>{children}</MainView>
    </>
  );
};

export default BaseLayout;
