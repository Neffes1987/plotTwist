import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { ROUTES } from '../../Screens/routes';
import { IconButton } from '../../UI/Buttons/IconButton';
import { Drawer } from '../../UI/Drawer/Drawer';
import { Flex } from '../../UI/Flex/Flex';
import { Icon } from '../../UI/Icon/Icon';
import { Typography } from '../../UI/Typography/Typography';

import { EdgeBlock } from './EdgeBlock/EdgeBlock';
import { Faq } from './Faq/Faq';
import { WorldWidgetProps } from './interface';
import { NPCBlock } from './NPCBlock/NPCBlock';
import { WorldInfoBlock } from './WorldInfoBlock/WorldInfoBlock';
import { worldWidgetInfoTranslations } from './worldWidgetTranslations';

export const WorldWidget = (props: WorldWidgetProps): Nullable<ReactElement> => {
  const { t } = useTranslation();
  const [isShowWorldFaqPopover, setIsShowWorldFaqPopover] = useState(false);
  const [isShowWorldBody, setIsShowWorldBody] = useState(false);
  const { worldInfo, onEditWorld, onOpenWorldProperty } = props;
  const { type, id, status } = worldInfo;
  const isWorldReady = status === 'release';

  if (!type) {
    return null;
  }

  function onToggleWorldBody(): void {
    setIsShowWorldBody((prevState: boolean) => !prevState);
  }

  function onCloseFaqHandler(): void {
    setIsShowWorldFaqPopover(false);
  }

  function onClickPropertyHandler(propertyType: string): void {
    if (propertyType === ROUTES.aboutWorld) {
      setIsShowWorldFaqPopover(true);

      return;
    }

    onOpenWorldProperty(propertyType, id);
  }

  return (
    <Flex direction="column" fullWidth marginY={4} radius={8}>
      <Flex direction="row" justify="space-between" backgroundColor="accentGray" gap={4}>
        <IconButton color="neutralGreen" iconType="faq" onPress={(): void => setIsShowWorldFaqPopover(true)} />

        <Flex justify="center" onPress={onToggleWorldBody} flex={1}>
          <Typography>{t(worldWidgetInfoTranslations.lists.captions[type])}</Typography>

          <Icon type={isWorldReady ? 'tick' : 'flame'} color={isWorldReady ? 'primary' : 'neutralRed'} />
        </Flex>

        <IconButton color="neutralGreen" iconType="pencil" onPress={(): void => onEditWorld(type, id)} />
      </Flex>

      {isShowWorldBody && (
        <Flex backgroundColor="accentWhite" direction="column" align="flex-start">
          {!isWorldReady && (
            <Typography mode="error" color="neutralRed">
              {t('errors.worldInDraft')}
            </Typography>
          )}

          <Flex align="flex-start" marginY={4}>
            <NPCBlock onOpenWorldProperty={onOpenWorldProperty} worldInfo={worldInfo} />

            <WorldInfoBlock worldInfo={worldInfo} onOpenWorldProperty={onClickPropertyHandler} />
          </Flex>

          <EdgeBlock onOpenWorldProperty={onOpenWorldProperty} worldInfo={worldInfo} />
        </Flex>
      )}

      <Drawer caption={t(worldWidgetInfoTranslations.lists.faq[type])} isOpen={isShowWorldFaqPopover} onClose={onCloseFaqHandler}>
        <Faq worldInfo={worldInfo} />
      </Drawer>
    </Flex>
  );
};
