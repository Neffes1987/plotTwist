import React from 'react';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native';

import { ActivePlotWorld } from '../../../../types/entities/world';
import { COMMON_WORLD_FIELDS_CONFIG } from '../../../App/initI18n/schemas/worldTranslations';
import { Card } from '../../../UI/Card/Card';
import { Flex } from '../../../UI/Flex/Flex';
import { Typography } from '../../../UI/Typography/Typography';

export const Faq = (props: Pick<ActivePlotWorld, 'worldData'>): JSX.Element => {
  const { worldData } = props;
  const { t } = useTranslation();

  return (
    <Flex testID="faq-block">
      <ScrollView>
        <Flex direction="column" align="flex-start" testID="faq-general">
          {COMMON_WORLD_FIELDS_CONFIG.map(({ name, label }) => (
            <Card key={name} title={t(label)} fullWidth>
              <Typography>{worldData[name]}</Typography>
            </Card>
          ))}
        </Flex>

        <Flex height={120} />
      </ScrollView>
    </Flex>
  );
};
