import { CrossWorldEdgeDTO } from '../../../../../../types/entities/cross';
import { CrossWorldEdge } from '../CrossWorldEdge';

describe('WHEN "CrossTaskCharacter" is created', () => {
  const relationDTO: CrossWorldEdgeDTO = {
    id: 'Id',
    edgeId: 'edgeId',
    worldId: 'worldId',
    isSolved: true,
  };

  it('AND "serialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossWorldEdge();

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.serialize()).toEqual(relationDTO);
  });

  it('AND "setId" is called, MUST update "id" field', () => {
    const relation = new CrossWorldEdge();

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.id).toEqual(relationDTO.id);
  });

  it('AND "unSerialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossWorldEdge();

    relation.unSerialize(relationDTO);

    expect(relation.serialize()).toEqual(relationDTO);
  });
});
