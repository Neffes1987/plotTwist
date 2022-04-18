import {IAbstractModel} from '@backend/base/abstractModel';
import {ICharacterModel} from '@backend/models/character/character/characterModel';

export const MOCKED_CHARACTER: ICharacterModel = {
  id: '1',
  name: 'name',
  description: 'description',
  age: '1',
  group: 'group',
  gender: 'gender',
  goal: 'goal',
  previewId: 'previewId',
  profession: 'profession',
  race: 'race',
  strongest: ['strongest', 'strongest'],
  weakness: ['weakness', 'weakness'],
  type: 'mentor',
};

export const MOCKED_RESULT: IAbstractModel = {
  id: '1',
  description: 'description',
  name: '',
};
