import { LawDTO, PlotDTO, TextDTO, WorldDTO } from 'backend';

import { ListParams } from '../domain/interface';

export interface ICommonController {
  list: (params: ListParams) => Promise<TextDTO[]>;
  create: (data: Omit<TextDTO, 'id'>) => Promise<string>;
  update: (data: TextDTO) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  get: (id: string) => Promise<Nullable<TextDTO>>;
}

export interface IFactoryController<Get extends TextDTO, Update extends TextDTO> {
  list: (params: ListParams) => Promise<Get[]>;
  create: (data: Omit<Update, 'id'>) => Promise<string>;
  update: (data: Update) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  get: (id: string) => Promise<Nullable<Get>>;
}

export type IPlotController = IFactoryController<PlotDTO, Omit<PlotDTO, 'worlds'>>;
export type IWorldController = IFactoryController<WorldDTO, Omit<WorldDTO, 'laws' | 'waterholes'>>;
export type ILawsController = IFactoryController<LawDTO, LawDTO>;

export type ControllerType = 'plot' | 'law' | 'world';
