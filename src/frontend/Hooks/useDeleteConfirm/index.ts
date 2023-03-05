import { useState } from 'react';

interface UseDeleteConfirm {
  deletedItemId?: string;
  setDeletedItemId: (id: string) => void;
  clearDeleteItemId: () => void;
}

export function useDeleteConfirm(): UseDeleteConfirm {
  const [deletedItemId, setDeletedItemId] = useState<string>();

  function clearDeleteItemId(): void {
    setDeletedItemId('');
  }

  return {
    setDeletedItemId,
    deletedItemId,
    clearDeleteItemId,
  };
}
