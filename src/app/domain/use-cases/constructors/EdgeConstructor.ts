import { IEdgeConstructor } from '../../../../types/constructors/edge.constructor';
import { EdgeDTO } from '../../../../types/entities/edge';
import { ActiveWorldEdge } from '../../../../types/entities/world';
import { Edge } from '../../entities/Challenge/Edge';
import { CrossEdgeReward } from '../../entities/Cross/CrossEdgeReward/CrossEdgeReward';
import { CrossWorldEdge } from '../../entities/Cross/CrossWorldEdge/CrossWorldEdge';
import { Reward } from '../../entities/Reward/Reward';

export class EdgeConstructor implements IEdgeConstructor {
  async getByWorldId(worldId: string): Promise<ActiveWorldEdge> {
    const crossWorld = new CrossWorldEdge();
    const crossWorldEdge = await crossWorld.list({
      query: {
        worldId,
      },
    });

    const edge = new Edge();

    edge.id = crossWorldEdge?.[0]?.edgeId;
    await edge.load();

    const crossEdgeRewards = new CrossEdgeReward();
    const rewards = new Reward();

    const assignedRewards = await crossEdgeRewards.listByEdgeId(edge.id);
    const assignedRewardsSet = {};

    assignedRewards.forEach(({ rewardId, isAchieved }) => {
      assignedRewardsSet[rewardId] = isAchieved;
    });

    const rewardsList = await rewards.list({ query: { id: Object.keys(assignedRewardsSet) } });

    return {
      ...edge.serialize(),
      isSolved: crossWorld.isSolved,
      rewards: rewardsList.map(reward => ({ ...reward, isAchieved: assignedRewardsSet[reward.id] })),
    };
  }

  async toggleEdgeStatus(edgeId: string, isSolved: boolean): Promise<boolean> {
    const crossWorld = new CrossWorldEdge();

    crossWorld.edgeId = edgeId;

    await crossWorld.load();

    crossWorld.isSolved = isSolved;

    await crossWorld.save();

    return true;
  }

  async create(worldId: string, dto: EdgeDTO): Promise<string> {
    const edge = new Edge();

    edge.unSerialize(dto);
    const edgeId = await edge.save();

    const crossWorldPlot = new CrossWorldEdge();

    crossWorldPlot.worldId = worldId;
    crossWorldPlot.isSolved = false;
    crossWorldPlot.edgeId = edgeId;

    await crossWorldPlot.save();

    return edgeId;
  }

  async save(dto: ActiveWorldEdge): Promise<string> {
    const edge = new Edge();

    edge.unSerialize(dto);
    await edge.save();

    return edge.id;
  }

  async toggleRewardInEdge(edgeId: string, rewardId: string): Promise<boolean> {
    const crossEdgeReward = new CrossEdgeReward();

    await crossEdgeReward.loadByRewardId(rewardId);

    if (crossEdgeReward.edgeId) {
      await crossEdgeReward.remove();
    } else {
      crossEdgeReward.edgeId = edgeId;
      crossEdgeReward.rewardId = rewardId;
      crossEdgeReward.isAchieved = false;

      await crossEdgeReward.save();
    }

    return true;
  }

  async getRewardsByEdgeId(edgeId: string): Promise<string[]> {
    const crossEdgeReward = new CrossEdgeReward();
    const list = await crossEdgeReward.listByEdgeId(edgeId);

    return list.map(({ rewardId }) => rewardId);
  }
}
