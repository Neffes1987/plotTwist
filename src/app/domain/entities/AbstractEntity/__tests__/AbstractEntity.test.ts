import { AbstractEntity } from '../AbstractEntity';

class TestEntity extends AbstractEntity {
  validate(): void {
    // some code
  }
}

describe('AbstractEntity', () => {
  const testEntityDTO = {
    id: 'testId',
  };
  const testEntity = new TestEntity();

  it('AND "setId" is called, MUST update "id" property', () => {
    testEntity.setId(testEntityDTO.id);

    expect(testEntity.id).toEqual(testEntityDTO.id);
  });

  it('AND "serialize" is called, MUST return serialized object with {id, name, description}', () => {
    testEntity.setId(testEntityDTO.id);

    expect(testEntity.serialize()).toEqual(testEntityDTO);
  });

  it('AND "unSerializeToEntity" is called, MUST initialize fields from serialized object with {id, name, description}', () => {
    const testEntity = new TestEntity();

    testEntity.unSerializeToEntity(testEntityDTO);

    expect(testEntity.id).toEqual(testEntityDTO.id);
  });
});
