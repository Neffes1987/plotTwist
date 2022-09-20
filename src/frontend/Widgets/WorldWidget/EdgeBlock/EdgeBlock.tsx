import React from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../../Screens/routes';
import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';
import { worldWidgetEdgeTranslations } from '../worldWidgetTranslations';

export const EdgeBlock = ({ onOpenWorldProperty }: Pick<WorldWidgetProps, 'onOpenWorldProperty'>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Card title={t(worldWidgetEdgeTranslations.caption)} align="flex-start" fullWidth testID="edge-block">
      <PropertyRow onPress={onOpenWorldProperty} caption={t(worldWidgetEdgeTranslations.caption)} id={ROUTES.aboutEdge} />

      <PropertyRow onPress={onOpenWorldProperty} quantity={`${0}/${0}`} caption={t(worldWidgetEdgeTranslations.labels.rewards)} id={ROUTES.rewards} />

      <PropertyRow
        onPress={onOpenWorldProperty}
        quantity={`${0}/${0}`}
        caption={t(worldWidgetEdgeTranslations.labels.activeChallenges)}
        id={ROUTES.activeChallenges}
      />

      <PropertyRow
        onPress={onOpenWorldProperty}
        quantity={`${0}/${0}`}
        caption={t(worldWidgetEdgeTranslations.labels.passedChallenges)}
        id={ROUTES.passedChallenges}
      />

      <PropertyRow
        onPress={onOpenWorldProperty}
        quantity={`${0}/${0}`}
        caption={t(worldWidgetEdgeTranslations.labels.failedChallenges)}
        id={ROUTES.failedChallenges}
      />
    </Card>
  );
};
