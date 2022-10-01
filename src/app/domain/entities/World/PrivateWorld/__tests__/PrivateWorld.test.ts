import { PrivateWorldDTO } from 'backend';
import { generateString } from '@mocks/generateString';

import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../../constants';
import { ValidationError } from '../../../../../errors/ValidationError';
import { PrivateWorld } from '../PrivateWorld';

describe('WHEN "PrivateWorld" is created', () => {
  const privateDTO: PrivateWorldDTO = {
    waterholes: [],
    description: '',
    contrast: generateString(257),
    type: 'privateWorld',
    failPrice: generateString(257),
    id: 'id',
    laws: [],
    name: generateString(7),
    plotId: 'plotId',
    reference: generateString(257),
    status: 'release',
    story: generateString(257),
    timeline: generateString(257),
  };

  it('AND "setContrast" is called, MUST update field "contrast"', () => {
    const privateWorld = new PrivateWorld();

    privateWorld.setContrast(privateDTO.contrast);

    expect(privateWorld.contrast).toEqual(privateDTO.contrast);
  });

  it('AND "serialize" is called, MUST generate object by instance fields', () => {
    const privateWorld = new PrivateWorld();

    privateWorld.unSerializeToEntity(privateDTO);

    expect(privateWorld.serialize()).toEqual(privateDTO);
  });

  describe('AND "validate" is called', () => {
    it('AND validation is ok, must exit', () => {
      const privateWorld = new PrivateWorld();

      privateWorld.unSerializeToEntity(privateDTO);

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

      privateWorld.unSerializeToEntity({ ...privateDTO, [property]: generateString(range) });

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
