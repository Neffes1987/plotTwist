interface CommonValidationField {
  property: string;
  payload?: Record<string, string | number>;
}

interface ValidationRequiredErrorProps extends CommonValidationField {
  code: 'REQUIRED';
}

interface ValidationRangeErrorProps extends CommonValidationField {
  code: 'RANGE';
  payload: {
    min: number;
    max: number;
  };
}

export type ValidationErrorProps = ValidationRequiredErrorProps | ValidationRangeErrorProps;

export class ValidationError extends Error {
  properties: Record<string, Omit<ValidationErrorProps, 'property'>[]> = {};

  constructor(error?: ValidationErrorProps) {
    super('VALIDATION_ERROR');

    if (error) {
      this.setError(error);
    }
  }

  get length(): number {
    return Object.keys(this.properties).length;
  }

  merge(error: ValidationError): void {
    this.properties = {
      ...this.properties,
      ...error.properties,
    };
  }

  setError(error: ValidationErrorProps): void {
    const { code, property } = error;

    if (!this.properties[property]) {
      this.properties[property] = [];
    }

    let payload: Record<string, string | number> = {};

    if (code === 'RANGE') {
      payload = error.payload;
    }

    this.properties[property].push({
      code,
      payload,
    });
  }
}
