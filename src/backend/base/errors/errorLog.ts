import { UxException } from './uxException';

export class ErrorLog {
  static validationError = 'validation_error';
  static emptyFields = 'empty_fields';
  static wrongFieldsValue = 'empty_fields';
  static unexpectedError = 'unexpected_error';

  static validate(data: Record<string, unknown>, props: string[]): void {
    const emptyFieldsList: string[] = [];

    for (const propertyName of props) {
      if (data[propertyName] == null) {
        emptyFieldsList.push(propertyName);
      }
    }

    if (emptyFieldsList.length) {
      throw new UxException(ErrorLog.validationError, {
        emptyFields: emptyFieldsList.toString(),
      });
    }
  }

  add(error: Error): void {
    console.error(error);
  }

  formatUnexpectedError(message: string): UxException {
    return new UxException(ErrorLog.unexpectedError, {
      message: message ?? 'oops',
    });
  }

  formatEmptyFieldsError(props: string[]): UxException {
    return new UxException(ErrorLog.emptyFields, { message: props.toString() });
  }

  formatWrongFieldsError(props: Record<string, string>): UxException {
    return new UxException(ErrorLog.wrongFieldsValue, props);
  }
}
