import { ActiveRecord } from 'src/app/domain/entities/ActiveRecord/ActiveRecord';

import { IRewardConstructor } from '../../../../../types/constructors/reward.constructor';
import { IEdgeRewardConstructor } from '../../../../../types/constructors/world.constructor';
import { CrossEdgeRewardDTO } from '../../../../../types/entities/cross';
import { CrossEdgeReward } from '../../../entities/Cross/CrossEdgeReward/CrossEdgeReward';

import { CommonCrossConstructor } from './CommonCrossConstructor';

export class CrossEdgeRewardConstructor extends CommonCrossConstructor<CrossEdgeRewardDTO> implements IEdgeRewardConstructor {
  private readonly rewardConstructor: IRewardConstructor;

  constructor(rewardConstructor: IRewardConstructor) {
    super();
    this.rewardConstructor = rewardConstructor;
  }

  async assignedList(edgeId: string): Promise<RewardInEdgeDTO[]> {
    const model = this.getModel();

    const crossDTOS = await model.list({
      query: {
        edgeId,
      },
    });

    if (!crossDTOS?.length) {
      return [];
    }

    const existedCrossDtos: Record<string, boolean> = {};

    crossDTOS.forEach(({ rewardId, isAchieved }) => {
      existedCrossDtos[rewardId] = isAchieved;
    });

    const list = await this.rewardConstructor.list({ query: { id: Object.keys(existedCrossDtos) } });

    if (!list) {
      return [];
    }

    return list.map(model => ({
      ...model,
      isAchieved: existedCrossDtos[model.id],
    }));
  }

  async toggle(rewardIds: string[], edgeId: string): Promise<RewardInEdgeDTO[]> {
    const crossWorldEdges = this.getModel();

    const availableEdges = await crossWorldEdges.list({
      query: {
        edgeId,
      },
    });

    await this.upsertBunch(edgeId, availableEdges, rewardIds, 'rewardId');

    return this.assignedList(edgeId);
  }

  getModelDTO(parentID: string): CrossEdgeRewardDTO {
    return {
      rewardId: '',
      edgeId: parentID,
      id: '',
      isAchieved: false,
    };
  }

  getModel(): ActiveRecord<CrossEdgeRewardDTO> {
    return new CrossEdgeReward();
  }
}
