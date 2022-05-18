import { IValidatorConfiguration } from '../../../base/abstractModel';

import { ICommonWorld, WorldModel } from './worldModel';

export interface IPrivateWorld extends ICommonWorld {
  contrast: string;
}

export class PrivateWorldModel extends WorldModel {
  private _contrast = '';

  constructor(data: IPrivateWorld) {
    super('privateWorld', data);
    this._contrast = data.contrast;
  }

  get contrast(): string {
    return this._contrast;
  }

  setContrast(newValue: string): void {
    this._contrast = newValue;
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      contrast: this._contrast,
    };
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      ...super.getValidationConfig(),
      {
        name: 'contrast',
        max: this.MIDDLE_VALUE_MAX_LENGTH,
      },
    ];
  }
}
