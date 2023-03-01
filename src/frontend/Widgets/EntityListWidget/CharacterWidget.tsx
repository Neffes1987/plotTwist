import React, { useMemo } from 'react';

import { CharacterEnum } from '../../../constants/character.enum';
import { CharacterDTO } from '../../../types/entities/character';
import { charactersTranslations } from '../../App/initI18n/schemas/characterTranslation';
import { optionsListTranslations } from '../../App/initI18n/schemas/common-options';
import { ListItemConstructor } from '../../UI/ListItemConstructor';
import { ListItemConstructorConfig } from '../../UI/ListItemConstructor/interface';

import { CharacterWidgetProps } from './interface';

export const CharacterWidget = (props: CharacterWidgetProps): JSX.Element => {
  const { data, onSelect, onEdit, onDelete } = props;

  const config = useMemo((): ListItemConstructorConfig<CharacterDTO>[] => {
    const result: ListItemConstructorConfig<CharacterDTO>[] = [
      { fieldName: 'age', type: 'main', label: charactersTranslations.labels.age },
      { fieldName: 'race', type: 'main', label: charactersTranslations.labels.race },
      { fieldName: 'race', type: 'tag', label: charactersTranslations.lists.types[data.type.toLowerCase()] },
      { fieldName: 'race', type: 'tag', label: optionsListTranslations.lists.gender[data.gender.toLowerCase()] },
      { fieldName: 'group', type: 'additional', label: charactersTranslations.labels.group },
      { fieldName: 'goal', type: 'additional', label: charactersTranslations.labels.goal },
      { fieldName: 'profession', type: 'main', label: charactersTranslations.labels.profession },
    ];

    if (data.type === CharacterEnum.Ally) {
      if (data.allyType) {
        result.push({ fieldName: 'allyType', type: 'tag', label: charactersTranslations.lists.allyType[data.allyType] });
      }

      if (data.isAllyForParty) {
        result.push({ fieldName: 'isAllyForParty', type: 'additional', label: charactersTranslations.labels.isAllyForParty });
      }

      if (data.allyForHero) {
        result.push({ fieldName: 'allyForHero', type: 'additional', label: charactersTranslations.labels.allyForHero });
      }

      if (data.callForAlly) {
        result.push({ fieldName: 'callForAlly', type: 'additional', label: charactersTranslations.labels.callForAlly });
      }
    }

    if (data.type === CharacterEnum.Mentor) {
      if (data.mentorType) {
        result.push({ fieldName: 'mentorType', type: 'tag', label: charactersTranslations.lists.mentorType[data.mentorType] });
      }

      if (data.knowledgeType) {
        result.push({ fieldName: 'knowledgeType', type: 'tag', label: charactersTranslations.lists.knowledgeType[data.knowledgeType] });
      }
    }

    if (data.type === CharacterEnum.Guard) {
      if (data.becameAlly) {
        result.push({ fieldName: 'becameAlly', type: 'additional', label: charactersTranslations.labels.becameAlly });
      }

      if (data.becameEnemy) {
        result.push({ fieldName: 'becameEnemy', type: 'additional', label: charactersTranslations.labels.becameEnemy });
      }
    }

    if (data.type === CharacterEnum.Messenger || data.type === CharacterEnum.Shadow || data.type === CharacterEnum.Enemy) {
      if (data.motivation) {
        result.push({ fieldName: 'motivation', type: 'additional', label: charactersTranslations.labels.motivation });
      }

      if (data.visionOnSituation) {
        result.push({ fieldName: 'visionOnSituation', type: 'additional', label: charactersTranslations.labels.visionOnSituation });
      }

      if (data.possibleToMoveAlly) {
        result.push({ fieldName: 'possibleToMoveAlly', type: 'additional', label: charactersTranslations.labels.possibleToMoveAlly });
      }
    }

    return result;
  }, [data]);

  return <ListItemConstructor<CharacterDTO> onSelect={onSelect} onDelete={onDelete} onEdit={onEdit} data={data} captionFieldName="name" config={config} />;
};
