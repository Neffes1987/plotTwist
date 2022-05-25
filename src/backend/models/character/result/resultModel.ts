import { AbstractModel } from '../../../base/abstractModel';
import { IAbstractModel, IValidatorConfiguration } from '../../../base/interface';

export class ResultModel extends AbstractModel {
  constructor(data: IAbstractModel) {
    super(data);
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [{ name: 'description', max: this.MIDDLE_VALUE_MAX_LENGTH }];
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {};
  }
}
