import React, { PropsWithChildren, ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

import { ColorType, UIButtonProps } from '../interface';
import { Typography } from '../Typography/Typography';

import { BUTTON_STYLES_CONFIG } from './constants';

export const UIButton = (props: PropsWithChildren<UIButtonProps>): ReactElement => {
  const { children, type = 'secondary', ...rest } = props;
  const color: ColorType = type === 'primary' ? 'accentWhite' : 'accentDarkBlue';

  return (
    <TouchableOpacity {...rest} style={BUTTON_STYLES_CONFIG[type]}>
      {typeof children === 'string' ? <Typography color={color}>{children}</Typography> : children}
    </TouchableOpacity>
  );
};
