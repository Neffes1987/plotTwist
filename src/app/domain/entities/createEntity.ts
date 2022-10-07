import { AbstractEntity } from './AbstractEntity/AbstractEntity';
import { EntityType } from './interface';
import { Law } from './Law/Law';
import { Plot } from './Plot/Plot';
import { HiddenCaveWorld } from './World/HiddenCaveWorld/HiddenCaveWorld';
import { HolidayWorld } from './World/HolydayWorld/HolydayWorld';
import { PlainWorld } from './World/PlainWorld/PlainWorld';
import { PrivateWorld } from './World/PrivateWorld/PrivateWorld';
import { ReturnWithPotionWorld } from './World/ReturnWithPotionWorld/ReturnWithPotionWorld';
import { WorldLawRelation } from './WorldLawRelation/WorldLawRelation';

export function createEntity(type: EntityType): AbstractEntity {
  switch (type) {
    case 'plot':
      return new Plot();
    case 'laws':
      return new Law();
    case 'worldLawRelation':
      return new WorldLawRelation();
    case 'plainWorld':
      return new PlainWorld();
    case 'privateWorld':
      return new PrivateWorld();
    case 'hiddenCave':
      return new HiddenCaveWorld();
    case 'holiday':
      return new HolidayWorld();
    case 'returnWithPotion':
      return new ReturnWithPotionWorld();
  }
}
