import { HiddenCaveWorldDTO } from 'backend';
import { generateString } from '@mocks/generateString';

import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../../constants';
import { ValidationError } from '../../../../../errors/ValidationError';
import { HiddenCaveWorld } from '../HiddenCaveWorld';

describe('WHEN "HiddenCaveWorld" is created', () => {
  const hiddenDTO: HiddenCaveWorldDTO = {
    mainEdgeInformation: generateString(257),
    partyPlan: generateString(257),
    shadowIntroduction: generateString(257),
    description: 'description',
    failPrice: generateString(257),
    id: 'id',
    laws: [],
    name: generateString(7),
    plotId: 'plotId',
    reference: generateString(257),
    status: 'release',
    story: generateString(257),
    timeline: generateString(257),
    type: 'hiddenCave',
    waterholes: [],
  };

  it('AND "setPartyPlan" is called, MUST update "partyPlan"', () => {
    const hidden = new HiddenCaveWorld();

    hidden.setPartyPlan(hiddenDTO.partyPlan);

    expect(hidden.partyPlan).toEqual(hiddenDTO.partyPlan);
  });

  it('AND "setShadowIntroduction" is called, MUST update "shadowIntroduction"', () => {
    const hidden = new HiddenCaveWorld();

    hidden.setShadowIntroduction(hiddenDTO.shadowIntroduction);

    expect(hidden.shadowIntroduction).toEqual(hiddenDTO.shadowIntroduction);
  });

  it('AND "setMainEdgeInformation" is called, MUST update "mainEdgeInformation"', () => {
    const hidden = new HiddenCaveWorld();

    hidden.setMainEdgeInformation(hiddenDTO.mainEdgeInformation);

    expect(hidden.mainEdgeInformation).toEqual(hiddenDTO.mainEdgeInformation);
  });

  it('AND "serialize" is called, MUST generate serialized object from instance fields', () => {
    const hidden = new HiddenCaveWorld();

    hidden.unSerializeToEntity(hiddenDTO);

    expect(hidden.serialize()).toEqual(hiddenDTO);
  });

  describe('AND "validate" is called', () => {
    it('AND validation is ok, MUST exit', () => {
      const hidden = new HiddenCaveWorld();

      hidden.unSerializeToEntity(hiddenDTO);

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

      hidden.unSerializeToEntity({ ...hiddenDTO, [property]: generateString(range) });

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
