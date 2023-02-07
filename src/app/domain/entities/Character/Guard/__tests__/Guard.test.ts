import { generateString } from '@mocks/functions';

import { CharacterEnum, GenderEnum } from '../../../../../../constants/character.enum';
import { SHORT_VALUE_MAX_LENGTH } from '../../../../../../frontend/constants';
import { GuardianDTO } from '../../../../../../types/entities/character';
import { Guard } from '../Guard';

describe('WHEN "Guard" instance was created', () => {
  const testCharacter = new Guard();

  const characterDto: GuardianDTO = {
    age: 10,
    gender: GenderEnum.Male,
    goal: 'goal',
    group: 'group',
    id: 'id',
    name: generateString(SHORT_VALUE_MAX_LENGTH),
    profession: 'profession',
    race: 'race',
    type: CharacterEnum.Guard,
    becameAlly: 'becameAlly',
    becameEnemy: 'becameAlly',
  };

  testCharacter.unSerialize(characterDto);

  it('AND "serialize" was called, MUST return DTO of fields', () => {
    expect(testCharacter.serialize()).toEqual(characterDto);
  });

  describe('AND "validate" was called', () => {
    it.each([
      ['gender', { ...characterDto, gender: undefined }],
      ['profession', { ...characterDto, profession: undefined }],
      ['race', { ...characterDto, race: undefined }],
      ['goal', { ...characterDto, goal: undefined }],
      ['age', { ...characterDto, age: undefined }],
    ])('AND required field %p was not provided, MUST return error', (_, dto) => {
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

    it.each([
      ['less then 6', { ...characterDto, name: '12345' }],
      [`more then ${SHORT_VALUE_MAX_LENGTH}`, { ...characterDto, name: generateString(SHORT_VALUE_MAX_LENGTH + 1) }],
    ])('AND name length is %p, MUST return error', (_, dto) => {
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
