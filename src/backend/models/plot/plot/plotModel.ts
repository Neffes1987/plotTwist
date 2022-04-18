import {AbstractModel, IAbstractModel} from '../../../base/abstractModel';
import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

export interface IPlotModel extends IAbstractModel {
  worldsListIds: string[];
  isActive: boolean;
}

export class PlotModel extends AbstractModel {
  private isActive = false;
  private worldsListIds: string[] = [];

  constructor(data: IPlotModel) {
    super(data);
    this.setIsActive(data.isActive);
    this.setWorldList(data.worldsListIds);
  }

  get status(): boolean {
    return this.isActive;
  }

  setWorldList(newValue: string[]): void {
    this.worldsListIds = newValue;
  }

  setIsActive(newValue: boolean): void {
    this.isActive = newValue;
  }

  validateMap(data: IPlotModel): void {
    if (data.name == null) {
      throw new UxException(ErrorLog.validationError, {
        properties: ['name'].toString(),
      });
    }
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      worldsListIds: this.worldsListIds,
      isActive: this.isActive,
    };
  }
}
