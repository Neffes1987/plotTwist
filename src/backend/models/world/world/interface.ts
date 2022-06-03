import { IAbstractModel, IListQuery } from '../../../base/interface';

export interface IHiddenCaveWorldModel extends ICommonWorld {
  mainEdgeInformation: string;
  shadowIntroduction: string;
  partyPlan: string;
}

export type HolidayType = 'inAShelter' | 'treasure' | 'victory' | 'getSword';
export type HolidaySubType = 'potionSteeling' | 'initiative' | 'newVision' | 'extraVision' | 'epiphania' | 'skewVision';
export type ChaseType = 'godSaving' | 'followersChase' | 'shadowRunning';
export interface IHolidayWorldModel extends ICommonWorld {
  shadowRevenge: string; // not required
  holidayType: HolidayType;
  holidaySubType?: HolidaySubType; // not required
  chase?: ChaseType;
}

export interface IPlainWorld extends ICommonWorld {
  introduction: string;
  charactersProblems: string;
  worldProblems: string;
}

export interface IPrivateWorld extends ICommonWorld {
  contrast: string;
}

export type FinalType = 'cycle' | 'achievePerfect' | 'openEnd';
export type PotionType = 'wisdom' | 'love' | 'responsible' | 'tragedy' | 'badExperience' | 'wastedTime';
export interface IReturnWithPotionWorldModel extends ICommonWorld {
  finalType: FinalType;
  potionType: PotionType;
  plotTwist: string;
}

export type WorldType = 'plainWorld' | 'privateWorld' | 'hiddenCave' | 'holiday' | 'returnWithPotion';

export type WorldStatus = 'draft' | 'release' | 'finished';

export interface ICommonWorld extends IAbstractModel {
  story: string;
  reference: string;
  timeline: string;
  failPrice: string;
  status: WorldStatus;
  edgeId: string;
  plotId: string;
  worldType: Nullable<WorldType>;
}

export interface IWorldListQuery extends IListQuery {
  plotId?: string;
  edgeId?: string;
}
