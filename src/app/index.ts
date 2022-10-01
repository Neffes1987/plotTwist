import { ILawsController, IPlotController, IWorldController } from './controllers/interface';
import { LawController } from './controllers/LawController/LawController';
import { PlotController } from './controllers/PlotController/PlotController';
import { WorldController } from './controllers/WorldController/WorldController';
import { CharacterType } from './domain/entities/Character/AbstractCharacter/interface';
import type {
  HiddenCaveWorldDTO,
  HolidayWorldDTO,
  LawDTO,
  PlainWorldDTO,
  PlotDTO,
  PrivateWorldDTO,
  ReturnWithPotionWorldDTO,
  TextDTO,
  WorldDTO,
} from './domain/entities/interface';
import { ChaseType, HolidayGetSwordType, HolidayType } from './domain/entities/World/HolydayWorld/interface';
import { FinalType, PotionType } from './domain/entities/World/ReturnWithPotionWorld/interface';

export type {
  CharacterType,
  ChaseType,
  FinalType,
  HiddenCaveWorldDTO,
  HolidayGetSwordType,
  HolidayType,
  HolidayWorldDTO,
  ILawsController,
  IPlotController,
  IWorldController,
  LawDTO,
  PlainWorldDTO,
  PlotDTO,
  PotionType,
  PrivateWorldDTO,
  ReturnWithPotionWorldDTO,
  TextDTO,
  WorldDTO,
};

export const plotController: IPlotController = new PlotController();
export const worldController: IWorldController = new WorldController();
export const lawsController: ILawsController = new LawController();
