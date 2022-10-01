import { LawDTO, PlotDTO, TextDTO, WorldDTO } from 'backend';

import { ListParams } from '../domain/interface';

export interface ICommonController<Get extends TextDTO, Update extends TextDTO> {
  list: (params: ListParams) => Promise<Get[]>;
  create: (data: Omit<Update, 'id'>) => Promise<string>;
  update: (data: Update) => Promise<boolean>;
  delete: (id: string) => Promise<boolean>;
  get: (id: string) => Promise<Nullable<Get>>;
}

export type IPlotController = ICommonController<PlotDTO, Omit<PlotDTO, 'worlds'>>;
export type IWorldController = ICommonController<WorldDTO, Omit<WorldDTO, 'laws' | 'waterholes'>>;
export type ILawsController = ICommonController<LawDTO, LawDTO>;
