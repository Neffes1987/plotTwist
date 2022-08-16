import React from 'react';
import { useTranslation } from 'react-i18next';
import { useRoute } from '@react-navigation/native';

import { Flex } from '../../UI/Flex/Flex';
import { Typography } from '../../UI/Typography/Typography';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';
import { RouteParams } from '../interface';

export const OopsErrorScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { params } = useRoute<RouteParams>();
  const { state } = params;
  const { key = '', options } = state?.error ?? {};

  return (
    <ScreenView>
      <Flex direction="column">
        <Typography>{t('errors.oops')}</Typography>

        {key && <Typography>{t(key, options)}</Typography>}
      </Flex>
    </ScreenView>
  );
};
