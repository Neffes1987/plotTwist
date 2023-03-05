import { useNavigation } from '@react-navigation/native';

import { Navigation, RouteParams } from '../../Screens/interface';
import navigationStore from '../../Stores/Navigation.store';

export type UseAppNavigationProps = Navigation & {
  state: Nullable<RouteParams['params']['state']>;
};

export const useAppNavigation = (): UseAppNavigationProps => {
  const { navigate, goBack } = useNavigation<Navigation>();

  return {
    navigate: (route, options): void => {
      navigate(route);
      navigationStore.set(options?.state ?? null);
    },
    goBack: (options): void => {
      goBack();
      navigationStore.set(options?.state ?? null);
    },
    state: navigationStore.get(),
  };
};
