import { HolidayWorldDTO } from 'backend';
import { generateString } from '@mocks/generateString';

import { BIG_VALUE_MAX_LENGTH } from '../../../../../../constants';
import { ValidationError } from '../../../../../errors/ValidationError';
import { HolidayWorld } from '../HolydayWorld';

describe('WHEN "HolidayWorld" is created', () => {
  const holidayDTO: HolidayWorldDTO = {
    chase: 'shadowRunning',
    holidayGetSwordType: 'skewVision',
    holidayType: 'getSword',
    shadowRevenge: generateString(257),
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
    type: 'holiday',
    waterholes: [],
  };

  it('AND "setChase" is called, MUST update value for "chase"', () => {
    const holiday = new HolidayWorld();

    holiday.setChase('godSaving');

    expect(holiday.chase).toEqual('godSaving');
  });

  it('AND "setShadowRevenge" is called, MUST update value for "shadowRevenge"', () => {
    const holiday = new HolidayWorld();

    holiday.setShadowRevenge(holidayDTO.shadowRevenge);

    expect(holiday.shadowRevenge).toEqual(holidayDTO.shadowRevenge);
  });

  it('AND "setHolidayType" is called, MUST update value for "holidayType"', () => {
    const holiday = new HolidayWorld();

    holiday.setHolidayType('getSword');

    expect(holiday.holidayType).toEqual('getSword');
  });

  it('AND "setHolidaySubType" is called, MUST update value for "holidayGetSwordType"', () => {
    const holiday = new HolidayWorld();

    holiday.setHolidaySubType('potionSteeling');

    expect(holiday.holidayGetSwordType).toEqual('potionSteeling');
  });

  it('AND "serialize" is called, MUST return serialized object by instance field', () => {
    const holiday = new HolidayWorld();

    holiday.unSerializeToEntity(holidayDTO);

    expect(holiday.serialize()).toEqual(holidayDTO);
  });

  describe('AND "validate" is called', () => {
    const holiday = new HolidayWorld();

    beforeEach(() => {
      holiday.unSerializeToEntity(holidayDTO);
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

      holiday.setName('');

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
      holiday.setHolidayType(undefined);

      try {
        holiday.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.holidayType).toBeDefined();
    });

    it('AND "holidayType" is equal "getSword" AND "holidayGetSwordType" is not provided, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      holiday.setHolidayType('getSword');
      // @ts-ignore
      holiday.setHolidaySubType(undefined);

      try {
        holiday.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.holidayGetSwordType).toBeDefined();
    });

    describe('AND "chase" is equal "shadowRunning"', () => {
      beforeEach(() => {
        holiday.setChase('shadowRunning');
      });

      it('AND "shadowRevenge" is less then min value, MUST throw error', () => {
        holiday.setShadowRevenge('');

        let error: Nullable<ValidationError> = null;

        try {
          holiday.validate();
        } catch (e) {
          error = e;
        }

        expect(error?.properties.shadowRevenge).toBeDefined();
      });

      it('AND "shadowRevenge" is more then max value, MUST throw error', () => {
        holiday.setShadowRevenge(generateString(BIG_VALUE_MAX_LENGTH + 1));

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
