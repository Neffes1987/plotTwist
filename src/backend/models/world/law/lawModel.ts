import { ILawModel } from '@backend';

import { AbstractModel } from '../../../base/abstractModel';
import { IValidatorConfiguration } from '../../../base/interface';

export class LawModel extends AbstractModel {
  _worldId = '';

  constructor(data: ILawModel) {
    super(data);

    this.setWorldId(data.worldId);
  }

  get worldId(): string {
    return this._worldId;
  }

  setWorldId(newValue: string): void {
    this._worldId = newValue;
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      worldId: this._worldId,
    };
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [{ name: 'worldId' }, { name: 'name' }, { name: 'description' }];
  }
}
