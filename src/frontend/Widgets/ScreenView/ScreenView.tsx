import React, { PropsWithChildren, ReactElement } from 'react';
import { Dimensions, SafeAreaView, ScrollView, useColorScheme } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';

import { Flex } from '../../UI/Flex/Flex';

import { ScreenViewProps } from './interface';
import { ScreenHeader } from './ScreenHeader/ScreenHeader';

export const ScreenView = (props: PropsWithChildren<ScreenViewProps>): ReactElement => {
  const { children, header, ...rest } = props;

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    height: Dimensions.get('window').height,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {header && <ScreenHeader {...header} />}

      <ScrollView {...rest} contentInsetAdjustmentBehavior={rest.contentInsetAdjustmentBehavior ?? 'automatic'} style={backgroundStyle}>
        <Flex gapX={8}>{children}</Flex>
      </ScrollView>
    </SafeAreaView>
  );
};
