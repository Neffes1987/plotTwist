import { CharacterEnum, GenderEnum } from '../../../../../constants/character.enum';
import { NAME_VALUE_MIN_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../frontend/constants';
import { CharacterDTO } from '../../../../../types/entities/character';
import { ValidationError } from '../../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../../ActiveRecord/ActiveRecord';

export abstract class AbstractCharacter extends ActiveRecord<CharacterDTO> implements CharacterDTO, Serialization<CharacterDTO> {
  age: number;
  gender: GenderEnum;
  goal: string;
  group: string;
  name: string;
  profession: string;
  race: string;
  type: CharacterEnum;

  protected constructor(characterType: CharacterEnum) {
    super(new AsyncStoreDataGateway('character'));
    this.type = characterType;
  }

  serialize(): CharacterDTO {
    return {
      age: this.age,
      gender: this.gender,
      goal: this.goal,
      group: this.group,
      name: this.name,
      profession: this.profession,
      race: this.race,
      type: this.type,
      id: this.id,
    };
  }

  unSerialize(object: CharacterDTO): void {
    const { age, gender, goal, group, name, profession, race, type, id } = object;

    this.age = age;
    this.gender = gender;
    this.goal = goal;
    this.group = group;
    this.name = name;
    this.profession = profession;
    this.race = race;
    this.type = type;
    this.id = id;
  }

  validate(): void {
    const error = new ValidationError();
    const validator = new DtoValidator(this.serialize());

    try {
      validator.checkRequiredFields(['type', 'age', 'gender', 'goal', 'race', 'profession']);
    } catch (e) {
      error.merge(e);
    }

    try {
      validator.checkFieldRange([{ propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: SHORT_VALUE_MAX_LENGTH }]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }

  list(params: ListParams<CharacterDTO>): Promise<CharacterDTO[]> {
    return this._gateway.list(params);
  }
}
