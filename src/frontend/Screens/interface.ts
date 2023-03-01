import { ParamListBase, RouteProp } from '@react-navigation/native';

import { WorldEnum } from '../../constants/world.enum';

export interface RouteParams extends RouteProp<ParamListBase> {
  params: {
    state: {
      caption?: string;
      id?: string;
      worldType?: WorldEnum;
      plotId?: string;
      error?: {
        key: string;
        options?: Record<string, unknown>;
      };
    };
  };
}
