import { PrivateWorldDTO } from 'backend';

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
}
