import { IAbstractModel } from '@backend';

import { ConfigModel, EmptyConfigModel, EmptyFieldConfigModel } from './mocks';

describe('WHEN "AbstractModel" is generated', () => {
  const data: IAbstractModel = {
    description: '',
    id: '',
    name: '',
  };

  describe('AND "validate" method is called', () => {
    it('AND "configuration" is empty, MUST returns "true"', () => {
      let error: Nullable<Error> = null;

      try {
        // eslint-disable-next-line no-new
        new EmptyConfigModel(data);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new Error(JSON.stringify({ message: 'Empty configuration for validator' })));
    });

    it('AND "data" is empty, MUST throw ui error', () => {
      let error: Nullable<Error> = null;

      try {
        // @ts-ignore
        // eslint-disable-next-line no-new
        new ConfigModel(null);
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new Error(JSON.stringify({ message: 'Empty props for model' })));
    });

    it('AND "data" not contains field from configuration, MUST collect ui error', () => {
      let error: Nullable<Error> = null;

      try {
        // @ts-ignore
        // eslint-disable-next-line no-new
        new ConfigModel({});
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new Error(JSON.stringify({ message: 'Empty props for model' })));
    });

    describe('AND "configuration" item contains "min" value', () => {
      it('AND "data" value is less then "min" value from config, MUST collect ui error', () => {
        let error: Nullable<Error> = null;

        try {
          // eslint-disable-next-line no-new
          new ConfigModel({
            description: 'more then 10',
            id: '10',
            name: '',
            number: 0,
          });
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new Error(JSON.stringify({ message: 'validation_error', number: 'Value for number is less then 1', emptyProperties: '' })));
      });

      it('AND "data" value is more then "mim" value from config, MUST NOT collect ui error', () => {
        expect(
          new ConfigModel({
            description: 'more then 10',
            id: '10',
            name: '',
            number: 1,
          }),
        ).toBeTruthy();
      });
    });

    describe('AND "configuration" item contains "max" value', () => {
      it('AND "data" value is more then "max" value from config, MUST collect ui error', () => {
        let error: Nullable<Error> = null;

        try {
          // eslint-disable-next-line no-new
          new ConfigModel({
            description: 'more then 10',
            id: '10',
            name: '',
            number: 20,
          });
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(new Error(JSON.stringify({ message: 'validation_error', number: 'Value for number is more then 10', emptyProperties: '' })));
      });

      it('AND "data" value is less then "max" value from config, MUST NOT collect ui error', () => {
        expect(
          new ConfigModel({
            description: 'more then 10',
            id: '10',
            name: '',
            number: 10,
          }),
        ).toBeTruthy();
      });
    });

    it('AND "configuration" item not contains "name" value, MUST collect ui error', () => {
      let error: Nullable<Error> = null;

      try {
        // eslint-disable-next-line no-new
        new EmptyFieldConfigModel({
          description: 'more then 10',
          id: '10',
          name: '',
        });
      } catch (e) {
        error = e;
      }

      expect(error).toEqual(new Error(JSON.stringify({ message: 'Name of field is missed for configuration' })));
    });

    describe('AND "configuration" item contains "isNumber" flag', () => {
      it('AND "data" value can not be converted to number, MUST collect ui error', () => {
        let error: Nullable<Error> = null;

        try {
          // eslint-disable-next-line no-new
          new ConfigModel({
            description: 'more then 10',
            id: '10',
            name: '',
            // @ts-ignore
            number: 'test_20',
          });
        } catch (e) {
          error = e;
        }

        expect(error).toEqual(
          new Error(JSON.stringify({ message: 'validation_error', number: 'Provided value test_20 is not a number', emptyProperties: '' })),
        );
      });
    });
  });

  it('AND "serialize" is called, MUST returns props object', () => {
    const model = new ConfigModel({
      description: 'more then 10',
      id: '10',
      name: '',
      number: 9,
    });

    expect(model.serialize()).toEqual({
      description: 'more then 10',
      id: '10',
      name: '',
    });
  });
});
