import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

import {ICommonWorld, WorldModel} from './worldModel';

export type FinalType = 'cycle' | 'achievePerfect' | 'openEnd';

export type PotionType = 'wisdom' | 'love' | 'responsible' | 'tragedy' | 'badExperience' | 'wastedTime';

export interface IReturnWithPotionWorldModel extends ICommonWorld {
  finalType?: FinalType;
  potionType?: PotionType;
  plotTwist: string;
}

export class ReturnWithPotionWorldModel extends WorldModel {
  static readonly PLOT_TWIST_MAX_LENGTH = 2048;

  _finalType?: FinalType;
  _potionType?: PotionType;
  _plotTwist = '';

  constructor(data: IReturnWithPotionWorldModel) {
    super('returnWithPotion', data);

    this.setFinalType(data.finalType);
    this.setPotionType(data.potionType);
    this.setPlotTwist(data.plotTwist);
  }

  setFinalType(newValue?: FinalType): void {
    this._finalType = newValue;
  }

  setPotionType(newValue?: PotionType): void {
    this._potionType = newValue;
  }

  setPlotTwist(newValue: string): void {
    this._plotTwist = newValue;
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      ...super.getAdditionalProperties(),
      finalType: this._finalType,
      potionType: this._potionType,
      plotTwist: this._plotTwist,
    };
  }

  validateMap(data: IReturnWithPotionWorldModel): void {
    super.validateMap(data);

    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.finalType == null) {
      emptyProperties.push('finalType');
    }

    if (data.potionType == null) {
      emptyProperties.push('potionType');
    }

    if (data.plotTwist == null) {
      emptyProperties.push('plotTwist');
    } else if (data.plotTwist.length < ReturnWithPotionWorldModel.PLOT_TWIST_MAX_LENGTH) {
      notSatisfiedProps.plotTwist = 'less_then_$PLOT_TWIST_MAX_LENGTH';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }
}
