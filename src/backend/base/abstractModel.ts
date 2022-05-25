import { ErrorLog } from './errors/errorLog';
import { UxException } from './errors/uxException';
import { IAbstractModel, IValidatorConfiguration } from './interface';

export abstract class AbstractModel implements IAbstractModel {
  readonly SHORT_VALUE_MAX_LENGTH = 256;
  readonly MIDDLE_VALUE_MAX_LENGTH = 2048;
  readonly BIG_VALUE_MAX_LENGTH = 4096;

  private _id = '';
  private _name = '';
  private _description = '';

  protected constructor(props: IAbstractModel) {
    this.validateMap(props);
    this.setId(props.id);
    this.setName(props.name);
    this.setDescription(props.description);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  setId(newValue: string): void {
    this._id = newValue;
  }

  setName(newValue: string): void {
    this._name = newValue;
  }

  setDescription(newValue?: string): void {
    this._description = newValue ?? '';
  }

  serialize(): IAbstractModel {
    return {
      ...this.getAdditionalProperties(),
      id: this._id,
      name: this._name,
      description: this._description,
    };
  }

  private validateMap(data: IAbstractModel): void {
    const configurations = this.getValidationConfig();

    if (!configurations?.length) {
      throw new UxException('Empty configuration for validator');
    }

    if (!data || Object.keys(data).length === 0) {
      throw new UxException('Empty props for model');
    }

    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    for (const config of configurations) {
      if (!config.name) {
        throw new UxException('Name of field is missed for configuration');
      }

      let value = data[config.name];
      let valueSize;

      if (value === undefined) {
        emptyProperties.push(config.name);
        continue;
      }

      if (config.isNumber) {
        value = parseFloat(value);

        if (Number.isNaN(value)) {
          notSatisfiedProps[config.name] = `Provided value ${data[config.name]} is not a number`;
          continue;
        }

        valueSize = value;
      } else {
        valueSize = value?.length;
      }

      if (config.min && valueSize < config.min) {
        notSatisfiedProps[config.name] = `Value for ${config.name} is less then ${config.min}`;
        continue;
      }

      if (config.max && valueSize > config.max) {
        notSatisfiedProps[config.name] = `Value for ${config.name} is more then ${config.max}`;
      }
    }

    if (emptyProperties.length || Object.keys(notSatisfiedProps).length) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }

  abstract getValidationConfig(): IValidatorConfiguration[];

  abstract getAdditionalProperties(): Record<string, unknown>;
}
