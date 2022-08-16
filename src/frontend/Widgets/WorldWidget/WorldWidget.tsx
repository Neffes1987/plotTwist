import React, { ReactElement, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton } from '../../UI/Buttons/IconButton';
import { Drawer } from '../../UI/Drawer/Drawer';
import { Flex } from '../../UI/Flex/Flex';
import { Typography } from '../../UI/Typography/Typography';

import { EdgeBlock } from './EdgeBlock/EdgeBlock';
import { Faq } from './Faq/Faq';
import { WorldWidgetProps } from './interface';
import { NPCBlock } from './NPCBlock/NPCBlock';
import { WorldInfoBlock } from './WorldInfoBlock/WorldInfoBlock';

export const WorldWidget = (props: WorldWidgetProps): Nullable<ReactElement> => {
  const { t } = useTranslation();
  const [isShowWorldFaqPopover, setIsShowWorldFaqPopover] = useState(false);
  const [isShowWorldBody, setIsShowWorldBody] = useState(false);
  const { worldInfo, onEditWorld, onOpenWorldProperty } = props;
  const { type, id } = worldInfo;

  if (!type) {
    return null;
  }

  function onToggleWorldBody(): void {
    setIsShowWorldBody((prevState: boolean) => !prevState);
  }

  function onCloseFaqHandler(): void {
    setIsShowWorldFaqPopover(false);
  }

  return (
    <Flex direction="column" fullWidth marginY={4} radius={8}>
      <Flex direction="row" justify="space-between" backgroundColor="accentGray" gap={4}>
        <IconButton color="neutralGreen" iconType="faq" onPress={(): void => setIsShowWorldFaqPopover(true)} />

        <Flex justify="center" onPress={onToggleWorldBody} flex={1}>
          <Typography>{t(`widget.worldWidgetInfo.labels.captions.${type}`)}</Typography>
        </Flex>

        <IconButton color="neutralGreen" iconType="pencil" onPress={(): void => onEditWorld(type, id)} />
      </Flex>

      {isShowWorldBody && (
        <Flex backgroundColor="accentWhite" direction="column" align="flex-start">
          <Flex align="flex-start" marginY={4}>
            <NPCBlock onOpenWorldProperty={onOpenWorldProperty} />

            <WorldInfoBlock onOpenWorldProperty={onOpenWorldProperty} />
          </Flex>

          <EdgeBlock onOpenWorldProperty={onOpenWorldProperty} />
        </Flex>
      )}

      <Drawer caption={t(`widget.worldWidgetInfo.labels.faq.${type}`)} isOpen={isShowWorldFaqPopover} onClose={onCloseFaqHandler}>
        <Faq worldInfo={worldInfo} />
      </Drawer>
    </Flex>
  );
};
