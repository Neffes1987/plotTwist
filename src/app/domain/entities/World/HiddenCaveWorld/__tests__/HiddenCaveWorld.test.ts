import { generateString } from '@mocks/generateString';

import { StatusEnum } from '../../../../../../constants/status.enum';
import { WorldEnum } from '../../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../../frontend/constants';
import { HiddenCaveWorldDTO } from '../../../../../../types/entities/world';
import { ValidationError } from '../../../../../errors/ValidationError';
import { HiddenCaveWorld } from '../HiddenCaveWorld';

describe('WHEN "HiddenCaveWorld" is created', () => {
  const hiddenDTO: HiddenCaveWorldDTO = {
    mainEdgeInformation: generateString(257),
    partyPlan: generateString(257),
    shadowIntroduction: generateString(257),
    failPrice: generateString(257),
    id: 'id',
    name: generateString(7),
    reference: generateString(257),
    status: StatusEnum.Draft,
    story: generateString(257),
    timeline: generateString(257),
    type: WorldEnum.HiddenCaveWorld,
  };

  it('AND "serialize" is called, MUST generate serialized object from instance fields', () => {
    const hidden = new HiddenCaveWorld();

    hidden.unSerialize(hiddenDTO);

    expect(hidden.serialize()).toEqual(hiddenDTO);
  });

  describe('AND "validate" is called', () => {
    it('AND validation is ok, MUST exit', () => {
      const hidden = new HiddenCaveWorld();

      hidden.unSerialize(hiddenDTO);

      let error: Nullable<ValidationError> = null;

      try {
        hidden.validate();
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });

    it.each([
      ['partyPlan', SHORT_VALUE_MAX_LENGTH - 1],
      ['partyPlan', BIG_VALUE_MAX_LENGTH + 1],
      ['name', 0],
      ['shadowIntroduction', SHORT_VALUE_MAX_LENGTH - 1],
      ['shadowIntroduction', BIG_VALUE_MAX_LENGTH + 1],
      ['mainEdgeInformation', SHORT_VALUE_MAX_LENGTH - 1],
      ['mainEdgeInformation', BIG_VALUE_MAX_LENGTH + 1],
    ])('AND validation is failed for field %p, MUST throw validation error', (property, range) => {
      const hidden = new HiddenCaveWorld();

      hidden.unSerialize({ ...hiddenDTO, [property]: generateString(range) });

      let error: Nullable<ValidationError> = null;

      try {
        hidden.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties[property]).toHaveLength(1);
    });
  });
});
