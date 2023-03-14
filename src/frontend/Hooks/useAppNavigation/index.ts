import { useNavigation } from '@react-navigation/native';

import { Navigation, RouteParams } from '../../Screens/interface';
import navigationStore from '../../Stores/Navigation.store';

export type UseAppNavigationProps = Navigation & {
  state: Nullable<RouteParams['params']['state']>;
  goBackSameState: () => void;
};

export const useAppNavigation = (): UseAppNavigationProps => {
  const { navigate, goBack } = useNavigation<Navigation>();

  return {
    navigate: (route, options): void => {
      const state = options?.state ?? {};

      navigationStore.set({
        ...state,
        isBack: false,
      });
      navigate(route);
    },
    goBack: (options): void => {
      const state = options?.state ?? {};

      navigationStore.set({
        ...state,
        isBack: true,
      });

      goBack();
    },
    goBackSameState: goBack,
    state: navigationStore.get(),
  };
};
