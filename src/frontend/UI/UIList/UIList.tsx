import React, { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';

import { IconButton } from '../Buttons/IconButton';
import { Flex } from '../Flex/Flex';
import { ListItem } from '../ListItem/ListItem';
import { Typography } from '../Typography/Typography';

import { UIListProps } from './interface';

export const UIList = (props: UIListProps): ReactElement => {
  const { list, emptyListCaption = 'messages.emptyList', onEdit, onOpen, onCreate } = props;
  const { t } = useTranslation();

  return (
    <>
      <Flex direction="column" justify="flex-start" align="flex-start">
        {list.map(({ id = '', name, isSelected }) => (
          <ListItem selected={isSelected} onOpen={onOpen} key={id} onEdit={onEdit} propertyId={id} caption={name} />
        ))}
      </Flex>

      <Flex gapY={40}>{!list.length && <Typography color="accentDarkBlue">{t(emptyListCaption)}</Typography>}</Flex>

      <IconButton onPress={onCreate} iconType="plus" size={40} color="primary" />
    </>
  );
};
