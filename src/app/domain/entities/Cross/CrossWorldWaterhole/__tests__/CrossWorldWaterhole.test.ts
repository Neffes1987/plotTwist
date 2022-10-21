import { CrossWorldWaterholeDTO } from '../../../../../../types/entities/cross';
import { CrossWorldWaterhole } from '../CrossWorldWaterhole';

describe('WHEN "CrossWorldWaterhole" is created', () => {
  const relationDTO: CrossWorldWaterholeDTO = {
    id: 'Id',
    waterholeId: 'waterholeId',
    worldId: 'worldId',
  };

  it('AND "serialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossWorldWaterhole();

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.serialize()).toEqual(relationDTO);
  });

  it('AND "setId" is called, MUST update "id" field', () => {
    const relation = new CrossWorldWaterhole();

    relation.unSerialize(relationDTO);
    relation.id = relationDTO.id;

    expect(relation.id).toEqual(relationDTO.id);
  });

  it('AND "unSerialize" is called, MUST generate raw object from instance fields', () => {
    const relation = new CrossWorldWaterhole();

    relation.unSerialize(relationDTO);

    expect(relation.serialize()).toEqual(relationDTO);
  });
});
