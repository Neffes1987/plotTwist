import {AbstractRepository, IListQuery} from '../../../base/abstractRepository';

import {IPlotModel, PlotModel} from './plotModel';

export class PlotRepository extends AbstractRepository<PlotModel> {
  list(page: number, limit: number): Promise<PlotModel[]> {
    return super.getList<IListQuery>({
      page,
      limit,
    });
  }

  createDbTable(): string {
    return '';
  }

  dbCreate(model: PlotModel): Promise<string> {
    return Promise.resolve(model.id);
  }

  dbDelete(id: string): Promise<boolean> {
    return Promise.resolve(!!id);
  }

  dbFind(id: string): Promise<Nullable<PlotModel>> {
    return Promise.resolve(null);
  }

  dbFindAll(query: IListQuery): Promise<PlotModel[]> {
    return Promise.resolve([]);
  }

  dbUpdate(model: PlotModel): Promise<boolean> {
    return Promise.resolve(false);
  }

  generateModel(data: IPlotModel): PlotModel {
    return new PlotModel(data);
  }
}
