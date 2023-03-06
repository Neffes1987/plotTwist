import React, { useMemo } from 'react';

import { CommonEntityWidgetProps } from '../../../types/editor';
import { CallDTO } from '../../../types/entities/call';
import { ListItemConstructor } from '../../UI/ListItemConstructor';
import { ListItemConstructorConfig } from '../../UI/ListItemConstructor/interface';

import { callsListTranslations } from './translation/callsTranslationSchema';

export const CallsWidget = (props: CommonEntityWidgetProps<CallDTO>): JSX.Element => {
  const { data, onSelect, onEdit, onDelete, isSelect } = props;

  const config = useMemo((): ListItemConstructorConfig<CallDTO>[] => {
    return [
      { fieldName: 'type', type: 'tag', label: callsListTranslations.lists.callTypes[data.type] },
      { fieldName: 'description', type: 'main', label: callsListTranslations.labels.description },
      { fieldName: 'partyMotivation', type: 'additional', label: callsListTranslations.labels.partyMotivation },
    ];
  }, [data]);

  return (
    <ListItemConstructor<CallDTO>
      isSelect={isSelect}
      onSelect={onSelect}
      onEdit={onEdit}
      onDelete={onDelete}
      data={data}
      captionFieldName="name"
      config={config}
    />
  );
};
