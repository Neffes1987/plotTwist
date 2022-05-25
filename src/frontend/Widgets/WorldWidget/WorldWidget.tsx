import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton } from '../../UI/Buttons/IconButton';
import { Card } from '../../UI/Card/Card';
import { Drawer } from '../../UI/Drawer/Drawer';
import { Flex } from '../../UI/Flex/Flex';
import { Typography } from '../../UI/Typography/Typography';

import { WorldWidgetProps } from './interface';
import { PropertyRow } from './PropertyRow/PropertyRow';

export const WorldWidget = (props: WorldWidgetProps): Nullable<ReactElement> => {
  const { t } = useTranslation();
  const [isShowWorldFaqPopover, setIsShowWorldFaqPopover] = useState(false);
  const [isShowWorldBody, setIsShowWorldBody] = useState(false);
  const { worldType, onEditWorld, onOpenWorldProperty, calls, laws, waterholes, characters, edge } = props;
  const { rewards, challenges } = edge;

  if (!worldType) {
    return null;
  }

  function onToggleWorldBody(): void {
    setIsShowWorldBody((prevState: boolean) => !prevState);
  }

  return (
    <Flex direction="column">
      <Flex direction="row" justify="space-between" backgroundColor="accentGray" gap={4}>
        <IconButton color="neutralGreen" iconType="faq" onPress={(): void => setIsShowWorldFaqPopover(true)} />

        <Flex justify="center" onPress={onToggleWorldBody}>
          <Typography>{t(`worldWidget.${worldType}.caption`)}</Typography>
        </Flex>

        <IconButton color="neutralGreen" iconType="pencil" onPress={(): void => onEditWorld(worldType)} />
      </Flex>

      {isShowWorldBody && (
        <Flex backgroundColor="accentWhite" direction="column">
          <Flex>
            <Card title={t('worldWidget.npc.caption')}>
              {characters.map(({ characterType, quantity }) => (
                <PropertyRow
                  key={characterType}
                  onPress={onOpenWorldProperty}
                  caption={t(`worldWidget.npc.${characterType}`)}
                  quantity={`${quantity}`}
                  id={characterType}
                />
              ))}
            </Card>

            <Card title={t('worldWidget.worldInfo.caption')}>
              <PropertyRow
                onPress={onOpenWorldProperty}
                caption={t('worldWidget.worldInfo.brokenLaws')}
                quantity={`${laws.broken}/${laws.total}`}
                id="brokenLaws"
              />

              <PropertyRow
                onPress={onOpenWorldProperty}
                caption={t('worldWidget.worldInfo.activeCalls')}
                quantity={`${calls.active}/${calls.total}`}
                id="activeCalls"
              />

              <PropertyRow onPress={onOpenWorldProperty} caption={t('worldWidget.worldInfo.waterholes')} quantity={`${waterholes}`} id="waterholes" />

              <PropertyRow onPress={onOpenWorldProperty} caption={t('worldWidget.worldInfo.aboutWorld')} id="aboutWorld" />
            </Card>
          </Flex>

          <Card title={t('worldWidget.edgeInfo.caption')}>
            <PropertyRow onPress={onOpenWorldProperty} caption={t('worldWidget.edgeInfo.aboutEdge')} id="aboutEdge" />

            <PropertyRow
              onPress={onOpenWorldProperty}
              quantity={`${rewards.collected}/${rewards.total}`}
              caption={t('worldWidget.edgeInfo.rewards')}
              id="rewards"
            />

            <PropertyRow
              onPress={onOpenWorldProperty}
              quantity={`${challenges.active}/${challenges.total}`}
              caption={t('worldWidget.edgeInfo.activeChallenges')}
              id="activeChallenges"
            />

            <PropertyRow
              onPress={onOpenWorldProperty}
              quantity={`${challenges.passed}/${challenges.total}`}
              caption={t('worldWidget.edgeInfo.passedChallenges')}
              id="passedChallenges"
            />

            <PropertyRow
              onPress={onOpenWorldProperty}
              quantity={`${challenges.failed}/${challenges.total}`}
              caption={t('worldWidget.edgeInfo.failedChallenges')}
              id="failedChallenges"
            />
          </Card>
        </Flex>
      )}

      <Drawer
        caption={t(`worldWidget.${worldType}.faq.caption`)}
        isOpen={isShowWorldFaqPopover}
        onClose={(): void => {
          setIsShowWorldFaqPopover(false);
        }}
      />
    </Flex>
  );
};
