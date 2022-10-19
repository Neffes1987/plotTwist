import { WorldEnum } from '../../../../../constants/world.enum';
import { WorldDTO } from '../../../../../types/entities/world';
import { AbstractWorld } from '../AbstractWorld/AbstractWorld';
import { HiddenCaveWorld } from '../HiddenCaveWorld/HiddenCaveWorld';
import { HolidayWorld } from '../HolydayWorld/HolydayWorld';
import { PlainWorld } from '../PlainWorld/PlainWorld';
import { PrivateWorld } from '../PrivateWorld/PrivateWorld';
import { ReturnWithPotionWorld } from '../ReturnWithPotionWorld/ReturnWithPotionWorld';

export function createWorld(type: WorldEnum): AbstractWorld<WorldDTO> {
  switch (type) {
    case WorldEnum.PlainWorld:
      return (new PlainWorld() as unknown) as AbstractWorld<WorldDTO>;
    case WorldEnum.PrivateWorld:
      return (new PrivateWorld() as unknown) as AbstractWorld<WorldDTO>;
    case WorldEnum.HiddenCaveWorld:
      return (new HiddenCaveWorld() as unknown) as AbstractWorld<WorldDTO>;
    case WorldEnum.HolidayWorld:
      return (new HolidayWorld() as unknown) as AbstractWorld<WorldDTO>;
    case WorldEnum.ReturnWithPotionWorld:
      return (new ReturnWithPotionWorld() as unknown) as AbstractWorld<WorldDTO>;
  }
}
