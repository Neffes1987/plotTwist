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
    const result = await this.db.execute(this.generateSelectQuery(`type IN ('edge', 'mainEdge') AND challengeIds LIKE '%${challengeId}%'`, 0, 1));

    if (!result) {
      return null;
    }

    const edgeData = this.db.iterate<IChallengeModel>(result);

    if (!edgeData?.length) {
      return null;
    }

    return this.generateModel(this.formatDataByColumnsType(edgeData[0]));
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
    return {
      id: 'TEXT',
      name: 'TEXT',
      description: 'TEXT',
      callIds: 'ARRAY',
      characterIds: 'ARRAY',
      brokenLawIds: 'ARRAY',
      plotGoal: 'TEXT',
      rewardId: 'TEXT',
      weight: 'TEXT',
      type: 'TEXT',
      isActive: 'BOOLEAN',
      guardId: 'TEXT',
      challengeIds: 'ARRAY',
      edgeImpact: 'TEXT',
      mainEdgeType: 'TEXT',
      shadowEncounterType: 'TEXT',
      heartCrisis: 'TEXT',
    };
  }
}
