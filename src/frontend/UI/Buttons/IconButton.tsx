import React, { ReactElement } from 'react';
import { TouchableOpacity } from 'react-native';

import { UI_COLORS } from '../colors';
import { Flex } from '../Flex/Flex';
import { Icon } from '../Icon/Icon';
import { IconButtonProps } from '../interface';

import { BUTTON_STYLES_CONFIG } from './constants';

export const IconButton = (props: IconButtonProps): ReactElement => {
  const { size = 20, color, iconType, ...rest } = props;

  const iconForegroundColor = color ?? 'accentLightGray';

  return (
    <TouchableOpacity
      {...rest}
      style={{
        ...BUTTON_STYLES_CONFIG.round,
        width: size,
        height: size,
        borderColor: UI_COLORS[iconForegroundColor],
      }}
    >
      <Flex justify="space-around">
        <Icon type={iconType} color={iconForegroundColor} />
      </Flex>
    </TouchableOpacity>
  );
};
