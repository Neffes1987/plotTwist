import React from 'react';
import { useTranslation } from 'react-i18next';

import { optionsListTranslations } from '../../App/initI18n/schemas/common-options';
import { UIButton } from '../Buttons/UIButton';
import { Divider } from '../Divider/Divider';
import { Drawer } from '../Drawer/Drawer';
import { Flex } from '../Flex/Flex';
import { Typography } from '../Typography/Typography';

import { ConfirmDrawerProps } from './interface';

export const ConfirmDrawer = (props: ConfirmDrawerProps): JSX.Element => {
  const { description, isOpen, onClose, onConfirm } = props;
  const { t } = useTranslation();

  return (
    <Drawer caption={t(optionsListTranslations.lists.confirm.caption)} isOpen={isOpen} onClose={onClose}>
      <Flex fullWidth direction="column">
        <Typography>{description}</Typography>

        <Flex direction="column" fullWidth>
          <UIButton fullWidth onPress={onConfirm}>
            {t(optionsListTranslations.lists.confirm.yes)}
          </UIButton>

          <Divider verticalGap={4} />

          <UIButton fullWidth onPress={onClose}>
            {t(optionsListTranslations.lists.confirm.no)}
          </UIButton>
        </Flex>
      </Flex>
    </Drawer>
  );
};
