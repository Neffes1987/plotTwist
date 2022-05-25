import { IAbstractModel } from '../../../base/interface';

export type PlotStatus = 'draft' | 'released' | 'finished';

export interface IPlotModel extends IAbstractModel {
  status: PlotStatus;
}
