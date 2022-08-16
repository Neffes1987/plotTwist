import { AbstractWorld } from '../../../entities/World/AbstractWorld/AbstractWorld';

export interface IGetWorldWorldList {
  getWorldsByPlotId: (id: string) => Promise<AbstractWorld[]>;
}
