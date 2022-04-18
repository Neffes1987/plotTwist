import {AbstractModel, IAbstractModel} from '../../../base/abstractModel';
import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

export class ResultModel extends AbstractModel {
  constructor(data: IAbstractModel) {
    super(data);
  }

  validateMap(data: IAbstractModel): void {
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.description == null) {
      emptyProperties.push('description');
    } else if (data.description.length > this.MIDDLE_VALUE_MAX_LENGTH) {
      notSatisfiedProps.description = 'more_then_$MIDDLE_VALUE_MAX_LENGTH';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {};
  }
}
