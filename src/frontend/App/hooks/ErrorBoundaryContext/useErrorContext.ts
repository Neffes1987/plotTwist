import { useContext } from 'react';

import { ErrorBoundaryContextProps, ErrorBoundaryProvider } from './ErrorBoundaryContext';

export function useErrorContext(): ErrorBoundaryContextProps {
  const { errors, updateContextErrors } = useContext(ErrorBoundaryProvider);

  return { errors, updateContextErrors };
}
