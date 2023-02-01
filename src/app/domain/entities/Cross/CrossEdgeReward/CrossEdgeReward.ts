import { CrossEdgeRewardDTO } from '../../../../../types/entities/cross';
import { AsyncStoreDataGateway } from '../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { ActiveRecord } from '../../ActiveRecord/ActiveRecord';

export class CrossEdgeReward extends ActiveRecord<CrossEdgeRewardDTO> {
  isAchieved = false;
  rewardId: string;
  edgeId: string;

  constructor() {
    super(new AsyncStoreDataGateway('cross-edge-reward'));
  }

  serialize(): CrossEdgeRewardDTO {
    return {
      id: this.id,
      rewardId: this.rewardId,
      edgeId: this.edgeId,
      isAchieved: this.isAchieved,
    };
  }

  unSerialize(raw: CrossEdgeRewardDTO): void {
    const { rewardId, edgeId, isAchieved, id } = raw;

    this.rewardId = rewardId;
    this.edgeId = edgeId;
    this.isAchieved = isAchieved;
    this.id = id;
  }

  validate(): void {
    //
  }

  listByEdgeId(edgeId: string): Promise<CrossEdgeRewardDTO[]> {
    return this._gateway.list({ query: { edgeId } });
  }

  async loadByRewardId(rewardId: string): Promise<void> {
    const dto = (await this._gateway.list({ query: { rewardId } }))[0];

    if (dto) {
      this.unSerialize(dto);
    }
  }
}
