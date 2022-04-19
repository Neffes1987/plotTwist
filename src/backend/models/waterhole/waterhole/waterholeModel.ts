import { AbstractModel, IAbstractModel, IValidatorConfiguration } from '../../../base/abstractModel';

export interface IWaterholeModel extends IAbstractModel {
  worldId: string;
}

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
