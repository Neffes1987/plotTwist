import { generateString } from '@mocks/functions';

import { MIDDLE_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../frontend/Screens/Tasks/constants';
import { ValidationError } from '../../../../errors/ValidationError';
import { Law } from '../Law';

describe('WHEN "Call" is created', () => {
  const lawDTO: LawDTO = {
    description: 'description',
    id: 'test-law',
    name: 'test-name',
    punishment: generateString(SHORT_VALUE_MAX_LENGTH),
  };

  const law = new Law();

  beforeEach(() => {
    law.unSerialize(lawDTO);
  });

  describe('AND "validate" is called', () => {
    it('AND all fields are ok, MUST exit', () => {
      let error: Nullable<ValidationError> = null;

      try {
        law.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toBeUndefined();
    });

    it('AND "punishment" is less then min value, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        law.punishment = '';
        law.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual('VALIDATION_ERROR');
    });

    it('AND "name" is less then min value, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        law.name = '';
        law.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.name).toBeDefined();
    });

    it('AND "punishment" is more then max value, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        law.punishment = generateString(MIDDLE_VALUE_MAX_LENGTH + 1);
        law.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual('VALIDATION_ERROR');
    });
  });

  it('AND "punishment" is called, MUST return "punishment" value', () => {
    expect(law.punishment).toEqual(lawDTO.punishment);
  });

  it('AND "serialize" is called, MUST return "LawDTO"', () => {
    expect(law.serialize()).toEqual(lawDTO);
  });
});
