import { generateString } from '@mocks/generateString';

import { StatusEnum } from '../../../../../../constants/status.enum';
import { FinalTypeEnum, PotionTypeEnum, WorldEnum } from '../../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH } from '../../../../../../frontend/constants';
import { ReturnWithPotionWorldDTO } from '../../../../../../types/entities/world';
import { ValidationError } from '../../../../../errors/ValidationError';
import { ReturnWithPotionWorld } from '../ReturnWithPotionWorld';

describe('WHEN "ReturnWithPotionWorld" is created', () => {
  const returnDTO: ReturnWithPotionWorldDTO = {
    cliffhanger: generateString(256),
    finalType: FinalTypeEnum.Cycle,
    potionType: PotionTypeEnum.Love,
    type: WorldEnum.ReturnWithPotionWorld,
    failPrice: generateString(257),
    id: 'id',
    name: generateString(7),
    reference: generateString(257),
    status: StatusEnum.Released,
    story: generateString(257),
    timeline: generateString(257),
  };

  it('AND "serialize" is called, MUST generate object by instance fields', () => {
    const returnWithPotionWorld = new ReturnWithPotionWorld();

    returnWithPotionWorld.unSerialize(returnDTO);

    expect(returnWithPotionWorld.serialize()).toEqual(returnDTO);
  });

  describe('AND "validate" is called', () => {
    it('AND validation is ok, must exit', () => {
      const returnWithPotionWorld = new ReturnWithPotionWorld();

      returnWithPotionWorld.unSerialize(returnDTO);

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

      returnWithPotionWorld.unSerialize({ ...returnDTO, [property]: generateString(range) });

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
