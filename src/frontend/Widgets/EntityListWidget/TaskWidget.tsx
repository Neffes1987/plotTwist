import React, { useMemo } from 'react';

import { TaskDTO } from '../../../types/entities/task';
import { taskTranslations } from '../../App/initI18n/schemas/taskTranslations';
import { ListItemConstructor } from '../../UI/ListItemConstructor';
import { ListItemConstructorConfig } from '../../UI/ListItemConstructor/interface';

import { TaskWidgetProps } from './interface';

export const TaskWidget = (props: TaskWidgetProps): JSX.Element => {
  const { data, onSelect, onEdit, onDelete } = props;

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

  return <ListItemConstructor<TaskDTO> onSelect={onSelect} onEdit={onEdit} onDelete={onDelete} data={data} captionFieldName="name" config={config} />;
};
