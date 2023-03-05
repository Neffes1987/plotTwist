import React, { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { optionsListTranslations } from '../../App/initI18n/schemas/common-options';
import { Accordion } from '../Accordion/Accordion';
import { IconButton } from '../Buttons/IconButton';
import { Card } from '../Card/Card';
import { Flex } from '../Flex/Flex';
import { Tag } from '../Tag';
import { Typography } from '../Typography/Typography';

import { ListItemConstructorProps } from './interface';
import { ItemRow } from './ItemRow';

export function ListItemConstructor<T extends CommonEntityDTO>(props: ListItemConstructorProps<T>): Nullable<JSX.Element> {
  const { data, captionFieldName, config, onSelect, onEdit, onDelete, isSelect } = props;
  const { t } = useTranslation();

  const handleSelectCard = (): void => {
    onSelect?.(data.id);
  };

  const handleEditCard = (): void => {
    onEdit?.(data.id);
  };

  const handleDeleteCard = (): void => {
    onDelete?.(data.id);
  };

  const { tags, main, additional } = useMemo(() => {
    const result: {
      tags: { name: keyof T; value: unknown }[];
      main: { name: keyof T; value: unknown; caption: string }[];
      additional: { name: keyof T; value: unknown; caption: string }[];
    } = {
      tags: [],
      main: [],
      additional: [],
    };

    if (!data) {
      return result;
    }

    config.forEach(({ type, label, fieldName }) => {
      let value = data[fieldName] as unknown;

      if (value === undefined || value === null) {
        return;
      }

      if (type === 'tag') {
        result.tags.push({
          name: fieldName,
          value: label,
        });

        return;
      }

      if (typeof data[fieldName] === 'boolean') {
        value = optionsListTranslations.lists.confirm[value ? 'yes' : 'no'];
      }

      if (type === 'main') {
        result.main.push({
          name: fieldName,
          value,
          caption: label,
        });

        return;
      }

      result.additional.push({
        name: fieldName,
        value,
        caption: label,
      });
    });

    return result;
  }, [config, data]);

  if (!data) {
    return null;
  }

  return (
    <Card onPress={handleSelectCard} fullWidth borderColor={isSelect ? 'neutralYellow' : undefined}>
      <Flex justify="space-between" fullWidth marginX={4} backgroundColor="accentWhite">
        {onDelete && <IconButton iconType="flame" onPress={handleDeleteCard} />}

        <Typography mode="caption-bold">{data[captionFieldName as string]}</Typography>

        {onEdit && <IconButton iconType="pencil" onPress={handleEditCard} />}
      </Flex>

      <Flex direction="column" fullWidth backgroundColor="accentWhite">
        {main.map(({ name, value, caption }) => (
          <ItemRow key={name as string} margin={4} value={value as string} title={caption} />
        ))}

        {!!tags?.length && (
          <Flex justify="flex-start" fullWidth wrap="wrap">
            {tags.map(({ name, value }) => (
              <Tag key={name as string} margin={4} text={t(value as string)} />
            ))}
          </Flex>
        )}

        {!!additional?.length && (
          <Accordion caption={t(optionsListTranslations.lists.actions.open)} bordered={false}>
            {additional.map(({ name, value, caption }) => (
              <ItemRow key={name as string} margin={4} value={value as string} title={caption} />
            ))}
          </Accordion>
        )}
      </Flex>
    </Card>
  );
}
