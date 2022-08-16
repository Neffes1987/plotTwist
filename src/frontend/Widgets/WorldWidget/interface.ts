import { WorldDTO } from 'backend';

import { TypographyProps } from '../../UI/interface';

export type WorldInfoBlock = 'aboutWorld' | 'brokenLaws' | 'activeCalls' | 'waterholes';
export type EdgeInfoBlock = 'aboutEdge' | 'rewards' | 'activeChallenges' | 'failedChallenges' | 'passedChallenges';
export type PropertyTypeUnion = EdgeInfoBlock | WorldInfoBlock;
export interface WorldWidgetProps {
  worldInfo: WorldDTO;
  onEditWorld: (type: WorldDTO['type'], id: string) => void;
  onOpenWorldProperty: (propertyType: PropertyTypeUnion) => void;
}

export interface PropertyRowProps extends TypographyProps {
  onPress: (propertyId: PropertyTypeUnion) => void;
  caption: string;
  quantity?: string;
  id: PropertyTypeUnion;
  showAlert?: boolean;
}
