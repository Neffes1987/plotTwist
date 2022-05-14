import { ILawModel } from '@backend/models/world/law/lawModel';
import { IHiddenCaveWorldModel } from '@backend/models/world/world/hiddenCaveWorldModel';
import { IHolidayWorldModel } from '@backend/models/world/world/holidayWorldModel';
import { IPlainWorldWorld } from '@backend/models/world/world/plainWorldModel';
import { IPrivateWorld } from '@backend/models/world/world/privateWorldModel';
import { IReturnWithPotionWorldModel } from '@backend/models/world/world/returnWithPotionModel';
import { ICommonWorld } from '@backend/models/world/world/worldModel';

const MOCKED_COMMON_WORLD: ICommonWorld = {
  id: '1',
  name: 'name',
  description: 'description',
  failPrice: '',
  edgeId: 'edgeId',
  plotId: 'plotId',
  references: '',
  story: '',
  timeline: '',
  status: 'draft',
  worldType: 'plainWorld',
};

export const MOCKED_WORLD: IPlainWorldWorld = {
  ...MOCKED_COMMON_WORLD,
  introduction: 'introduction',
  charactersProblems: ['charactersProblems', 'charactersProblems', 'charactersProblems'],
  worldProblems: ['worldProblems', 'worldProblems', 'worldProblems'],
};

export const MOCKED_RELEASED_WORLD: IPlainWorldWorld = {
  ...MOCKED_COMMON_WORLD,
  introduction: 'introduction',
  charactersProblems: ['charactersProblems', 'charactersProblems', 'charactersProblems'],
  worldProblems: ['worldProblems', 'worldProblems', 'worldProblems'],
  status: 'release',
};

export const MOCKED_PRIVATE_WORLD: IPrivateWorld = {
  ...MOCKED_COMMON_WORLD,
  contrast: 'contrast',
  worldType: 'privateWorld',
};

export const MOCKED_HIDDEN_CAVE_WORLD: IHiddenCaveWorldModel = {
  ...MOCKED_COMMON_WORLD,
  mainEdgeInformation: 'mainEdgeInformation',
  partyPlan: 'partyPlan',
  shadowIntroduction: 'partyPlan',
  worldType: 'hiddenCave',
};

export const MOCKED_HOLIDAY_WORLD: IHolidayWorldModel = {
  ...MOCKED_COMMON_WORLD,
  chase: 'godSaving',
  holidaySubType: undefined,
  holidayType: 'treasure',
  shadowRevenge: '',
  worldType: 'holiday',
};

export const MOCKED_RETURN_WORLD: IReturnWithPotionWorldModel = {
  ...MOCKED_COMMON_WORLD,
  plotTwist: '',
  worldType: 'returnWithPotion',
  finalType: 'cycle',
  potionType: 'wastedTime',
};

export const MOCKED_LAW: ILawModel = {
  id: '1',
  name: 'name',
  description: 'description',
  worldId: MOCKED_WORLD.id,
};
