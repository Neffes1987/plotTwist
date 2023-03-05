import { useState } from 'react';

import { SelectedItemsType } from '../../Screens/interface';
import { useAppNavigation } from '../useAppNavigation';

interface UseSelectItemsProps {
  selectedItems: string[];
  toggleItem: (id: string) => void;
  sendBack: () => void;
}

export function useSelectItems(type: SelectedItemsType, selectedIds?: string[]): UseSelectItemsProps {
  const [selectedItems, setSelectedItems] = useState<string[]>(selectedIds ?? []);
  const { goBack } = useAppNavigation();

  function toggleItem(id: string): void {
    if (selectedItems?.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));

      return;
    }

    setSelectedItems([...selectedItems, id]);
  }

  function sendBack(): void {
    goBack({
      state: {
        selectedItems: {
          type,
          ids: selectedItems,
        },
      },
    });
  }

  return {
    selectedItems,
    toggleItem,
    sendBack,
  };
}
