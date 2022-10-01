import { TextDTO } from 'backend';

import { MIDDLE_VALUE_MAX_LENGTH, NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../constants';
import { AbstractEntity } from '../AbstractEntity/AbstractEntity';

import { EntityValidator } from './EntityValidator';

export abstract class AbstractTextEntity extends AbstractEntity {
  private _name = '';
  private _description = '';

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  setName(newValue = ''): void {
    this._name = newValue;
  }

  setDescription(newValue = ''): void {
    this._description = newValue;
  }

  serialize(): TextDTO {
    return {
      description: this.description,
      id: this.id,
      name: this.name,
    };
  }

  unSerializeToEntity(rawData: TextDTO): void {
    super.setId(rawData.id ?? '');
    this.setName(rawData.name ?? '');
    this.setDescription(rawData.description ?? '');
  }

  validate(): void {
    const validator = new EntityValidator(this.serialize());

    validator.checkFieldRange([
      { propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: SHORT_VALUE_MAX_LENGTH },
      { propertyName: 'description', min: null, max: MIDDLE_VALUE_MAX_LENGTH },
    ]);
  }
}
