import { generateString } from '@mocks/functions';

import { StatusEnum } from '../../../../../constants/status.enum';
import { ChaseTypeEnum, FinalTypeEnum, HolidayTypeEnum, PotionTypeEnum, WorldEnum } from '../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH, MIDDLE_VALUE_MAX_LENGTH } from '../../../../../frontend/Screens/Tasks/constants';
import { WorldDTO } from '../../../../../types/entities/world';
import { ValidationError } from '../../../../errors/ValidationError';
import { World } from '../World';

describe('WHEN "World" is created', () => {
  const serializedWorld: WorldDTO = {
    cliffhanger: '',
    contrast: '',
    finalType: FinalTypeEnum.AchievePerfect,
    holidayType: HolidayTypeEnum.GetSword,
    introduction: '',
    mainEdgeInformation: '',
    partyPlan: '',
    potionType: PotionTypeEnum.BadExperience,
    shadowIntroduction: '',
    shadowRevenge: '',
    failPrice: generateString(257),
    id: 'id',
    name: generateString(7),
    reference: generateString(257),
    story: generateString(257),
    timeline: generateString(257),
    type: WorldEnum.PrivateWorld,
    status: StatusEnum.Draft,
  };

  it('AND "serialize" is called, MUST return serialized object', () => {
    const world = new World();

    world.unSerialize(serializedWorld);

    expect(world.serialize()).toEqual(serializedWorld);
  });

  describe('AND "validate" is called', () => {
    it('AND all data is ok, MUST return', () => {
      const world = new World();

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
      ['failPrice', MIDDLE_VALUE_MAX_LENGTH + 1],
      ['name', 0],
      ['reference', MIDDLE_VALUE_MAX_LENGTH + 1],
      ['story', BIG_VALUE_MAX_LENGTH + 1],
      ['timeline', MIDDLE_VALUE_MAX_LENGTH + 1],
    ])('AND check of %p field is failed, MUST throw "ValidationError"', (property: string, range: number) => {
      const testSet = {
        ...serializedWorld,
        [property]: generateString(range),
      };

      const world = new World();

      world.unSerialize(testSet);

      let error: Nullable<ValidationError> = null;

      try {
        world.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties[property]).toHaveLength(1);
    });

    it('AND it is plain world AND "introduction" is more then threshold, MUST throw error', () => {
      const testSet = {
        ...serializedWorld,
        type: WorldEnum.PlainWorld,
        introduction: generateString(BIG_VALUE_MAX_LENGTH + 1),
      };

      const world = new World();

      world.unSerialize(testSet);

      let error: Nullable<ValidationError> = null;

      try {
        world.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.introduction).toHaveLength(1);
    });

    it('AND it is private world AND "contrast" is more then threshold, MUST throw error', () => {
      const testSet = {
        ...serializedWorld,
        type: WorldEnum.PrivateWorld,
        contrast: generateString(BIG_VALUE_MAX_LENGTH + 1),
      };

      const world = new World();

      world.unSerialize(testSet);

      let error: Nullable<ValidationError> = null;

      try {
        world.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.contrast).toHaveLength(1);
    });

    it('AND it is return with potion world AND "cliffhanger" is more then threshold, MUST throw error', () => {
      const testSet = {
        ...serializedWorld,
        type: WorldEnum.ReturnWithPotionWorld,
        cliffhanger: generateString(BIG_VALUE_MAX_LENGTH + 1),
      };

      const world = new World();

      world.unSerialize(testSet);

      let error: Nullable<ValidationError> = null;

      try {
        world.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.cliffhanger).toHaveLength(1);
    });

    describe('AND it is hidden cave world', () => {
      it.each([['partyPlan'], ['shadowIntroduction'], ['mainEdgeInformation']])('AND %p is more then threshold, MUST throw error', fieldName => {
        const testSet = {
          ...serializedWorld,
          type: WorldEnum.HiddenCaveWorld,
          [fieldName]: generateString(BIG_VALUE_MAX_LENGTH + 1),
        };

        const world = new World();

        world.unSerialize(testSet);

        let error: Nullable<ValidationError> = null;

        try {
          world.validate();
        } catch (e) {
          error = e;
        }

        expect(error?.properties[fieldName]).toHaveLength(1);
      });
    });

    describe('AND it is holiday world', () => {
      it('AND "holidayType" is not provided, MUST throw error', () => {
        const testSet = {
          ...serializedWorld,
          type: WorldEnum.HolidayWorld,
          holidayType: null,
        };

        const world = new World();

        // @ts-ignore
        world.unSerialize(testSet);

        let error: Nullable<ValidationError> = null;

        try {
          world.validate();
        } catch (e) {
          error = e;
        }

        expect(error?.properties.holidayType).toHaveLength(1);
      });

      it('AND "holidayType" is "HolidayTypeEnum.GetSword" AND "holidayGetSwordType" is not provided, MUST throw error', () => {
        const testSet = {
          ...serializedWorld,
          type: WorldEnum.HolidayWorld,
          holidayType: HolidayTypeEnum.GetSword,
          holidayGetSwordType: null,
        };

        const world = new World();

        // @ts-ignore
        world.unSerialize(testSet);

        let error: Nullable<ValidationError> = null;

        try {
          world.validate();
        } catch (e) {
          error = e;
        }

        expect(error?.properties.holidayGetSwordType).toHaveLength(1);
      });

      it('AND "chase" is "ChaseTypeEnum.ShadowRunning" AND "shadowRevenge" is more then threshold, MUST throw error', () => {
        const testSet = {
          ...serializedWorld,
          type: WorldEnum.HolidayWorld,
          chase: ChaseTypeEnum.ShadowRunning,
          shadowRevenge: generateString(BIG_VALUE_MAX_LENGTH + 1),
        };

        const world = new World();

        // @ts-ignore
        world.unSerialize(testSet);

        let error: Nullable<ValidationError> = null;

        try {
          world.validate();
        } catch (e) {
          error = e;
        }

        expect(error?.properties.shadowRevenge).toHaveLength(1);
      });
    });
  });
});
