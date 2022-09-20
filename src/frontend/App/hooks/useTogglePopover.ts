import { useState } from 'react';

interface UseTogglePopoverResult {
  isEditDrawerOpen: boolean;
  onOpenPopoverHandler: () => void;
  onClosePopoverHandler: () => void;
}

export function useTogglePopover(): UseTogglePopoverResult {
  const [isEditDrawerOpen, setIsEditDrawerOpen] = useState(false);

  function onOpenPopoverHandler(): void {
    setIsEditDrawerOpen(true);
  }

  function onClosePopoverHandler(): void {
    setIsEditDrawerOpen(false);
  }

  return {
    isEditDrawerOpen,
    onOpenPopoverHandler,
    onClosePopoverHandler,
  };
}
