import { CrossWorldLawDTO } from '../../../../../../types/entities/cross';
import { CrossWorldLaw } from '../CrossWorldLaw';

describe('WHEN "CrossWorldLaw" is created', () => {
  const relationDTO: CrossWorldLawDTO = {
    id: 'Id',
    lawId: 'lawId',
    worldId: 'worldId',
    isBroken: true,
  };

  it('AND "serialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossWorldLaw('');

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.serialize()).toEqual(relationDTO);
  });

  it('AND "setId" is called, MUST update "id" field', () => {
    const relation = new CrossWorldLaw('');

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.id).toEqual(relationDTO.id);
  });

  it('AND "unSerialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossWorldLaw('');

    relation.unSerialize(relationDTO);

    expect(relation.serialize()).toEqual(relationDTO);
  });
});
