import { CharacterType, WorldType } from '@backend';

export type WorldInfoBlock = 'aboutWorld' | 'brokenLaws' | 'activeCalls' | 'waterholes';
export type EdgeInfoBlock = 'aboutEdge' | 'rewards' | 'activeChallenges' | 'failedChallenges' | 'passedChallenges';
export type PropertyTypeUnion = EdgeInfoBlock | WorldInfoBlock | CharacterType;

export interface WorldWidgetProps {
  worldType: WorldType;
  onEditWorld: (type: WorldType) => void;
  onOpenWorldProperty: (propertyType: PropertyTypeUnion) => void;
  characters: {
    characterType: CharacterType;
    quantity: number;
  }[];
  laws: {
    total: number;
    broken: number;
  };
  calls: {
    total: number;
    active: number;
  };
  waterholes: number;
  edge: {
    rewards: {
      total: number;
      collected: number;
    };
    challenges: {
      total: number;
      active: number;
      failed: number;
      passed: number;
    };
  };
}

export interface PropertyRowProps {
  onPress: (propertyId: PropertyTypeUnion) => void;
  caption: string;
  quantity?: string;
  id: PropertyTypeUnion;
}
