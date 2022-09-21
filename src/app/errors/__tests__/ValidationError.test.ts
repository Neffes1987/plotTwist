import { ValidationError, ValidationErrorProps } from '../ValidationError';

describe('WHEN "ValidationError" is created', () => {
  it('MUST set message as "VALIDATION_ERROR"', () => {
    const error = new ValidationError();

    expect(error.message).toEqual('VALIDATION_ERROR');
  });

  it.each([
    [
      {
        code: 'REQUIRED',
        property: 'testProperty',
      },
      { testProperty: [{ code: 'REQUIRED', payload: {} }] },
    ],
    [
      {
        code: 'RANGE',
        property: 'testProperty',
        payload: {
          min: 1,
          max: 2,
        },
      },
      {
        testProperty: [
          {
            code: 'RANGE',
            payload: {
              min: 1,
              max: 2,
            },
          },
        ],
      },
    ],
  ])('AND "config" for constructor is provided, MUST add error to payload', (config, result) => {
    const error = new ValidationError(config as ValidationErrorProps);

    expect(error.properties).toEqual(result);
  });

  it('AND "length" is called, MUST return error payload properties length', () => {
    const error = new ValidationError({
      code: 'REQUIRED',
      property: 'testProperty',
    });

    expect(error.length).toEqual(1);
  });

  it('AND "merge" is called, MUST get properties from provided "ValidationError" and add to itself', () => {
    const error = new ValidationError({
      code: 'REQUIRED',
      property: 'testProperty',
    });

    const error1 = new ValidationError({
      code: 'REQUIRED',
      property: 'testProperty1',
    });

    error.merge(error1);

    expect(error.length).toEqual(2);
  });

  it('AND "setError" is called, MUST add error payload to "properties"', () => {
    const error = new ValidationError({
      code: 'REQUIRED',
      property: 'testProperty',
    });

    error.setError({
      code: 'REQUIRED',
      property: 'testProperty1',
    });

    expect(error.length).toEqual(2);
  });
});
