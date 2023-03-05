import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';

import { Navigation, SelectedItemsType } from '../../Screens/interface';

interface UseSelectItemsProps {
  selectedItems: string[];
  toggleItem: (id: string) => void;
  sendBack: () => void;
}

export function useSelectItems(type: SelectedItemsType): UseSelectItemsProps {
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const { navigate } = useNavigation<Navigation>();

  function toggleItem(id: string): void {
    if (selectedItems?.includes(id)) {
      setSelectedItems(selectedItems.filter(itemId => itemId !== id));

      return;
    }

    setSelectedItems([...selectedItems, id]);
  }

  function sendBack(): void {
    navigate(-1, {
      state: {
        selectedItems,
        selectedItemsType: type,
      },
    });
  }

  return {
    selectedItems,
    toggleItem,
    sendBack,
  };
}
