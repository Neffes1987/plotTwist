import { ParamListBase, RouteProp } from '@react-navigation/native';

export interface RouteParams extends RouteProp<ParamListBase> {
  params: {
    state: {
      caption?: string;
      id?: string;
      error?: {
        key: string;
        options?: Record<string, unknown>;
      };
    };
  };
}
