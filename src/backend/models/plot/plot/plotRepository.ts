import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';

import { IPlotModel, PlotModel } from './plotModel';

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
