import { UxException } from './uxException';

export class ErrorLog {
  static validationError = 'validation_error';
  static emptyFields = 'empty_fields';
  static wrongFieldsValue = 'empty_fields';
  static unexpectedError = 'unexpected_error';

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
