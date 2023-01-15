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

  async getEdgeRewards(edgeId: string): Promise<RewardInEdgeDTO[]> {
    const crossEdgeReward = new CrossEdgeReward();
    const reward = new Reward();

    const crossEdgeRewardDTOS = await crossEdgeReward.listByEdgeId(edgeId);
    const rewardsAchieved: Record<string, boolean> = {};

    crossEdgeRewardDTOS.forEach(({ rewardId, isAchieved }) => {
      rewardsAchieved[rewardId] = isAchieved;
    });

    const commonRewards = await reward.list({
      query: {
        id: Object.keys(rewardsAchieved),
      },
    });

    return commonRewards.map(law => ({ ...law, isAssigned: rewardsAchieved[law.id] }));
  }
}
