import { CharacterType, ICharacterModel, WorldInfo } from '@backend';

import { WorldType } from '../../../backend/models/world/world/interface';

export type WorldInfoBlock = 'aboutWorld' | 'brokenLaws' | 'activeCalls' | 'waterholes';
export type EdgeInfoBlock = 'aboutEdge' | 'rewards' | 'activeChallenges' | 'failedChallenges' | 'passedChallenges';
export type PropertyTypeUnion = EdgeInfoBlock | WorldInfoBlock | CharacterType;

export interface WorldWidgetProps {
  worldInfo: WorldInfo;
  onEditWorld: (type: WorldType) => void;
  onOpenWorldProperty: (propertyType: PropertyTypeUnion) => void;
  characters?: ICharacterModel[];
}

export interface PropertyRowProps {
  onPress: (propertyId: PropertyTypeUnion) => void;
  caption: string;
  quantity?: string;
  id: PropertyTypeUnion;
}
