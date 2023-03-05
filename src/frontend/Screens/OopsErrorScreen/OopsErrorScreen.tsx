import React from 'react';
import { useTranslation } from 'react-i18next';

import { useAppNavigation } from '../../Hooks/useAppNavigation';
import { Flex } from '../../UI/Flex/Flex';
import { Typography } from '../../UI/Typography/Typography';
import { ScreenView } from '../../Widgets/ScreenView/ScreenView';

export const OopsErrorScreen = (): JSX.Element => {
  const { t } = useTranslation();
  const { state } = useAppNavigation();

  return (
    <ScreenView>
      <Flex direction="column">
        <Typography>{t('errors.oops')}</Typography>

        {state?.error && 'key' in state.error && <Typography>{t(state.error.key, state.error.options)}</Typography>}
      </Flex>
    </ScreenView>
  );
};
