import {ICallModel} from '@backend/models/challenge/call/callModel';
import {IEdgeModel} from '@backend/models/challenge/chellenge/edgeModel';
import {IRewardModel} from '@backend/models/challenge/reward/rewardModel';

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

export const MOCKED_CHALLENGE: IEdgeModel = {
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
  challengeIds: ['1', '2'],
  type: 'edge',
};
