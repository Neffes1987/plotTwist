import { generateString } from '@mocks/functions';

import { WorldEnum } from '../../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH, MIDDLE_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../../frontend/constants';
import { WorldDTO } from '../../../../../../types/entities/world';
import { ValidationError } from '../../../../../errors/ValidationError';
import { AbstractWorld } from '../AbstractWorld';

class TestWorld extends AbstractWorld<WorldDTO> {
  constructor() {
    super(WorldEnum.PlainWorld, '');
  }
}

describe('WHEN "AbstractWorld" is created', () => {
  const serializedWorld: WorldDTO = {
    failPrice: generateString(257),
    id: 'id',
    name: generateString(7),
    reference: generateString(257),
    story: generateString(257),
    timeline: generateString(257),
    type: WorldEnum.PrivateWorld,
  };

  it('AND "serialize" is called, MUST return serialized object', () => {
    const world = new TestWorld();

    world.unSerialize(serializedWorld);

    expect(world.serialize()).toEqual(serializedWorld);
  });

  describe('AND "validate" is called', () => {
    it('AND all data is ok, MUST return', () => {
      const world = new TestWorld();

      world.unSerialize(serializedWorld);

      let error: Nullable<Error> = null;

      try {
        world.validate();
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });

    it.each([
      ['failPrice', SHORT_VALUE_MAX_LENGTH - 1],
      ['failPrice', MIDDLE_VALUE_MAX_LENGTH + 1],
      ['name', 0],
      ['reference', SHORT_VALUE_MAX_LENGTH - 1],
      ['reference', MIDDLE_VALUE_MAX_LENGTH + 1],
      ['story', SHORT_VALUE_MAX_LENGTH - 1],
      ['story', BIG_VALUE_MAX_LENGTH + 1],
      ['timeline', SHORT_VALUE_MAX_LENGTH - 1],
      ['timeline', MIDDLE_VALUE_MAX_LENGTH + 1],
    ])('AND check of %p field is failed, MUST throw "ValidationError"', (property: string, range: number) => {
      const testSet = {
        ...serializedWorld,
        [property]: generateString(range),
      };

      const world = new TestWorld();

      world.unSerialize(testSet);

      let error: Nullable<ValidationError> = null;

      try {
        world.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties[property]).toHaveLength(1);
    });
  });
});
