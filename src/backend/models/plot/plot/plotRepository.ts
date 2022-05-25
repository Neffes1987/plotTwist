import { IPlotModel } from '@backend';

import { AbstractRepository } from '../../../base/abstractRepository';
import { ColumnsConfigType, IListQuery } from '../../../base/interface';

import { PlotModel } from './plotModel';

export class PlotRepository extends AbstractRepository<PlotModel> {
  constructor() {
    super('plot');
  }

  list(page: number, limit: number): Promise<PlotModel[]> {
    return super.getList<IListQuery>({
      page,
      limit,
    });
  }

  generateModel(data: IPlotModel): PlotModel {
    return new PlotModel(data);
  }

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      status: 'TEXT',
    };
  }
}
