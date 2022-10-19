import { generateString } from '@mocks/generateString';

import { StatusEnum } from '../../../../../../constants/status.enum';
import { ChaseTypeEnum, HolidayGetSwordTypeEnum, HolidayTypeEnum, WorldEnum } from '../../../../../../constants/world.enum';
import { BIG_VALUE_MAX_LENGTH } from '../../../../../../frontend/constants';
import { HolidayWorldDTO } from '../../../../../../types/entities/world';
import { ValidationError } from '../../../../../errors/ValidationError';
import { HolidayWorld } from '../HolydayWorld';

describe('WHEN "HolidayWorld" is created', () => {
  const holidayDTO: HolidayWorldDTO = {
    chase: ChaseTypeEnum.FollowersChase,
    holidayGetSwordType: HolidayGetSwordTypeEnum.Epiphania,
    holidayType: HolidayTypeEnum.GetSword,
    shadowRevenge: generateString(257),
    failPrice: generateString(257),
    id: 'id',
    name: generateString(7),
    reference: generateString(257),
    status: StatusEnum.Draft,
    story: generateString(257),
    timeline: generateString(257),
    type: WorldEnum.HolidayWorld,
  };

  it('AND "serialize" is called, MUST return serialized object by instance field', () => {
    const holiday = new HolidayWorld();

    holiday.unSerialize(holidayDTO);

    expect(holiday.serialize()).toEqual(holidayDTO);
  });

  describe('AND "validate" is called', () => {
    const holiday = new HolidayWorld();

    beforeEach(() => {
      holiday.unSerialize(holidayDTO);
    });

    it('AND validation is ok, must exit', () => {
      let error: Nullable<ValidationError> = null;

      try {
        holiday.validate();
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });

    it('AND common field validation is failed, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      holiday.name = '';

      try {
        holiday.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.name).toBeDefined();
    });

    it('AND "holidayType" is not provided, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      // @ts-ignore
      holiday.holidayType = undefined;

      try {
        holiday.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.holidayType).toBeDefined();
    });

    it('AND "holidayType" is equal "getSword" AND "holidayGetSwordType" is not provided, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      holiday.holidayType = HolidayTypeEnum.GetSword;
      // @ts-ignore
      holiday.holidayGetSwordType = undefined;

      try {
        holiday.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.holidayGetSwordType).toBeDefined();
    });

    describe('AND "chase" is equal "shadowRunning"', () => {
      beforeEach(() => {
        holiday.chase = ChaseTypeEnum.ShadowRunning;
      });

      it('AND "shadowRevenge" is less then min value, MUST throw error', () => {
        holiday.shadowRevenge = '';

        let error: Nullable<ValidationError> = null;

        try {
          holiday.validate();
        } catch (e) {
          error = e;
        }

        expect(error?.properties.shadowRevenge).toBeDefined();
      });

      it('AND "shadowRevenge" is more then max value, MUST throw error', () => {
        holiday.shadowRevenge = generateString(BIG_VALUE_MAX_LENGTH + 1);

        let error: Nullable<ValidationError> = null;

        try {
          holiday.validate();
        } catch (e) {
          error = e;
        }

        expect(error?.properties.shadowRevenge).toBeDefined();
      });
    });
  });
});
