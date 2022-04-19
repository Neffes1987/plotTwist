import { AbstractModel, IAbstractModel, IValidatorConfiguration } from '../../../base/abstractModel';

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
