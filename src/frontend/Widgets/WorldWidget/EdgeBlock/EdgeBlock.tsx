import React from 'react';
import { useTranslation } from 'react-i18next';

import { Card } from '../../../UI/Card/Card';
import { WorldWidgetProps } from '../interface';
import { PropertyRow } from '../parts/PropertyRow/PropertyRow';

export const EdgeBlock = ({ onOpenWorldProperty }: Pick<WorldWidgetProps, 'onOpenWorldProperty'>): JSX.Element => {
  const { t } = useTranslation();

  return (
    <Card title={t('widget.worldWidgetEdge.caption')} align="flex-start" fullWidth testID="edge-block">
      <PropertyRow onPress={onOpenWorldProperty} caption={t('widget.worldWidgetEdge.labels.aboutEdge')} id="aboutEdge" />

      <PropertyRow onPress={onOpenWorldProperty} quantity={`${0}/${0}`} caption={t('widget.worldWidgetEdge.labels.rewards')} id="rewards" />

      <PropertyRow onPress={onOpenWorldProperty} quantity={`${0}/${0}`} caption={t('widget.worldWidgetEdge.labels.activeChallenges')} id="activeChallenges" />

      <PropertyRow onPress={onOpenWorldProperty} quantity={`${0}/${0}`} caption={t('widget.worldWidgetEdge.labels.passedChallenges')} id="passedChallenges" />

      <PropertyRow onPress={onOpenWorldProperty} quantity={`${0}/${0}`} caption={t('widget.worldWidgetEdge.labels.failedChallenges')} id="failedChallenges" />
    </Card>
  );
};
