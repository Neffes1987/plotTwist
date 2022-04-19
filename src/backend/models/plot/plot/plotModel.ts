import { AbstractModel, IAbstractModel, IValidatorConfiguration } from '../../../base/abstractModel';

export interface IPlotModel extends IAbstractModel {
  worldsListIds: string[];
  isActive: boolean;
}

export class PlotModel extends AbstractModel {
  private isActive = false;

  constructor(data: IPlotModel) {
    super(data);
    this.setIsActive(data.isActive);
  }

  get status(): boolean {
    return this.isActive;
  }

  setIsActive(newValue: boolean): void {
    this.isActive = newValue;
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [{ name: 'name' }];
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      isActive: this.isActive,
    };
  }
}
