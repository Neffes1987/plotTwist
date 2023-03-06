import React, { useMemo } from 'react';

import { CommonEntityWidgetProps } from '../../../types/editor';
import { TaskDTO } from '../../../types/entities/task';
import { ListItemConstructor } from '../../UI/ListItemConstructor';
import { ListItemConstructorConfig } from '../../UI/ListItemConstructor/interface';

import { taskTranslations } from './translation/taskTranslations';

export const TaskWidget = (props: CommonEntityWidgetProps<TaskDTO>): JSX.Element => {
  const { data, onSelect, onEdit, onDelete, isSelect } = props;

  const config = useMemo((): ListItemConstructorConfig<TaskDTO>[] => {
    const result: ListItemConstructorConfig<TaskDTO>[] = [
      { fieldName: 'type', type: 'tag', label: taskTranslations.lists.edgeTypeOptions[data.type] },
      { fieldName: 'description', type: 'additional', label: taskTranslations.labels.description },
      { fieldName: 'edgeImpact', type: 'additional', label: taskTranslations.labels.edgeImpact },
    ];

    if (data.type === 'mainEdge' && data.mainEdgeType) {
      result.push({ fieldName: 'mainEdgeType', type: 'tag', label: taskTranslations.lists.mainEdgeTypeOptions[data.mainEdgeType] });
    }

    if (data.mainEdgeType === 'shadowEncounter' && data.shadowEncounterType) {
      result.push({ fieldName: 'shadowEncounterType', type: 'tag', label: taskTranslations.lists.shadowEncounterType[data.shadowEncounterType] });
    }

    return result;
  }, [data]);

  return (
    <ListItemConstructor<TaskDTO>
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
