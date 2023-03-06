import React, { useMemo } from 'react';

import { CommonEntityWidgetProps } from '../../../types/editor';
import { ListItemConstructor } from '../../UI/ListItemConstructor';
import { ListItemConstructorConfig } from '../../UI/ListItemConstructor/interface';

import { waterholesListTranslations } from './translation/waterholesListTranslations';

export const WaterholeWidget = (props: CommonEntityWidgetProps<WaterholeDTO>): JSX.Element => {
  const { data, onSelect, onEdit, onDelete, isSelect } = props;

  const config = useMemo((): ListItemConstructorConfig<WaterholeDTO>[] => {
    return [
      { fieldName: 'name', type: 'main', label: waterholesListTranslations.labels.name },
      { fieldName: 'description', type: 'additional', label: waterholesListTranslations.labels.description },
    ];
  }, [data]);

  return (
    <ListItemConstructor<WaterholeDTO>
      isSelect={isSelect}
      onSelect={onSelect}
      onDelete={onDelete}
      onEdit={onEdit}
      data={data}
      captionFieldName="name"
      config={config}
    />
  );
};
