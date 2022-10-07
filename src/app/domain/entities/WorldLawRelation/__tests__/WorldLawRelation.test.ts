import { WorldLawRelationDTO } from '../../interface';
import { WorldLawRelation } from '../WorldLawRelation';

describe('WHEN "WorldLawRelation" is created', () => {
  const relationDTO: WorldLawRelationDTO = {
    id: 'Id',
    lawId: 'lawId',
    worldId: 'worldId',
    isBroken: true,
  };

  it('AND "serialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new WorldLawRelation();

    relation.unSerialize(relationDTO);
    relation.setId(relationDTO.id);

    expect(relation.serialize()).toEqual(relationDTO);
  });

  it('AND "setId" is called, MUST update "id" field', () => {
    const relation = new WorldLawRelation();

    relation.unSerialize(relationDTO);
    relation.setId(relationDTO.id);

    expect(relation.id).toEqual(relationDTO.id);
  });

  it('AND "unSerialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new WorldLawRelation();

    relation.unSerialize(relationDTO);

    expect(relation.serialize()).toEqual(relationDTO);
  });
});
