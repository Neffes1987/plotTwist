import React from 'react';
import { useTranslation } from 'react-i18next';

import { Flex } from '../../Flex/Flex';
import { Typography } from '../../Typography/Typography';
import { ItemRowProps } from '../interface';

export const ItemRow = (props: ItemRowProps): JSX.Element => {
  const { title, value, margin } = props;
  const { t } = useTranslation();

  return (
    <Flex justify="space-between" fullWidth wrap="wrap" marginX={margin} marginY={margin}>
      <Typography color="accentDarkBlue" mode="caption-bold">
        {t(title)}
      </Typography>

      <Typography>{value}</Typography>
    </Flex>
  );
};
