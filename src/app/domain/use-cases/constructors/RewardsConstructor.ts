import { IRewardConstructor } from '../../../../types/constructors/reward.constructor';
import { CrossEdgeReward } from '../../entities/Cross/CrossEdgeReward/CrossEdgeReward';
import { Reward } from '../../entities/Reward/Reward';

export class RewardsConstructor implements IRewardConstructor {
  async delete(id: string): Promise<boolean> {
    const crossWorldLaw = new CrossEdgeReward();

    await crossWorldLaw.listByEdgeId(id);
    await crossWorldLaw.remove();

    const reward = new Reward();

    reward.id = id;

    return reward.remove();
  }

  async get(id: string): Promise<Nullable<RewardDto>> {
    const reward = new Reward();

    reward.id = id;

    await reward.load();

    return reward.serialize();
  }

  list(params: ListParams<RewardDto>): Promise<RewardDto[]> {
    const reward = new Reward();

    return reward.list(params);
  }

  async save(dto: RewardDto): Promise<string> {
    const reward = new Reward();

    reward.unSerialize(dto);

    reward.id = await reward.save();

    return reward.id;
  }
}
