import { CrossEdgeRewardDTO } from '../../../../../../types/entities/cross';
import { CrossEdgeReward } from '../CrossEdgeReward';

describe('WHEN "CrossEdgeReward" is created', () => {
  const relationDTO: CrossEdgeRewardDTO = {
    id: 'Id',
    rewardId: 'rewardId',
    edgeId: 'edgeId',
    isAchieved: true,
  };

  it('AND "serialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossEdgeReward();

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.serialize()).toEqual(relationDTO);
  });

  it('AND "setId" is called, MUST update "id" field', () => {
    const relation = new CrossEdgeReward();

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.id).toEqual(relationDTO.id);
  });

  it('AND "unSerialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossEdgeReward();

    relation.unSerialize(relationDTO);

    expect(relation.serialize()).toEqual(relationDTO);
  });
});
