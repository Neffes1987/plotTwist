import React, { PropsWithChildren, ReactElement } from 'react';
import { Text } from 'react-native';

import { UI_COLORS } from '../colors';
import { Flex } from '../Flex/Flex';
import { TypographyProps } from '../interface';

import { TYPOGRAPHY_STYLES } from './constnatns';

export const Typography = (props: PropsWithChildren<TypographyProps>): ReactElement => {
  const { children, mode = 'default', color, align } = props;

  return (
    <Flex direction="row" shrink={1}>
      <Text style={{ ...TYPOGRAPHY_STYLES[mode], color: color ? UI_COLORS[color] : UI_COLORS.accentDarkBlue, textAlign: align }}>{children}</Text>
    </Flex>
  );
};
