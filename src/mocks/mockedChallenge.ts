import { ICallModel, IChallengeModel, IEdgeModel, IMainEdgeModel, IRewardModel } from '@backend';

import { MOCKED_SHADOW } from './mockedCharacter';

export const MOCKED_REWARD: IRewardModel = {
  id: '1',
  name: 'name',
  description: 'description',
  challengeId: 'challengeId',
};

export const MOCKED_CALL: ICallModel = {
  description: '',
  partyMotivation: 'partyMotivation',
  name: 'name',
  id: 'id',
  challengeId: 'challengeId',
  status: 'created',
  type: 'gossip',
};

export const MOCKED_CHALLENGE: IChallengeModel = {
  callIds: ['callId_1', 'callId_2'],
  characterIds: ['characterId_1', 'characterId_2'],
  brokenLawIds: ['brokenLawId_1', 'brokenLawId_2'],
  description: '',
  id: 'test',
  name: '',
  plotGoal: '',
  rewardId: '',
  type: 'challenge',
  weight: 0,
  isActive: true,
};

export const MOCKED_EDGE: IEdgeModel = {
  id: 'id',
  name: 'name',
  description: 'description',
  callIds: ['callId_1', 'callId_2'],
  characterIds: ['characterId_1', 'characterId_2'],
  brokenLawIds: ['brokenLawId_1', 'brokenLawId_2'],
  plotGoal: 'plotGoal',
  rewardId: 'rewardId',
  weight: 1,
  guardId: '1',
  challengeIds: ['1', '2', '3'],
  type: 'edge',
  isActive: false,
};

export const MOCKED_MAIN_EDGE: IMainEdgeModel = {
  brokenLawIds: ['brokenLawId', 'brokenLawId2'],
  callIds: ['callId', 'callIds2'],
  challengeIds: ['challengeId', 'challengeId2'],
  characterIds: ['characterId', 'characterId2'],
  description: 'description',
  edgeImpact: 'edgeImpact',
  heartCrisis: undefined,
  id: 'mainEdgeId',
  mainEdgeType: 'shadowEncounter',
  name: 'name',
  plotGoal: 'plotGoal',
  rewardId: 'rewardId',
  shadowEncounterType: 'deathOfVillain',
  guardId: MOCKED_SHADOW.id,
  type: 'mainEdge',
  weight: 0,
  isActive: false,
};
