import { AbstractModel, IAbstractModel, IValidatorConfiguration } from '../abstractModel';

export class EmptyConfigModel extends AbstractModel {
  constructor(data: IAbstractModel) {
    super(data);
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {};
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [];
  }
}

export class EmptyFieldConfigModel extends AbstractModel {
  constructor(data: IAbstractModel) {
    super(data);
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {};
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      // @ts-ignore
      {
        max: 10,
        isNumber: true,
      },
      {
        name: 'name',
        min: 100,
      },
      {
        name: 'description',
        min: 2,
      },
    ];
  }
}

export interface IConfigModel extends IAbstractModel {
  number: number;
}

export class ConfigModel extends AbstractModel {
  constructor(data: IConfigModel) {
    super(data);
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {};
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      {
        name: 'number',
        max: 10,
        min: 1,
        isNumber: true,
      },
      { name: 'id' },
      { name: 'name' },
      { name: 'description' },
    ];
  }
}

export class ExpectConfigModel extends AbstractModel {
  constructor(data: IConfigModel) {
    super(data);
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {};
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      {
        name: 'number',
        max: 10,
        min: 1,
        isNumber: true,
      },
      {
        name: 'id',
        when: [
          {
            expectedValue: '10',
          },
          {
            expectedValue: 'id',
          },
        ],
      },
      { name: 'name' },
      { name: 'description' },
    ];
  }
}
