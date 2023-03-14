import { ParamListBase, RouteProp } from '@react-navigation/native';

import { CharacterEnum } from '../../constants/character.enum';
import { WorldEnum } from '../../constants/world.enum';
import { TaskDTO } from '../../types/entities/task';

export type SelectedItemsType = 'character' | 'task' | 'call' | 'reward' | 'law' | 'waterholes' | 'edge';
export interface RouteParams extends RouteProp<ParamListBase> {
  params: {
    state: {
      caption?: string;
      id?: Nullable<string>;
      worldType?: WorldEnum;
      worldId?: string;
      plotId?: string;
      characterType?: CharacterEnum;
      edgeType?: TaskDTO['type'];
      edgeId?: string;
      selectable?: boolean;
      isBack?: boolean;
      selectedItems?: {
        ids: string[];
        type?: SelectedItemsType;
        single?: boolean;
      };

      error?:
        | Error
        | {
            key: string;
            options?: Record<string, unknown>;
          };
    };
  };
}

export interface Navigation {
  navigate: (route: string | number, options?: RouteParams['params']) => void;
  goBack: (options?: RouteParams['params']) => void;
}
