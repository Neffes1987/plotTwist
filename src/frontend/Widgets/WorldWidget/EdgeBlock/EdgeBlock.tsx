import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';
import { worldWidgetEdgeTranslations } from '../worldWidgetTranslations';

export const EdgeBlock = ({ onOpenWorldProperty }: Pick<WorldWidgetProps, 'onOpenWorldProperty'>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Card title={t(worldWidgetEdgeTranslations.caption)} align="flex-start" fullWidth testID="edge-block">
      <PropertyRow onPress={onOpenWorldProperty} caption={t(worldWidgetEdgeTranslations.caption)} id="aboutEdge" />

      <PropertyRow onPress={onOpenWorldProperty} quantity={`${0}/${0}`} caption={t(worldWidgetEdgeTranslations.labels.rewards)} id="rewards" />

      <PropertyRow
        onPress={onOpenWorldProperty}
        quantity={`${0}/${0}`}
        caption={t(worldWidgetEdgeTranslations.labels.activeChallenges)}
        id="activeChallenges"
      />

      <PropertyRow
        onPress={onOpenWorldProperty}
        quantity={`${0}/${0}`}
        caption={t(worldWidgetEdgeTranslations.labels.passedChallenges)}
        id="passedChallenges"
      />

      <PropertyRow
        onPress={onOpenWorldProperty}
        quantity={`${0}/${0}`}
        caption={t(worldWidgetEdgeTranslations.labels.failedChallenges)}
        id="failedChallenges"
      />
    </Card>
  );
};
