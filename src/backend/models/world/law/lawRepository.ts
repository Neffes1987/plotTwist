import { ILawListQuery, ILawModel } from '@backend';

import { AbstractRepository } from '../../../base/abstractRepository';
import { ColumnsConfigType } from '../../../base/interface';

import { LawModel } from './lawModel';

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
