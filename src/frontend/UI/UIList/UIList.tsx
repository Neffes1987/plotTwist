import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton } from '../Buttons/IconButton';
import { Flex } from '../Flex/Flex';
import { IconType } from '../interface';
import { ListItem } from '../ListItem/ListItem';
import { Typography } from '../Typography/Typography';

import { UIListProps } from './interface';

export const UIList = (props: UIListProps): ReactElement => {
  const { list, selected, emptyListCaption = 'messages.emptyList', onEdit, onOpen, onCreate } = props;
  const { t } = useTranslation();

  return (
    <>
      <Flex direction="column" justify="flex-start" align="flex-start" fullWidth padX={4} marginY={12}>
        {list.map(item =>
          'id' in item ? (
            <ListItem
              customIcon={item.icon as IconType}
              selected={item.isSelected ?? selected === item.id}
              onOpen={onOpen}
              key={item.id as string}
              onEdit={onEdit}
              propertyId={item.id as string}
              caption={item.translate ?? true ? t(item.name) : item.name}
            />
          ) : (
            item
          ),
        )}
      </Flex>

      <Flex padY={20}>{!list.length && <Typography color="accentDarkBlue">{t(emptyListCaption)}</Typography>}</Flex>

      {onCreate && <IconButton onPress={onCreate} iconType="plus" size={40} color="primary" />}

      <Flex padY={20} />
    </>
  );
};
