import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';

import { ILawModel, LawModel } from './lawModel';

export interface ILawListQuery extends IListQuery {
  worldId?: string;
}

export class LawRepository extends AbstractRepository<LawModel> {
  constructor() {
    super('law');
  }

  generateModel(data: ILawModel): LawModel {
    return new LawModel(data);
  }

  list(worldId: string): Promise<LawModel[]> {
    return super.getList<ILawListQuery>({
      worldId,
    });
  }

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      worldId: 'TEXT',
    };
  }
}
