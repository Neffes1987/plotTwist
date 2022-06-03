import { IAbstractModel, IListQuery } from '../../../base/interface';

export type ChallengeType = 'challenge' | 'edge' | 'mainEdge';

export interface IChallengeModel extends IAbstractModel {
  plotGoal: string;
  rewardId: string;
  weight: number;
  callIds: string[];
  brokenLawIds: string[];
  characterIds: string[];
  type: ChallengeType;
  isActive: boolean;
}

export interface ChallengeRepositoryProps extends IListQuery {
  challengeIds?: string[];
  shadowId?: string;
  guardId?: string;
}

export interface IEdgeModel extends IChallengeModel {
  guardId: string;
  challengeIds: string[];
}

export type MainEdgeType =
  | 'meetingWithMainFear'
  | 'fatherConfrontation'
  | 'youthVersusOldAge'
  | 'imaginaryHeroDeath'
  | 'asDeathWitness'
  | 'causeOfDeath'
  | 'shadowEncounter'
  | 'heartCrisis'
  | 'throughEyesOfPsychopath';

export type ShadowEncounterType = 'demonization' | 'deathOfVillain' | 'villainGetaway' | 'shadowHeroOfHisStory';

export type HeartCrisisType = 'sacredMarriage' | 'equilibrium' | 'loveThatKills';

export interface IMainEdgeModel extends IEdgeModel {
  edgeImpact: string;
  mainEdgeType?: MainEdgeType;
  shadowEncounterType?: ShadowEncounterType;
  heartCrisis?: HeartCrisisType;
}
