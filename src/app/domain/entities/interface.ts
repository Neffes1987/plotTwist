import { PlotStatus } from './Plot/interface';
import { WorldStatus, WorldType } from './World/AbstractWorld/interface';
import { ChaseType, HolidaySubType, HolidayType } from './World/HolydayWorld/interface';
import { FinalType, PotionType } from './World/ReturnWithPotionWorld/interface';

export interface CommonDTO {
  id: string;
  name: string;
  description: string;
}
export interface LawDTO extends CommonDTO {
  isBroken: boolean;
  punishment: string;
}
export type WaterholeDTO = CommonDTO;

export interface WorldDTO extends CommonDTO {
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
  holidaySubType?: HolidaySubType;
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

export interface PlotDTO extends CommonDTO {
  status: PlotStatus;
  worlds: WorldDTO[];
}
