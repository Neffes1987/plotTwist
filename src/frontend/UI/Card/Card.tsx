import React, { PropsWithChildren, ReactElement } from 'react';
import { ViewStyle } from 'react-native';

import { UI_COLORS } from '../colors';
import { Flex } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';

import { CardProps } from './interface';

const DefaultPropertyGroupStyle: ViewStyle = {
  borderColor: UI_COLORS.accentGray,
  borderStyle: 'solid',
  margin: 2,
  borderRadius: 8,
};

const BorderedPropertyGroupStyle: ViewStyle = {
  ...DefaultPropertyGroupStyle,
  borderWidth: 1,
};

export const Card = ({ children, title, color, bordered = true }: PropsWithChildren<CardProps>): ReactElement => {
  return (
    <Flex direction="column" styles={bordered ? BorderedPropertyGroupStyle : DefaultPropertyGroupStyle} gap={4} backgroundColor={color}>
      {title && (
        <Flex gapY={4}>
          <Typography mode="caption-bold" color="accentGray">
            {title}
          </Typography>
        </Flex>
      )}

      {children}
    </Flex>
  );
};
