import React, { PropsWithChildren, ReactElement } from 'react';
import { Text } from 'react-native';

import { UI_COLORS } from '../colors';
import { TypographyProps } from '../interface';

import { TYPOGRAPHY_STYLES } from './constnatns';

export const Typography = (props: PropsWithChildren<TypographyProps>): ReactElement => {
  const { children, mode = 'default', color } = props;

  return <Text style={{ ...TYPOGRAPHY_STYLES[mode], color: color ? UI_COLORS[color] : undefined }}>{children}</Text>;
};
