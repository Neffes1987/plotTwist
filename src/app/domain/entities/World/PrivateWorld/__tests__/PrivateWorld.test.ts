import { generateString } from '@mocks/generateString';

import { StatusEnum } from '../../../../../../constants/status.enum';
import { WorldEnum } from '../../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../../frontend/constants';
import { PrivateWorldDTO } from '../../../../../../types/entities/world';
import { ValidationError } from '../../../../../errors/ValidationError';
import { PrivateWorld } from '../PrivateWorld';

describe('WHEN "PrivateWorld" is created', () => {
  const privateDTO: PrivateWorldDTO = {
    contrast: generateString(257),
    type: WorldEnum.PrivateWorld,
    failPrice: generateString(257),
    id: 'id',
    name: generateString(7),
    reference: generateString(257),
    status: StatusEnum.Draft,
    story: generateString(257),
    timeline: generateString(257),
  };

  it('AND "serialize" is called, MUST generate object by instance fields', () => {
    const privateWorld = new PrivateWorld();

    privateWorld.unSerialize(privateDTO);

    expect(privateWorld.serialize()).toEqual(privateDTO);
  });

  describe('AND "validate" is called', () => {
    it('AND validation is ok, must exit', () => {
      const privateWorld = new PrivateWorld();

      privateWorld.unSerialize(privateDTO);

      let error: Nullable<ValidationError> = null;

      try {
        privateWorld.validate();
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });

    it.each([
      ['name', 0],
      ['contrast', SHORT_VALUE_MAX_LENGTH - 1],
      ['contrast', BIG_VALUE_MAX_LENGTH + 1],
    ])('AND validation is failed for field %p, MUST throw validation error', (property, range) => {
      const privateWorld = new PrivateWorld();

      privateWorld.unSerialize({ ...privateDTO, [property]: generateString(range) });

      let error: Nullable<ValidationError> = null;

      try {
        privateWorld.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties[property]).toHaveLength(1);
    });
  });
});
