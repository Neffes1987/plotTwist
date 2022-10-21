import React, { ReactElement } from 'react';

import { IconButton } from '../../../UI/Buttons/IconButton';
import { Flex } from '../../../UI/Flex/Flex';
import { Typography } from '../../../UI/Typography/Typography';

import { ICON_SIZE_DPI, TITLE_GAP_DPI } from './constants';
import { ScreenHeaderProps } from './interface';

export const ScreenHeader = (props: ScreenHeaderProps): ReactElement => {
  const { onBackClick, title, subtitle, onRightIconClick, rightIconType } = props;

  return (
    <Flex shadowType="l1" fullWidth align="flex-start" justify="center" gapX={8} direction="column" backgroundColor="accentWhite" styles={{ minHeight: 30 }}>
      <Flex justify="space-between">
        {onBackClick ? <IconButton iconType="chevron" color="accentDarkBlue" onPress={onBackClick} size={ICON_SIZE_DPI} /> : null}

        <Flex gapX={4} grow={1}>
          <Typography mode="title" color="accentDarkBlue">
            {title}
          </Typography>
        </Flex>

        {onRightIconClick && rightIconType ? (
          <IconButton size={ICON_SIZE_DPI} iconType={rightIconType} color="accentDarkBlue" onPress={onRightIconClick} />
        ) : null}
      </Flex>

      {subtitle && (
        <Flex gapX={ICON_SIZE_DPI + TITLE_GAP_DPI}>
          <Typography>{subtitle}</Typography>
        </Flex>
      )}
    </Flex>
  );
};
