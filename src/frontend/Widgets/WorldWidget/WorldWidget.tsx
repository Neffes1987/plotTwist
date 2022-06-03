import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { CharacterType, IChallengeModel, ICharacterModel } from '@backend';

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
  const { worldInfo, onEditWorld, onOpenWorldProperty, characters } = props;
  const { edge, world, laws, waterholes } = worldInfo;
  const { worldType } = world;
  const { rewards, challenges } = edge;

  if (!worldType) {
    return null;
  }

  function calculateCharacterQuantity(): Record<CharacterType, number> {
    const result: Record<CharacterType, number> = {
      ally: 0,
      enemy: 0,
      guard: 0,
      mentor: 0,
      messenger: 0,
      shadow: 0,
    };

    characters?.forEach((character: ICharacterModel) => {
      result[character.type] += 1;
    });

    return result;
  }

  function collectBrokenLaws(): number {
    const brokenLaws: string[] = [];
    const uniqueBrokenLaws: Record<string, boolean> = {};

    if (edge?.info?.brokenLawIds.length) {
      brokenLaws.push(...edge.info.brokenLawIds);
    }

    edge.challenges.forEach((challenge: IChallengeModel) => {
      brokenLaws.push(...challenge.brokenLawIds);
    });

    brokenLaws.forEach((lawId: string) => {
      uniqueBrokenLaws[lawId] = true;
    });

    return Object.keys(uniqueBrokenLaws).length;
  }

  function onToggleWorldBody(): void {
    setIsShowWorldBody((prevState: boolean) => !prevState);
  }

  return (
    <Flex direction="column">
      <Flex direction="row" justify="space-between" backgroundColor="accentGray" gap={4}>
        <IconButton color="neutralGreen" iconType="faq" onPress={(): void => setIsShowWorldFaqPopover(true)} />

        <Flex justify="center" onPress={onToggleWorldBody}>
          <Typography>{t(`worldWidget.${world}.caption`)}</Typography>
        </Flex>

        <IconButton color="neutralGreen" iconType="pencil" onPress={(): void => onEditWorld(worldType)} />
      </Flex>

      {isShowWorldBody && (
        <Flex backgroundColor="accentWhite" direction="column">
          <Flex>
            <Card title={t('worldWidget.npc.caption')}>
              {Object.keys(calculateCharacterQuantity()).map((type: string) => (
                <PropertyRow key={type} onPress={onOpenWorldProperty} caption={t(`worldWidget.npc.${type}`)} quantity={`${charactersTotal[type]}`} id={type} />
              ))}
            </Card>

            <Card title={t('worldWidget.worldInfo.caption')}>
              <PropertyRow
                onPress={onOpenWorldProperty}
                caption={t('worldWidget.worldInfo.brokenLaws')}
                quantity={`${collectBrokenLaws()}/${laws.length}`}
                id="brokenLaws"
              />

              <PropertyRow
                onPress={onOpenWorldProperty}
                caption={t('worldWidget.worldInfo.activeCalls')}
                quantity={`${calls.active}/${edge.calls.length}`}
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
              quantity={`${rewards.collected}/${rewards.length}`}
              caption={t('worldWidget.edgeInfo.rewards')}
              id="rewards"
            />

            <PropertyRow
              onPress={onOpenWorldProperty}
              quantity={`${challenges.active}/${edge.challenges.length}`}
              caption={t('worldWidget.edgeInfo.activeChallenges')}
              id="activeChallenges"
            />

            <PropertyRow
              onPress={onOpenWorldProperty}
              quantity={`${challenges.passed}/${edge.challenges.length}`}
              caption={t('worldWidget.edgeInfo.passedChallenges')}
              id="passedChallenges"
            />

            <PropertyRow
              onPress={onOpenWorldProperty}
              quantity={`${challenges.failed}/${edge.challenges.length}`}
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
