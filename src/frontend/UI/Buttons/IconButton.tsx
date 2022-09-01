import React, { ReactElement } from 'react';

import { UI_COLORS } from '../colors';
import { Flex } from '../Flex/Flex';
import { Icon } from '../Icon/Icon';
import { IconButtonProps } from '../interface';

import { BUTTON_STYLES_CONFIG } from './constants';

export const IconButton = (props: IconButtonProps): ReactElement => {
  const { size = 20, color, iconType, rotate, ...rest } = props;

  const iconForegroundColor = color ?? 'accentDarkBlue';

  return (
    <Flex
      justify="space-around"
      styles={{
        ...BUTTON_STYLES_CONFIG.round,
        width: size,
        height: size,
        borderColor: UI_COLORS[iconForegroundColor],
        transform: rotate ? [{ rotateY: `${rotate}deg` }] : undefined,
      }}
      {...rest}
    >
      <Icon type={iconType} color={iconForegroundColor} />
    </Flex>
  );
};
