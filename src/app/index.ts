import { IPlotController, IWorldController } from './controllers/interface';
import { PlotController } from './controllers/PlotController/PlotController';
import { WorldController } from './controllers/WorldController/WorldController';
import type {
  CommonDTO,
  HiddenCaveWorldDTO,
  HolidayWorldDTO,
  LawDTO,
  PlainWorldDTO,
  PlotDTO,
  PrivateWorldDTO,
  ReturnWithPotionWorldDTO,
  WorldDTO,
} from './domain/entities/interface';

export type {
  CommonDTO,
  HiddenCaveWorldDTO,
  HolidayWorldDTO,
  IPlotController,
  IWorldController,
  LawDTO,
  PlainWorldDTO,
  PlotDTO,
  PrivateWorldDTO,
  ReturnWithPotionWorldDTO,
  WorldDTO,
};

export const plotController: IPlotController = new PlotController();
export const worldController: IWorldController = new WorldController();
