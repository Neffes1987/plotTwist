import { ValidationError } from '../../../errors/ValidationError';

interface Range<T extends Partial<CommonEntityDTO>> {
  propertyName: keyof T;
  min: Nullable<number>;
  max: Nullable<number>;
}

export class DtoValidator<T extends Partial<CommonEntityDTO>> {
  private readonly rawData: T;

  constructor(rawData: T) {
    this.rawData = rawData;
  }

  static checkMinValue(value: string, min: Nullable<number>): boolean {
    if (min === null) {
      return true;
    }

    if (!value) {
      return false;
    }

    return value.length >= min;
  }

  static checkMaxValue(value: string, max: Nullable<number>): boolean {
    if (max === null) {
      return true;
    }

    return value.length <= max;
  }

  checkRequiredFields(fieldNames: (keyof T)[]): void {
    const requiredFields: string[] = [];

    fieldNames.forEach(fieldName => {
      if (!this.rawData[fieldName]) {
        requiredFields.push(fieldName as string);
      }
    });

    if (requiredFields.length) {
      const validationError = new ValidationError();

      requiredFields.forEach(fieldName => {
        validationError.setError({
          property: fieldName,
          code: 'REQUIRED',
        });
      });

      throw validationError;
    }
  }

  checkFieldRange(rangeConfig: Range<T>[]): void {
    const failedRangeConfig: Range<T>[] = [];

    rangeConfig.forEach(config => {
      const { propertyName, min, max } = config;
      const value = this.rawData[propertyName] ?? '';

      if (!DtoValidator.checkMinValue(value as string, min)) {
        failedRangeConfig.push(config);

        return;
      }

      if (!DtoValidator.checkMaxValue(value as string, max)) {
        failedRangeConfig.push(config);
      }
    });

    if (failedRangeConfig.length) {
      const validationError = new ValidationError();

      failedRangeConfig.forEach(({ propertyName, min, max }) => {
        validationError.setError({
          property: propertyName as string,
          code: 'RANGE',
          payload: {
            min: min ?? 0,
            max: max ?? 0,
          },
        });
      });

      throw validationError;
    }
  }
}
