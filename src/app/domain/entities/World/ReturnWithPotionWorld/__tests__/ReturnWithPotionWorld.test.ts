import { ReturnWithPotionWorldDTO } from 'backend';
import { generateString } from '@mocks/generateString';

import { BIG_VALUE_MAX_LENGTH } from '../../../../../../constants';
import { ValidationError } from '../../../../../errors/ValidationError';
import { ReturnWithPotionWorld } from '../ReturnWithPotionWorld';

describe('WHEN "ReturnWithPotionWorld" is created', () => {
  const returnDTO: ReturnWithPotionWorldDTO = {
    cliffhanger: generateString(256),
    finalType: 'cycle',
    potionType: 'love',
    waterholes: [],
    description: '',
    type: 'returnWithPotion',
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

  it('AND "setFinalType" is called, MUST update field "finalType"', () => {
    const returnWithPotionWorld = new ReturnWithPotionWorld();

    returnWithPotionWorld.setFinalType(returnDTO.finalType);

    expect(returnWithPotionWorld.finalType).toEqual(returnDTO.finalType);
  });

  it('AND "setPotionType" is called, MUST update field "potionType"', () => {
    const returnWithPotionWorld = new ReturnWithPotionWorld();

    returnWithPotionWorld.setPotionType(returnDTO.potionType);

    expect(returnWithPotionWorld.potionType).toEqual(returnDTO.potionType);
  });

  it('AND "setCliffhanger" is called, MUST update field "cliffhanger"', () => {
    const returnWithPotionWorld = new ReturnWithPotionWorld();

    returnWithPotionWorld.setCliffhanger(returnDTO.cliffhanger);

    expect(returnWithPotionWorld.cliffhanger).toEqual(returnDTO.cliffhanger);
  });

  it('AND "serialize" is called, MUST generate object by instance fields', () => {
    const returnWithPotionWorld = new ReturnWithPotionWorld();

    returnWithPotionWorld.unSerializeToEntity(returnDTO);

    expect(returnWithPotionWorld.serialize()).toEqual(returnDTO);
  });

  describe('AND "validate" is called', () => {
    it('AND validation is ok, must exit', () => {
      const returnWithPotionWorld = new ReturnWithPotionWorld();

      returnWithPotionWorld.unSerializeToEntity(returnDTO);

      let error: Nullable<ValidationError> = null;

      try {
        returnWithPotionWorld.validate();
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });

    it.each([
      ['name', 0],
      ['cliffhanger', BIG_VALUE_MAX_LENGTH + 1],
    ])('AND validation is failed for field %p, MUST throw validation error', (property, range) => {
      const returnWithPotionWorld = new ReturnWithPotionWorld();

      returnWithPotionWorld.unSerializeToEntity({ ...returnDTO, [property]: generateString(range) });

      let error: Nullable<ValidationError> = null;

      try {
        returnWithPotionWorld.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties[property]).toHaveLength(1);
    });
  });
});
