import { useEffect, useState } from 'react';

import { useErrorContext } from './ErrorBoundaryContext/useErrorContext';

interface UseFormResult<T> {
  form: T;
  formErrors: T & { common?: string };
  formErrorsQuantity: number;
  setFormFieldData: (fieldName: string, fieldValue: string) => void;
  setFormErrors: (errors: T) => void;
  resetForm: (values?: T) => void;
}

export function useForm<T extends Partial<CommonEntityDTO>>(defaultValues: T, errorsList: T): UseFormResult<T> {
  const { errors } = useErrorContext();
  const [form, setForm] = useState<T>(defaultValues);
  const [formErrors, setFormErrors] = useState<T & { common?: string }>(errorsList);
  const [formErrorsQuantity, setFormErrorsQuantity] = useState(0);

  useEffect(() => {
    if (errors) {
      const result = {};
      const errorNames = Object.keys(errors);

      errorNames.forEach(error => {
        if (errors[error]) {
          result[error] = errors[error];
        }
      });

      setFormErrorsQuantity(errorNames.length);
      setFormErrors(result as T);
    }

    setFormErrorsQuantity(0);
  }, [errors]);

  function setFormFieldData(fieldName: string, fieldValue: string): void {
    setForm((prevValue: T) => ({ ...prevValue, [fieldName]: fieldValue }));
    setFormErrors((prevValue: T) => ({ ...prevValue, [fieldName]: undefined }));
  }

  function resetForm(values?: T): void {
    setForm(values ?? defaultValues);
    setFormErrors(errorsList);
  }

  return {
    formErrorsQuantity,
    form,
    formErrors,
    setFormFieldData,
    setFormErrors,
    resetForm,
  };
}
