import React, { PropsWithChildren, ReactElement } from 'react';
import { Dimensions, SafeAreaView, ScrollView } from 'react-native';

import { UI_COLORS } from '../../UI/colors';
import { Flex } from '../../UI/Flex/Flex';

import { ScreenViewProps } from './interface';
import { ScreenHeader } from './ScreenHeader/ScreenHeader';

export const ScreenView = (props: PropsWithChildren<ScreenViewProps>): ReactElement => {
  const { children, header, bgColor, ...rest } = props;

  const backgroundStyle = {
    backgroundColor: bgColor ? UI_COLORS[bgColor] : UI_COLORS.accentLightGray,
    height: Dimensions.get('window').height,
  };

  return (
    <SafeAreaView style={backgroundStyle}>
      {header && <ScreenHeader {...header} />}

      <ScrollView {...rest} contentInsetAdjustmentBehavior={rest.contentInsetAdjustmentBehavior ?? 'automatic'} style={backgroundStyle}>
        <Flex direction="column" fullWidth gapX={8}>
          {children}
        </Flex>

        <Flex height={40} />
      </ScrollView>
    </SafeAreaView>
  );
};
