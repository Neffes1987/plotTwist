import { createEntity } from '../createEntity';
import { EntityType } from '../interface';
import { Law } from '../Law/Law';
import { Plot } from '../Plot/Plot';
import { HiddenCaveWorld } from '../World/HiddenCaveWorld/HiddenCaveWorld';
import { HolidayWorld } from '../World/HolydayWorld/HolydayWorld';
import { PlainWorld } from '../World/PlainWorld/PlainWorld';
import { PrivateWorld } from '../World/PrivateWorld/PrivateWorld';
import { ReturnWithPotionWorld } from '../World/ReturnWithPotionWorld/ReturnWithPotionWorld';
import { WorldLawRelation } from '../WorldLawRelation/WorldLawRelation';

describe('WHEN "CreateEntity" was called', () => {
  it.each([
    ['plot', Plot],
    ['laws', Law],
    ['worldLawRelation', WorldLawRelation],
    ['plainWorld', PlainWorld],
    ['privateWorld', PrivateWorld],
    ['hiddenCave', HiddenCaveWorld],
    ['holiday', HolidayWorld],
    ['returnWithPotion', ReturnWithPotionWorld],
  ])('AND %p was provided, MUST return instance %p', (type, result) => {
    expect(createEntity(type as EntityType) instanceof result).toBeTruthy();
  });
});
