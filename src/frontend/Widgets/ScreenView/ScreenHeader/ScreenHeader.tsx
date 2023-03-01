import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton } from '../../../UI/Buttons/IconButton';
import { Flex } from '../../../UI/Flex/Flex';
import { Typography } from '../../../UI/Typography/Typography';

import { ICON_SIZE_DPI, TITLE_GAP_DPI } from './constants';
import { ScreenHeaderProps } from './interface';

export const ScreenHeader = (props: ScreenHeaderProps): ReactElement => {
  const { onBackClick, title, subtitle, onRightIconClick, rightIconType } = props;
  const { t } = useTranslation();

  return (
    <Flex shadowType="l1" align="flex-start" justify="center" padX={8} direction="column" backgroundColor="accentWhite" styles={{ minHeight: 30 }}>
      <Flex justify="space-between" fullWidth>
        {onBackClick ? <IconButton iconType="chevron" color="accentDarkBlue" onPress={onBackClick} size={ICON_SIZE_DPI} /> : null}

        <Flex padX={4}>
          <Typography mode="title" color="accentDarkBlue">
            {t(title)}
          </Typography>
        </Flex>

        {onRightIconClick && rightIconType ? (
          <IconButton size={ICON_SIZE_DPI} iconType={rightIconType} color="accentDarkBlue" onPress={onRightIconClick} />
        ) : null}
      </Flex>

      {subtitle && (
        <Flex padX={ICON_SIZE_DPI + TITLE_GAP_DPI}>
          <Typography>{t(subtitle)}</Typography>
        </Flex>
      )}
    </Flex>
  );
};
