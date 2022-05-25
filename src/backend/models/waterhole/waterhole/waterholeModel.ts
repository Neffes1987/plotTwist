import { IWaterholeModel } from '@backend';

import { AbstractModel } from '../../../base/abstractModel';
import { IValidatorConfiguration } from '../../../base/interface';

export class WaterholeModel extends AbstractModel {
  private readonly _worldId;

  constructor(data: IWaterholeModel) {
    super(data);

    this._worldId = data.worldId;
  }

  get worldId(): string {
    return this._worldId;
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      { name: 'worldId' },
      {
        name: 'name',
        max: this.MIDDLE_VALUE_MAX_LENGTH,
      },
      {
        name: 'description',
        max: this.BIG_VALUE_MAX_LENGTH,
      },
    ];
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      worldId: this._worldId,
    };
  }
}
