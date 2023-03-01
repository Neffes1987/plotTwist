import { generateString } from '@mocks/functions';

import { CallTypeEnum } from '../../../../../constants/call.enum';
import { SHORT_VALUE_MAX_LENGTH } from '../../../../../frontend/Screens/Tasks/constants';
import { CallDTO } from '../../../../../types/entities/call';
import { ValidationError } from '../../../../errors/ValidationError';
import { Call } from '../Call';

describe('WHEN "Call" is created', () => {
  const callDTO: CallDTO = {
    partyMotivation: generateString(SHORT_VALUE_MAX_LENGTH + 2),
    type: CallTypeEnum.Gossip,
    description: 'description',
    id: 'test-law',
    name: 'test-name',
  };

  const call = new Call();

  beforeEach(() => {
    call.unSerialize(callDTO);
  });

  describe('AND "validate" is called', () => {
    it('AND all fields are ok, MUST exit', () => {
      let error: Nullable<ValidationError> = null;

      try {
        call.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toBeUndefined();
    });

    it('AND "name" is less then min value, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        call.name = '';
        call.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.name).toBeDefined();
    });

    it('AND "partyMotivation" is less then min value, MUST throw error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        call.partyMotivation = '';
        call.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.properties.partyMotivation).toBeDefined();
    });
  });

  it('AND "serialize" is called, MUST return "LawDTO"', () => {
    expect(call.serialize()).toEqual(callDTO);
  });
});
