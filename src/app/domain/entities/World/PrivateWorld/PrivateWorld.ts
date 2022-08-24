import { PrivateWorldDTO } from 'backend';

import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../constants';
import { EntityValidator } from '../../AbstractEntity/EntityValidator';
import { AbstractWorld } from '../AbstractWorld/AbstractWorld';

export class PrivateWorld extends AbstractWorld {
  private _contrast = '';

  constructor() {
    super('privateWorld');
  }

  get contrast(): string {
    return this._contrast;
  }

  setContrast(newValue: string): void {
    this._contrast = newValue;
  }

  serialize(): PrivateWorldDTO {
    return {
      ...super.serialize(),
      contrast: this.contrast,
      type: 'privateWorld',
    };
  }

  unSerializeToEntity(object: PrivateWorldDTO): void {
    super.unSerializeToEntity(object);
    this.setContrast(object.contrast);
  }

  validate(): void {
    super.validate();

    const validator = new EntityValidator<Partial<PrivateWorldDTO>>(this.serialize());

    validator.checkFieldRange([{ propertyName: 'contrast', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH }]);
  }
}
