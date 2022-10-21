import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

import { RouteParams } from '../Screens/interface';
import { worldsStore } from '../Stores/Worlds.store';

export function useSelectedIdWorldId(): string {
  const { params } = useRoute<RouteParams>();
  const selectedId = params?.state?.id;

  useEffect(() => {
    if (selectedId) {
      worldsStore.setWorldId(selectedId);
    }
  }, [selectedId]);

  return selectedId ?? '';
}
