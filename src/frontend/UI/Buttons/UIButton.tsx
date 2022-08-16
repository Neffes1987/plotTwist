import React, { PropsWithChildren, ReactElement } from 'react';

import { Flex } from '../Flex/Flex';
import { ColorType, UIButtonProps } from '../interface';
import { Typography } from '../Typography/Typography';

import { BUTTON_STYLES_CONFIG } from './constants';

export const UIButton = (props: PropsWithChildren<UIButtonProps>): ReactElement => {
  const { children, type = 'secondary', fullWidth, ...rest } = props;
  const color: ColorType = type === 'primary' ? 'accentWhite' : 'accentDarkBlue';

  const styles = { ...BUTTON_STYLES_CONFIG[type] };

  return (
    <Flex fullWidth={fullWidth} justify="center" align="center" styles={styles} {...rest} shadowType="l1">
      {typeof children === 'string' ? <Typography color={color}>{children}</Typography> : children}
    </Flex>
  );
};
