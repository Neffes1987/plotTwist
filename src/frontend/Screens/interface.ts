import { ParamListBase, RouteProp } from '@react-navigation/native';

import { CharacterEnum } from '../../constants/character.enum';
import { WorldEnum } from '../../constants/world.enum';

export type SelectedItemsType = 'character' | 'task' | 'call' | 'reward';
export interface RouteParams extends RouteProp<ParamListBase> {
  params: {
    state: {
      caption?: string;
      id?: Nullable<string>;
      worldType?: WorldEnum;
      worldId?: string;
      plotId?: string;
      characterType?: CharacterEnum;
      edgeType?: string;
      selectable?: boolean;
      selectedItems?: string[];
      selectedItemsType?: SelectedItemsType;
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
  goBack: () => void;
}
