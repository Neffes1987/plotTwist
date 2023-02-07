import { generateString } from '@mocks/functions';

import { AllyTypeEnum, CharacterEnum, GenderEnum } from '../../../../../../constants/character.enum';
import { SHORT_VALUE_MAX_LENGTH } from '../../../../../../frontend/constants';
import { AllyDTO } from '../../../../../../types/entities/character';
import { Ally } from '../Ally';

describe('WHEN "Ally" instance was created', () => {
  const testCharacter = new Ally();

  const characterDto: AllyDTO = {
    allyForHero: 'allyForHero',
    allyType: AllyTypeEnum.Animal,
    callForAlly: 'callForAlly',
    isAllyForParty: false,
    age: 10,
    gender: GenderEnum.Male,
    goal: 'goal',
    group: 'group',
    id: 'id',
    name: generateString(SHORT_VALUE_MAX_LENGTH),
    profession: 'profession',
    race: 'race',
    type: CharacterEnum.Ally,
  };

  testCharacter.unSerialize(characterDto);

  it('AND "serialize" was called, MUST return DTO of fields', () => {
    expect(testCharacter.serialize()).toEqual(characterDto);
  });

  describe('AND "validate" was called', () => {
    it.each([['allyType', { ...characterDto, age: undefined }]])('AND required field %p was not provided, MUST return error', (_, dto) => {
      // @ts-ignore
      testCharacter.unSerialize(dto);
      let error: Nullable<Error> = null;

      try {
        testCharacter.validate();
      } catch (e) {
        error = e;
      }

      expect(error?.message).toEqual('VALIDATION_ERROR');
    });

    it('AND all properties valid, MUST exit', () => {
      let error: Nullable<Error> = null;

      testCharacter.unSerialize(characterDto);

      try {
        testCharacter.validate();
      } catch (e) {
        error = e;
      }

      expect(error).toBeNull();
    });
  });
});
