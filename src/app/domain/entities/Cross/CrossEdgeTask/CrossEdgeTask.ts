import { CrossEdgeTaskRewardDTO } from '../../../../../types/entities/cross';
import { AsyncStoreDataGateway } from '../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { ActiveRecord } from '../../ActiveRecord/ActiveRecord';

export class CrossEdgeTask extends ActiveRecord<CrossEdgeTaskRewardDTO> {
  isAchieved = false;
  rewardId: string;
  taskId: string;
  edgeId: string;

  constructor() {
    super(new AsyncStoreDataGateway('cross-edge-task'));
  }

  serialize(): CrossEdgeTaskRewardDTO {
    return {
      id: this.id,
      rewardId: this.rewardId,
      taskId: this.taskId,
      edgeId: this.edgeId,
      isAchieved: this.isAchieved,
    };
  }

  unSerialize(raw: CrossEdgeTaskRewardDTO): void {
    const { rewardId, edgeId, isAchieved, id, taskId } = raw;

    this.rewardId = rewardId;
    this.taskId = taskId;
    this.edgeId = edgeId;
    this.isAchieved = isAchieved;
    this.id = id;
  }

  validate(): void {
    //
  }
}
