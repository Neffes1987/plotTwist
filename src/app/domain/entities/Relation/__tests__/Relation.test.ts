import { RelationDTO } from '../../interface';
import { Relation } from '../Relation';

describe('WHEN "Relation" is created', () => {
  const relationDTO: RelationDTO = {
    id: 'Id',
    fieldId: 'lawId',
    fieldName: 'law',
    siblingId: 'worldId',
    siblingName: 'world',
  };

  it('AND "serialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new Relation();

    relation.unSerialize(relationDTO);
    relation.setId(relationDTO.id);

    expect(relation.serialize()).toEqual(relationDTO);
  });

  it('AND "setId" is called, MUST update "id" field', () => {
    const relation = new Relation();

    relation.unSerialize(relationDTO);
    relation.setId(relationDTO.id);

    expect(relation.id).toEqual(relationDTO.id);
  });

  it('AND "unSerialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new Relation();

    relation.unSerialize(relationDTO);

    expect(relation.serialize()).toEqual(relationDTO);
  });
});
