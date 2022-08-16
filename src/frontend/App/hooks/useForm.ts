import { useState } from 'react';
import { CommonDTO } from 'backend';

interface UseFormResult<T> {
  form: T;
  formErrors: T & { common?: string };
  setFormFieldData: (fieldName: string, fieldValue: string) => void;
  setFormErrors: (errors: T) => void;
  resetForm: (values?: T) => void;
  formatBackendError: (error: Error) => void;
}

export function useForm<T extends Omit<CommonDTO, 'id'>>(defaultValues: T, errorsList: T): UseFormResult<T> {
  const [form, setForm] = useState<T>(defaultValues);
  const [formErrors, setFormErrors] = useState<T & { common?: string }>(errorsList);

  function setFormFieldData(fieldName: string, fieldValue: string): void {
    setForm((prevValue: T) => ({ ...prevValue, [fieldName]: fieldValue }));
  }

  function resetForm(values?: T): void {
    setForm(values ?? defaultValues);
    setFormErrors(errorsList);
  }

  function formatBackend(error: Error): void {
    console.log(error);
  }

  return {
    form,
    formErrors,
    setFormFieldData,
    setFormErrors,
    resetForm,
    formatBackendError: formatBackend,
  };
}
