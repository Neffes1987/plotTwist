import { ValidationError } from '../../../../errors/ValidationError';
import { EntityValidator } from '../EntityValidator';

describe('EntityValidator', () => {
  const testedValidator = new EntityValidator({
    name: 'name',
    description: 'description',
  });

  describe('WHEN "checkRequiredFields" is called', () => {
    it('AND required fields are not provided, MUST throw "ValidationError" for each field', () => {
      let error: Nullable<ValidationError> = null;

      try {
        // @ts-ignore
        testedValidator.checkRequiredFields(['id', 'status']);
      } catch (e) {
        error = e;
      }

      expect(error?.properties.id).toHaveLength(1);
      expect(error?.properties.status).toHaveLength(1);
    });

    it('AND required fields are provided, MUST exit without error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        testedValidator.checkRequiredFields(['name', 'description']);
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
        testedValidator.checkFieldRange([
          { propertyName: 'name', min: 10, max: null },
          { propertyName: 'description', min: null, max: 5 },
        ]);
      } catch (e) {
        error = e;
      }

      expect(error?.properties.name).toHaveLength(1);
      expect(error?.properties.description).toHaveLength(1);
    });

    it('AND provided fields are in rang, MUST exit without error', () => {
      let error: Nullable<ValidationError> = null;

      try {
        testedValidator.checkRequiredFields(['name', 'description']);
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });
  });
});
