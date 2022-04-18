import {AbstractRepository, IListQuery} from '../../../base/abstractRepository';

import {ILawModel, LawModel} from './lawModel';

export interface ILawListQuery extends IListQuery {
  worldId?: string;
}

export class LawRepository extends AbstractRepository<LawModel> {
  createDbTable(): string {
    return '';
  }

  dbCreate(model: LawModel): Promise<string> {
    return Promise.resolve('');
  }

  dbDelete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  dbFind(id: string): Promise<Nullable<LawModel>> {
    return Promise.resolve(null);
  }

  dbFindAll(query: ILawListQuery): Promise<LawModel[]> {
    return Promise.resolve([]);
  }

  dbUpdate(model: LawModel): Promise<boolean> {
    return Promise.resolve(false);
  }

  generateModel(data: ILawModel): LawModel {
    return new LawModel(data);
  }

  list(worldId: string): Promise<LawModel[]> {
    return super.getList<ILawListQuery>({
      worldId,
    });
  }
}
