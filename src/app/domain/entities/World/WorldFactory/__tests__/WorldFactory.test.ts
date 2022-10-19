import { WorldEnum } from '../../../../../../constants/world.enum';
import { AbstractWorld } from '../../AbstractWorld/AbstractWorld';
import { HiddenCaveWorld } from '../../HiddenCaveWorld/HiddenCaveWorld';
import { HolidayWorld } from '../../HolydayWorld/HolydayWorld';
import { PlainWorld } from '../../PlainWorld/PlainWorld';
import { PrivateWorld } from '../../PrivateWorld/PrivateWorld';
import { ReturnWithPotionWorld } from '../../ReturnWithPotionWorld/ReturnWithPotionWorld';
import { createWorld } from '../createWorld';

describe('WorldFactory', () => {
  it.each([
    [WorldEnum.PlainWorld, PlainWorld],
    [WorldEnum.PrivateWorld, PrivateWorld],
    [WorldEnum.HiddenCaveWorld, HiddenCaveWorld],
    [WorldEnum.HolidayWorld, HolidayWorld],
    [WorldEnum.ReturnWithPotionWorld, ReturnWithPotionWorld],
  ])('WHEN "create" is called with %p, MUST create world instance', (type, result) => {
    // @ts-ignore
    expect(createWorld(type as WorldType) instanceof (result as AbstractWorld)).toBeTruthy();
  });
});
