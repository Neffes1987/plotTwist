import { AbstractWorld } from '../AbstractWorld/AbstractWorld';
import { WorldType } from '../AbstractWorld/interface';
import { HiddenCaveWorld } from '../HiddenCaveWorld/HiddenCaveWorld';
import { HolidayWorld } from '../HolydayWorld/HolydayWorld';
import { PlainWorld } from '../PlainWorld/PlainWorld';
import { PrivateWorld } from '../PrivateWorld/PrivateWorld';
import { ReturnWithPotionWorld } from '../ReturnWithPotionWorld/ReturnWithPotionWorld';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class WorldFactory {
  static create(type: WorldType): AbstractWorld {
    let world: AbstractWorld;

    switch (type) {
      case 'plainWorld':
        world = new PlainWorld();

        break;
      case 'privateWorld':
        world = new PrivateWorld();

        break;
      case 'hiddenCave':
        world = new HiddenCaveWorld();

        break;
      case 'holiday':
        world = new HolidayWorld();

        break;
      case 'returnWithPotion':
        world = new ReturnWithPotionWorld();

        break;
    }

    return world;
  }
}
