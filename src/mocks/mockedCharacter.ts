import { IAbstractModel } from '@backend/base/abstractModel';
import { IAllyModel } from '@backend/models/character/character/allyModel';
import { IEnemyModel } from '@backend/models/character/character/enemyModel';
import { IGuardModel } from '@backend/models/character/character/guardModel';
import { IMentorModel } from '@backend/models/character/character/mentorModel';
import { IMessengerModel } from '@backend/models/character/character/messengerModel';
import { IShadowModel } from '@backend/models/character/character/shadowModel';

export const MOCKED_MENTOR: IMentorModel = {
  plotId: 'plotId',
  rewardId: 'rewardId',
  waterholesIds: ['waterholesId'],
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
  mentorType: 'dark',
  knowledgeType: 'education',
  lawIds: [],
  resultIds: [],
};

export const MOCKED_MESSENGER: IMessengerModel = {
  callIds: ['callId', 'callId'],
  motivation: 'motivation',
  plotId: 'plotId',
  waterholesIds: ['waterholesId'],
  id: '2',
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
  type: 'messenger',
  resultIds: [],
};

export const MOCKED_SHADOW: IShadowModel = {
  age: 'age',
  description: 'description',
  gender: 'gender',
  goal: 'goal',
  group: 'group',
  id: 'shadowID',
  motivation: 'motivation',
  name: 'name',
  plotId: 'plotId',
  previewId: 'previewId',
  profession: 'profession',
  race: 'race',
  resultIds: ['resultId'],
  rewardId: 'rewardId',
  strongest: ['strongest1', 'strongest2'],
  type: 'shadow',
  visionOnSituation: 'visionOnSituation',
  weakness: ['weakness1', 'weakness2'],
};

export const MOCKED_GUARD: IGuardModel = {
  age: '',
  becameAlly: '',
  becameEnemy: '',
  description: '',
  gender: '',
  goal: '',
  group: '',
  id: 'guard.id',
  name: '',
  plotId: '',
  previewId: '',
  profession: '',
  race: '',
  resultIds: [],
  strongest: ['strongest1', 'strongest2'],
  type: 'guard',
  weakness: ['weakness1', 'weakness2'],
};

export const MOCKED_ALLY: IAllyModel = {
  age: '',
  allyForHero: '',
  callForAlly: '',
  description: '',
  gender: '',
  goal: '',
  group: '',
  id: '',
  isAllyForParty: false,
  name: '',
  plotId: '',
  previewId: '',
  profession: '',
  race: '',
  resultIds: [],
  allyType: 'undeadAlly',
  strongest: ['strongest1', 'strongest2'],
  type: 'ally',
  weakness: ['weakness1', 'weakness2'],
};

export const MOCKED_ENEMY: IEnemyModel = {
  age: '',
  description: '',
  gender: '',
  goal: '',
  group: '',
  id: '',
  motivation: '',
  name: '',
  plotId: '',
  possibleToMoveAlly: '',
  previewId: '',
  profession: '',
  race: '',
  resultIds: [],
  rewardId: '',
  strongest: ['strongest1', 'strongest2'],
  type: 'enemy',
  weakness: ['weakness1', 'weakness2'],
};

export const MOCKED_RESULT: IAbstractModel = {
  id: '1',
  description: 'description',
  name: '',
};
