import { AbstractModel, IAbstractModel, IValidatorConfiguration } from '../../../base/abstractModel';

export type PlotStatus = 'draft' | 'released' | 'finished';

export interface IPlotModel extends IAbstractModel {
  status: PlotStatus;
}

export class PlotModel extends AbstractModel {
  private _status: PlotStatus = 'draft';

  constructor(data: IPlotModel) {
    super(data);
    this.setStatus(data.status);
  }

  get status(): PlotStatus {
    return this._status;
  }

  setStatus(newValue: PlotStatus): void {
    this._status = newValue;
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [{ name: 'name' }];
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      status: this._status,
    };
  }
}
