import { useEffect, useState } from 'react';
import { TextDTO } from 'backend';

import { useErrorContext } from './ErrorBoundaryContext/useErrorContext';

interface UseFormResult<T> {
  form: T;
  formErrors: T & { common?: string };
  setFormFieldData: (fieldName: string, fieldValue: string) => void;
  setFormErrors: (errors: T) => void;
  resetForm: (values?: T) => void;
}

export function useForm<T extends Partial<TextDTO>>(defaultValues: T, errorsList: T): UseFormResult<T> {
  const { errors } = useErrorContext();
  const [form, setForm] = useState<T>(defaultValues);
  const [formErrors, setFormErrors] = useState<T & { common?: string }>(errorsList);

  useEffect(() => {
    if (errors) {
      setFormErrors(errors as T);
    }
  }, [errors]);

  function setFormFieldData(fieldName: string, fieldValue: string): void {
    setForm((prevValue: T) => ({ ...prevValue, [fieldName]: fieldValue }));
  }

  function resetForm(values?: T): void {
    setForm(values ?? defaultValues);
    setFormErrors(errorsList);
  }

  return {
    form,
    formErrors,
    setFormFieldData,
    setFormErrors,
    resetForm,
  };
}
