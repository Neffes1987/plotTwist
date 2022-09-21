import { LawDTO } from 'backend';
import { generateString } from '@mocks/functions';

import { MIDDLE_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../constants';
import { ValidationError } from '../../../../errors/ValidationError';
import { Law } from '../Law';

describe('WHEN "Law" is created', () => {
  const lawDTO: LawDTO = {
    description: 'description',
    id: 'test-law',
    isBroken: false,
    name: 'test-name',
    punishment: generateString(SHORT_VALUE_MAX_LENGTH),
  };

  const law = new Law();

  beforeEach(() => {
    law.unSerializeToEntity(lawDTO);
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
        law.setPunishment('');
        law.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual('VALIDATION_ERROR');
    });

    it('AND "name" is less then min value, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        law.setName('');
        law.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.name).toBeDefined();
    });

    it('AND "punishment" is more then max value, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        law.setPunishment(generateString(MIDDLE_VALUE_MAX_LENGTH));
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

  it.skip('AND "mentors" is called, MUST return "mentors" value', () => {});

  it('AND "isBroken" is called, MUST return "isBroken" value', () => {
    expect(law.isBroken).toEqual(lawDTO.isBroken);
  });

  it('AND "setPunishment" is called, MUST set value into "punishment"', () => {
    law.setPunishment('new-value');

    expect(law.punishment).toEqual('new-value');
  });

  it.skip('AND "setMentors" is called, MUST set value into "mentors"', () => {});

  it('AND "serialize" is called, MUST return "LawDTO"', () => {
    expect(law.serialize()).toEqual(lawDTO);
  });
});
