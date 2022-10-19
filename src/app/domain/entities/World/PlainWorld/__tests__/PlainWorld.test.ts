import { generateString } from '@mocks/generateString';

import { StatusEnum } from '../../../../../../constants/status.enum';
import { WorldEnum } from '../../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../../frontend/constants';
import { PlainWorldDTO } from '../../../../../../types/entities/world';
import { ValidationError } from '../../../../../errors/ValidationError';
import { PlainWorld } from '../PlainWorld';

describe('WHEN "PlainWorld" is created', () => {
  const plainDTO: PlainWorldDTO = {
    introduction: generateString(257),
    type: WorldEnum.PlainWorld,
    failPrice: generateString(257),
    id: 'id',
    name: generateString(7),
    reference: generateString(257),
    status: StatusEnum.Draft,
    story: generateString(257),
    timeline: generateString(257),
  };

  it('AND "serialize" is called, MUST generate object by instance fields', () => {
    const plain = new PlainWorld();

    plain.unSerialize(plainDTO);

    expect(plain.serialize()).toEqual(plainDTO);
  });

  describe('AND "validate" is called', () => {
    it('AND validation is ok, must exit', () => {
      const plain = new PlainWorld();

      plain.unSerialize(plainDTO);

      let error: Nullable<ValidationError> = null;

      try {
        plain.validate();
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });

    it.each([
      ['name', 0],
      ['introduction', SHORT_VALUE_MAX_LENGTH - 1],
      ['introduction', BIG_VALUE_MAX_LENGTH + 1],
    ])('AND validation is failed for field %p, MUST throw validation error', (property, range) => {
      const plain = new PlainWorld();

      plain.unSerialize({ ...plainDTO, [property]: generateString(range) });

      let error: Nullable<ValidationError> = null;

      try {
        plain.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties[property]).toHaveLength(1);
    });
  });
});
