import { PlainWorldDTO } from 'backend';
import { generateString } from '@mocks/generateString';

import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../../constants';
import { ValidationError } from '../../../../../errors/ValidationError';
import { PlainWorld } from '../PlainWorld';

describe('WHEN "PlainWorld" is created', () => {
  const plainDTO: PlainWorldDTO = {
    waterholes: [],
    description: '',
    introduction: generateString(257),
    type: 'plainWorld',
    failPrice: generateString(257),
    id: 'id',
    laws: [],
    name: generateString(7),
    plotId: 'plotId',
    reference: generateString(257),
    status: 'release',
    story: generateString(257),
    timeline: generateString(257),
    problems: [],
  };

  it('AND "setIntroduction" is called, MUST update field "introduction"', () => {
    const plain = new PlainWorld();

    plain.setIntroduction(plainDTO.introduction);

    expect(plain.introduction).toEqual(plainDTO.introduction);
  });

  it('AND "setProblems" is called, MUST update field "problems"', () => {
    const plain = new PlainWorld();

    plain.setProblems(plainDTO.problems);

    expect(plain.problems).toEqual(plainDTO.problems);
  });

  it('AND "serialize" is called, MUST generate object by instance fields', () => {
    const plain = new PlainWorld();

    plain.unSerializeToEntity(plainDTO);

    expect(plain.serialize()).toEqual(plainDTO);
  });

  describe('AND "validate" is called', () => {
    it('AND validation is ok, must exit', () => {
      const plain = new PlainWorld();

      plain.unSerializeToEntity(plainDTO);

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

      plain.unSerializeToEntity({ ...plainDTO, [property]: generateString(range) });

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
