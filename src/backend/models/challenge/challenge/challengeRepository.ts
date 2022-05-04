import { AbstractRepository, IListQuery } from '../../../base/abstractRepository';

import { ChallengeModel, IChallengeModel } from './challengeModel';
import { EdgeModel, IEdgeModel } from './edgeModel';
import { IMainEdgeModel, MainEdgeModel } from './mainEdgeModel';

export interface ChallengeRepositoryProps extends IListQuery {
  challengeIds?: string[];
  shadowId?: string;
  guardId?: string;
}

export class ChallengeRepository extends AbstractRepository<ChallengeModel> {
  async list(props: ChallengeRepositoryProps): Promise<ChallengeModel[]> {
    return super.getList(props);
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

  dbFindAll(query: ChallengeRepositoryProps): Promise<ChallengeModel[]> {
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
