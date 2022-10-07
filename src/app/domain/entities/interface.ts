import { ChaseType, FinalType, HolidayGetSwordType, HolidayType, PotionType } from 'backend';

import { PlotStatus } from './Plot/interface';
import { Problem } from './Problem/Problem';
import { WorldStatus, WorldType } from './World/AbstractWorld/interface';

export interface CommonDTO {
  id: string;
}

export interface TextDTO extends CommonDTO {
  name: string;
  description: string;
}

export interface LawDTO extends TextDTO {
  isBroken: boolean;
  punishment: string;
  worldIds: string[];
}
export type WaterholeDTO = TextDTO;

export interface WorldDTO extends TextDTO {
  type: WorldType;
  failPrice: string;
  plotId: string;
  reference: string;
  status: WorldStatus;
  story: string;
  timeline: string;
  laws: LawDTO[];
  waterholes: WaterholeDTO[];
}

export interface PlainWorldDTO extends WorldDTO {
  type: 'plainWorld';
  introduction: string;
  problems: Problem[];
}

export interface PrivateWorldDTO extends WorldDTO {
  type: 'privateWorld';
  contrast: string;
}

export interface HiddenCaveWorldDTO extends WorldDTO {
  type: 'hiddenCave';
  mainEdgeInformation: string;
  partyPlan: string;
  shadowIntroduction: string;
}

export interface HolidayWorldDTO extends WorldDTO {
  holidayType: HolidayType;
  holidayGetSwordType?: HolidayGetSwordType;
  chase?: ChaseType;
  shadowRevenge: string;
  type: 'holiday';
}

export interface ReturnWithPotionWorldDTO extends WorldDTO {
  finalType?: FinalType;
  cliffhanger: string;
  potionType?: PotionType;
  type: 'returnWithPotion';
}

export interface PlotDTO extends TextDTO {
  status: PlotStatus;
  worlds: WorldDTO[];
}

export interface WorldLawRelationDTO {
  id: string;
  lawId: string;
  worldId: string;
  isBroken: boolean;
}

export type EntityType = 'plot' | 'laws' | 'worldLawRelation' | WorldType;
