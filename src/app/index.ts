import { controllerFactory } from './controllers/controllerFactory';
import { ILawsController, IPlotController, IWorldController } from './controllers/interface';
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

export const plotController: IPlotController = (controllerFactory('plot') as unknown) as IPlotController;
export const worldController: IWorldController = (controllerFactory('world') as unknown) as IWorldController;
export const lawsController: ILawsController = (controllerFactory('law') as unknown) as ILawsController;
