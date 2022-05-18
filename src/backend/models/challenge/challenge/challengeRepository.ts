import { AbstractRepository, ColumnsConfigType, IListQuery } from '../../../base/abstractRepository';

import { ChallengeModel, IChallengeModel } from './challengeModel';
import { EdgeModel, IEdgeModel } from './edgeModel';
import { IMainEdgeModel, MainEdgeModel } from './mainEdgeModel';

export interface ChallengeRepositoryProps extends IListQuery {
  challengeIds?: string[];
  shadowId?: string;
  guardId?: string;
}

export class ChallengeRepository extends AbstractRepository<ChallengeModel> {
  constructor() {
    super('challenge');
  }

  async list(props: ChallengeRepositoryProps): Promise<ChallengeModel[]> {
    return super.getList(props);
  }

  async getEdgeByChallengeId(challengeId: string): Promise<Nullable<ChallengeModel>> {
    return Promise.resolve(null);
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

  getDbTableColumns(): Record<string, ColumnsConfigType> {
    return {};
  }
}
