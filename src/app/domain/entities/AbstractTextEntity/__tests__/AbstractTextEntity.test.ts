import { generateString } from '@mocks/functions';

import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../constants';
import { AbstractTextEntity } from '../AbstractTextEntity';

class TestEntity extends AbstractTextEntity {}

describe('AbstractTextEntity', () => {
  const testEntityDTO = {
    id: 'testId',
    name: 'test_name',
    description: 'test_description',
  };
  const testEntity = new TestEntity();

  it('AND "setId" is called, MUST update "id" property', () => {
    testEntity.setId(testEntityDTO.id);

    expect(testEntity.id).toEqual(testEntityDTO.id);
  });

  it('AND "setName" is called, MUST update "name" property', () => {
    testEntity.setName(testEntityDTO.name);

    expect(testEntity.name).toEqual(testEntityDTO.name);
  });

  it('AND "setDescription" is called, MUST update "description" property', () => {
    testEntity.setDescription(testEntityDTO.description);

    expect(testEntity.description).toEqual(testEntityDTO.description);
  });

  it('AND "serialize" is called, MUST return serialized object with {id, name, description}', () => {
    testEntity.setId(testEntityDTO.id);
    testEntity.setName(testEntityDTO.name);
    testEntity.setDescription(testEntityDTO.description);

    expect(testEntity.serialize()).toEqual(testEntityDTO);
  });

  it('AND "unSerializeToEntity" is called, MUST initialize fields from serialized object with {id, name, description}', () => {
    const testEntity = new TestEntity();

    testEntity.unSerializeToEntity(testEntityDTO);

    expect(testEntity.id).toEqual(testEntityDTO.id);
    expect(testEntity.name).toEqual(testEntityDTO.name);
    expect(testEntity.description).toEqual(testEntityDTO.description);
  });

  describe('AND "validate" is called', () => {
    it('AND all fields is "ok", MUST finish without errors', () => {
      const testEntity = new TestEntity();

      testEntity.unSerializeToEntity(testEntityDTO);

      let error: Nullable<Error> = null;

      try {
        testEntity.validate();
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });

    it('AND "name" is less then min value, MUST throw "ValidationError"', () => {
      const testEntity = new TestEntity();

      testEntity.unSerializeToEntity(testEntityDTO);
      testEntity.setName('');

      let error: Nullable<Error> = null;

      try {
        testEntity.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual('VALIDATION_ERROR');
    });

    it('AND "name" is more then max value, MUST throw "ValidationError"', () => {
      const testEntity = new TestEntity();

      testEntity.unSerializeToEntity(testEntityDTO);
      testEntity.setName(generateString(SHORT_VALUE_MAX_LENGTH + 1));

      let error: Nullable<Error> = null;

      try {
        testEntity.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual('VALIDATION_ERROR');
    });

    it('AND "description" is more then max value, MUST throw "ValidationError"', () => {
      const testEntity = new TestEntity();

      testEntity.unSerializeToEntity(testEntityDTO);
      testEntity.setDescription(generateString(BIG_VALUE_MAX_LENGTH));

      let error: Nullable<Error> = null;

      try {
        testEntity.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual('VALIDATION_ERROR');
    });
  });
});
