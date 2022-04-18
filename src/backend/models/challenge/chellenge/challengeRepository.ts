import {AbstractRepository, IListQuery} from '../../../base/abstractRepository';

import {ChallengeModel, IChallengeModel} from './challengeModel';
import {EdgeModel, IEdgeModel} from './edgeModel';
import {IMainEdgeModel, MainEdgeModel} from './mainEdgeModel';

export class ChallengeRepository extends AbstractRepository<ChallengeModel> {
  async list(page: number, limit: number): Promise<ChallengeModel[]> {
    return super.getList({
      page,
      limit,
    });
  }

  createDbTable(): string {
    return '';
  }

  dbCreate(model: ChallengeModel): Promise<string> {
    return Promise.resolve('');
  }

  dbDelete(id: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  dbFind(id: string): Promise<Nullable<ChallengeModel>> {
    return Promise.resolve(null);
  }

  dbFindAll(query: IListQuery): Promise<ChallengeModel[]> {
    return Promise.resolve([]);
  }

  dbUpdate(model: ChallengeModel): Promise<boolean> {
    return Promise.resolve(false);
  }

  generateModel(data: IChallengeModel): ChallengeModel {
    switch (data.type) {
      case 'challenge':
        return new ChallengeModel(data);
      case 'edge':
        return new EdgeModel(data as IEdgeModel);
      case 'mainEdge':
        return new MainEdgeModel(data as IMainEdgeModel);
      default:
        throw this.errorLog.formatEmptyFieldsError(['type']);
    }
  }
}
