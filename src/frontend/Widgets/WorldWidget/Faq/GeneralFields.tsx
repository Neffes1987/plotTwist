import React from 'react';
import { useTranslation } from 'react-i18next';

import { COMMON_WORLD_FIELDS_CONFIG } from '../../../../constants';
import { Card } from '../../../UI/Card/Card';
import { Flex } from '../../../UI/Flex/Flex';
import { Typography } from '../../../UI/Typography/Typography';
import { WorldWidgetProps } from '../interface';

export const GeneralFields = (props: Pick<WorldWidgetProps, 'worldInfo'>): JSX.Element => {
  const { worldInfo } = props;
  const { t } = useTranslation();

  return (
    <Flex direction="column" align="flex-start" testID="faq-general">
      {COMMON_WORLD_FIELDS_CONFIG.map(({ name, label }) => (
        <Card key={name} title={t(label)} fullWidth>
          <Typography>{worldInfo[name]}</Typography>
        </Card>
      ))}
    </Flex>
  );
};
