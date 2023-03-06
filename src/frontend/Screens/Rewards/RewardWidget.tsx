import React, { useMemo } from 'react';

import { CommonEntityWidgetProps } from '../../../types/editor';
import { ListItemConstructor } from '../../UI/ListItemConstructor';
import { ListItemConstructorConfig } from '../../UI/ListItemConstructor/interface';

import { rewardsListTranslations } from './translation/rewardsListTranslation';

export const RewardWidget = (props: CommonEntityWidgetProps<RewardDto>): JSX.Element => {
  const { data, onSelect, onEdit, onDelete, isSelect } = props;

  const config = useMemo((): ListItemConstructorConfig<RewardDto>[] => {
    return [
      { fieldName: 'name', type: 'main', label: rewardsListTranslations.labels.name },
      { fieldName: 'description', type: 'additional', label: rewardsListTranslations.labels.description },
    ];
  }, [data]);

  return (
    <ListItemConstructor<RewardDto>
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
