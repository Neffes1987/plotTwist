import React, { useMemo } from 'react';

import { CallDTO } from '../../../types/entities/call';
import { callsListTranslations } from '../../App/initI18n/schemas/callsTranslationSchema';
import { ListItemConstructor } from '../../UI/ListItemConstructor';
import { ListItemConstructorConfig } from '../../UI/ListItemConstructor/interface';

import { CallsWidgetProps } from './interface';

export const CallsWidget = (props: CallsWidgetProps): JSX.Element => {
  const { data, onSelect, onEdit, onDelete } = props;

  const config = useMemo((): ListItemConstructorConfig<CallDTO>[] => {
    return [
      { fieldName: 'type', type: 'tag', label: callsListTranslations.lists.callTypes[data.type] },
      { fieldName: 'description', type: 'main', label: callsListTranslations.labels.description },
      { fieldName: 'partyMotivation', type: 'additional', label: callsListTranslations.labels.partyMotivation },
    ];
  }, [data]);

  return <ListItemConstructor<CallDTO> onSelect={onSelect} onEdit={onEdit} onDelete={onDelete} data={data} captionFieldName="name" config={config} />;
};
