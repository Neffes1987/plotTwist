import { AbstractWorld } from '../../AbstractWorld/AbstractWorld';
import { WorldType } from '../../AbstractWorld/interface';
import { HiddenCaveWorld } from '../../HiddenCaveWorld/HiddenCaveWorld';
import { HolidayWorld } from '../../HolydayWorld/HolydayWorld';
import { PlainWorld } from '../../PlainWorld/PlainWorld';
import { PrivateWorld } from '../../PrivateWorld/PrivateWorld';
import { ReturnWithPotionWorld } from '../../ReturnWithPotionWorld/ReturnWithPotionWorld';
import { WorldFactory } from '../WorldFactory';

describe('WorldFactory', () => {
  it.each([
    ['plainWorld', PlainWorld],
    ['privateWorld', PrivateWorld],
    ['hiddenCave', HiddenCaveWorld],
    ['holiday', HolidayWorld],
    ['returnWithPotion', ReturnWithPotionWorld],
  ])('WHEN "create" is called with %p, MUST create world instance', (type, result) => {
    // @ts-ignore
    expect(WorldFactory.create(type as WorldType) instanceof (result as AbstractWorld)).toBeTruthy();
  });
});
