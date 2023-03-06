import React, { useMemo } from 'react';

import { CommonEntityWidgetProps } from '../../../types/editor';
import { ListItemConstructor } from '../../UI/ListItemConstructor';
import { ListItemConstructorConfig } from '../../UI/ListItemConstructor/interface';

import { lawListTranslations } from './translation/lawsTranslationSchema';

export const LawsWidget = (props: CommonEntityWidgetProps<LawDTO>): JSX.Element => {
  const { data, onSelect, onEdit, onDelete, isSelect } = props;

  const config = useMemo((): ListItemConstructorConfig<LawDTO>[] => {
    return [
      { fieldName: 'name', type: 'main', label: lawListTranslations.labels.name },
      { fieldName: 'description', type: 'additional', label: lawListTranslations.labels.description },
      { fieldName: 'punishment', type: 'main', label: lawListTranslations.labels.punishment },
    ];
  }, [data]);

  return (
    <ListItemConstructor<LawDTO>
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
