import { createContext } from 'react';

export interface ErrorBoundaryContextProps {
  errors?: Record<string, string>;
  updateContextErrors?: (error: unknown) => void;
}

export const ErrorBoundaryProvider = createContext<ErrorBoundaryContextProps>({ errors: {} });
