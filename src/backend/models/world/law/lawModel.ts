import {AbstractModel, IAbstractModel} from '../../../base/abstractModel';
import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

export interface ILawModel extends IAbstractModel {
  worldId: string;
}

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

  validateMap(data: ILawModel): void {
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.worldId == null) {
      emptyProperties.push('worldId');
    }

    if (data.name == null) {
      emptyProperties.push('name');
    }

    if (data.description == null) {
      emptyProperties.push('description');
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }
}
