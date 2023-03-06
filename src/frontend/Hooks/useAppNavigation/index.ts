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
      navigate(route);
      const state = options?.state ?? {};

      navigationStore.set({
        ...state,
        isBack: false,
      });
    },
    goBack: (options): void => {
      goBack();
      const state = options?.state ?? {};

      navigationStore.set({
        ...state,
        isBack: true,
      });
    },
    goBackSameState: goBack,
    state: navigationStore.get(),
  };
};
