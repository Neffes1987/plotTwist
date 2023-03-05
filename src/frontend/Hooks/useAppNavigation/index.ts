import { useNavigation, useRoute } from '@react-navigation/native';

import { Navigation, RouteParams } from '../../Screens/interface';

export type UseAppNavigationProps = Navigation & RouteParams['params'];

export const useAppNavigation = (): UseAppNavigationProps => {
  const { navigate, goBack } = useNavigation<Navigation>();
  const { params } = useRoute<RouteParams>();

  return {
    navigate,
    goBack,
    state: params?.state,
  };
};
