import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { StatusEnum } from '../../../constants/status.enum';
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
  const { worldInfo, onEditWorld, characters, laws, onToggleWorld, isOpenWorld, waterholes, edge, rewards, tasks } = props;
  const { worldData } = worldInfo;
  const { type, id, status } = worldData;
  const isWorldReady = status === StatusEnum.Released;

  if (!type) {
    return null;
  }

  function onToggleWorldBody(): void {
    onToggleWorld(id);
  }

  function onCloseFaqHandler(): void {
    setIsShowWorldFaqPopover(false);
  }

  return (
    <Flex direction="column" fullWidth marginY={4} radius={8}>
      <Flex direction="row" justify="space-between" backgroundColor="accentGray" pad={4}>
        <IconButton color="neutralGreen" iconType="faq" onPress={(): void => setIsShowWorldFaqPopover(true)} />

        <Flex justify="center" onPress={onToggleWorldBody} flex={1}>
          <Typography>{t(worldWidgetInfoTranslations.lists.captions[type])}</Typography>

          <Icon type={isWorldReady ? 'tick' : 'flame'} color={isWorldReady ? 'primary' : 'neutralRed'} />
        </Flex>

        <IconButton color="neutralGreen" iconType="pencil" onPress={(): void => onEditWorld(type, id)} />
      </Flex>

      {isOpenWorld && (
        <Flex backgroundColor="accentWhite" direction="column" align="flex-start">
          {!isWorldReady && (
            <Typography mode="error" color="neutralRed">
              {t('errors.worldInDraft')}
            </Typography>
          )}

          <Flex align="flex-start" marginY={4}>
            <NPCBlock characters={characters} />

            <WorldInfoBlock waterholes={waterholes} laws={laws} worldInfo={worldInfo} />
          </Flex>

          {!!characters?.length && <EdgeBlock tasks={tasks} rewards={rewards} worldType={worldData?.type} edge={edge} />}
        </Flex>
      )}

      <Drawer caption={t(worldWidgetInfoTranslations.lists.faq[type])} isOpen={isShowWorldFaqPopover} onClose={onCloseFaqHandler}>
        <Faq worldData={worldData} />
      </Drawer>
    </Flex>
  );
};
