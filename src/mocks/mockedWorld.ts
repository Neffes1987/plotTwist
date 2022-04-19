import { ILawModel } from '@backend/models/world/law/lawModel';
import { IPlainWorldWorld } from '@backend/models/world/world/plainWorldModel';

export const MOCKED_WORLD: IPlainWorldWorld = {
  id: '1',
  name: 'name',
  description: 'description',
  introduction: 'introduction',
  charactersProblems: ['charactersProblems', 'charactersProblems', 'charactersProblems'],
  worldProblems: ['worldProblems', 'worldProblems', 'worldProblems'],
  story: 'story',
  references: 'references',
  timeline: 'timeline',
  failPrice: 'failPrice',
  edgeId: 'edgeId',
  plotId: 'plotId',
  status: 'draft',
  worldType: 'plainWorld',
};

export const MOCKED_RELEASED_WORLD: IPlainWorldWorld = {
  id: '1',
  name: 'name',
  description: 'description',
  introduction: 'introduction',
  charactersProblems: ['charactersProblems', 'charactersProblems', 'charactersProblems'],
  worldProblems: ['worldProblems', 'worldProblems', 'worldProblems'],
  story: 'story',
  references: 'references',
  timeline: 'timeline',
  failPrice: 'failPrice',
  edgeId: 'edgeId',
  plotId: 'plotId',
  status: 'release',
  worldType: 'plainWorld',
};

export const MOCKED_LAW: ILawModel = {
  id: '1',
  name: 'name',
  description: 'description',
  worldId: MOCKED_WORLD.id,
};
