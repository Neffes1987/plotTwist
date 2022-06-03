import React, { ReactElement } from 'react';

import { IconButton } from '../../../UI/Buttons/IconButton';
import { Flex } from '../../../UI/Flex/Flex';
import { Typography } from '../../../UI/Typography/Typography';

import { HEADER_BG_COLOR_TYPE, ICON_SIZE_DPI, TITLE_GAP_DPI } from './constants';
import { ScreenHeaderProps } from './interface';

export const ScreenHeader = (props: ScreenHeaderProps): ReactElement => {
  const { onBackClick, title, subtitle, onSettingClick } = props;

  return (
    <>
      <Flex align="flex-start" gapX={4} direction="column" backgroundColor={HEADER_BG_COLOR_TYPE} styles={{ minHeight: 30 }}>
        <Flex justify="space-between">
          {onBackClick ? <IconButton iconType="chevron" color="accentDarkBlue" onPress={onBackClick} size={ICON_SIZE_DPI} /> : null}

          <Flex gapX={4}>
            <Typography mode="title" color="accentDarkBlue">
              {title}
            </Typography>
          </Flex>

          {onSettingClick ? <IconButton size={ICON_SIZE_DPI} iconType="gear" color="accentDarkBlue" onPress={onSettingClick} /> : null}
        </Flex>

        {subtitle && (
          <Flex gapX={ICON_SIZE_DPI + TITLE_GAP_DPI}>
            <Typography>{subtitle}</Typography>
          </Flex>
        )}
      </Flex>
    </>
  );
};
