import { ValidationError } from '../../../../errors/ValidationError';
import { DtoValidator } from '../DtoValidator';

describe('DtoValidator', () => {
  const testedValidator = new DtoValidator({
    id: 'name',
  });

  describe('WHEN "checkRequiredFields" is called', () => {
    it('AND required fields are not provided, MUST throw "ValidationError" for each field', () => {
      let error: Nullable<ValidationError> = null;

      try {
        // @ts-ignore
        testedValidator.checkRequiredFields(['status']);
      } catch (e) {
        error = e;
      }

      expect(error?.properties.status).toHaveLength(1);
    });

    it('AND required fields are provided, MUST exit without error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        testedValidator.checkRequiredFields(['id']);
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });
  });

  describe('WHEN "checkFieldRange" is called', () => {
    it('AND provided fields are not in range, MUST throw "ValidationError" for each field', () => {
      let error: Nullable<ValidationError> = null;

      try {
        testedValidator.checkFieldRange([{ propertyName: 'id', min: 10, max: null }]);
      } catch (e) {
        error = e;
      }

      expect(error?.properties.id).toHaveLength(1);
    });

    it('AND provided fields are in range, MUST exit without error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        testedValidator.checkRequiredFields(['id']);
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });

    it('AND provided fields value in empty, MUST throw "ValidationError" for each field', () => {
      let error: Nullable<ValidationError> = null;
      const testedValidator = new DtoValidator({
        id: '',
      });

      try {
        testedValidator.checkFieldRange([{ propertyName: 'id', min: 10, max: null }]);
      } catch (e) {
        error = e;
      }

      expect(error?.properties.id).toHaveLength(1);
    });
  });
});
