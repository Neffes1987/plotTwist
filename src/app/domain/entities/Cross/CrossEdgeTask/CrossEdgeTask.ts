import { CrossEdgeTaskDTO } from '../../../../../types/entities/cross';
import { AsyncStoreDataGateway } from '../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { ActiveRecord } from '../../ActiveRecord/ActiveRecord';

export class CrossEdgeTask extends ActiveRecord<CrossEdgeTaskDTO> {
  isAchieved = false;
  rewardId: string;
  taskId: string;
  edgeId: string;

  constructor() {
    super(new AsyncStoreDataGateway('cross-edge-task'));
  }

  serialize(): CrossEdgeTaskDTO {
    return {
      id: this.id,
      rewardId: this.rewardId,
      taskId: this.taskId,
      edgeId: this.edgeId,
      isAchieved: this.isAchieved,
    };
  }

  unSerialize(raw: CrossEdgeTaskDTO): void {
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

  listByEdgeId(edgeId: string): Promise<CrossEdgeTaskDTO[]> {
    return this._gateway.list({ query: { edgeId } });
  }

  async loadByRewardId(rewardId: string): Promise<void> {
    const dto = (await this._gateway.list({ query: { rewardId } }))[0];

    if (dto) {
      this.unSerialize(dto);
    }
  }

  async loadByTaskId(taskId: string): Promise<void> {
    const dto = (await this._gateway.list({ query: { taskId } }))[0];

    if (dto) {
      this.unSerialize(dto);
    }
  }
}
