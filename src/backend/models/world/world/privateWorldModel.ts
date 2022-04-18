import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {ICommonWorld, WorldModel} from './worldModel';

export interface IPrivateWorld extends ICommonWorld {
  contrast: string;
}

export class PrivateWorld extends WorldModel {
  static readonly CONTRAST_MAX_LENGTH = 2048;

  private _contrast = '';

  constructor(data: IPrivateWorld) {
    super('privateWorld', data);
    this._contrast = data.contrast;
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

  validateMap(data: IPrivateWorld): void {
    super.validateMap(data);

    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.contrast == null) {
      emptyProperties.push('contrast');
    } else if (data.contrast.length > PrivateWorld.CONTRAST_MAX_LENGTH) {
      notSatisfiedProps.contrast = 'more_then_$CONTRAST_MAX_LENGTH';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }
}
