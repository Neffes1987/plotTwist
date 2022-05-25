import { IAbstractModel } from '../../../base/interface';

export type CallStatus = 'active' | 'closed' | 'failed' | 'created';

export type CallType =
  | 'disorientation'
  | 'gossip'
  | 'treasureHunt'
  | 'inferring'
  | 'lackOfChoice'
  | 'deprivation'
  | 'requestOfHelp'
  | 'temptation'
  | 'synchronism'
  | 'pushToAction'
  | 'heraldOfChange';

export interface ICallModel extends IAbstractModel {
  partyMotivation: string;
  challengeId: string;
  status?: CallStatus;
  type?: CallType;
}
