import { AllyTypeEnum, CharacterEnum, GenderEnum, KnowledgeTypeEnum, MentorTypeEnum } from '../../../../constants/character.enum';
import { NAME_VALUE_MIN_LENGTH } from '../../../../frontend/Screens/Tasks/constants';
import { CharacterDTO } from '../../../../types/entities/character';
import { ValidationError } from '../../../errors/ValidationError';
import { AsyncStoreDataGateway } from '../../../infrastructure/gateways/AsyncStoreDataGateway/AsyncStoreDataGateway';
import { DtoValidator } from '../../../infrastructure/validators/DtoValidator/DtoValidator';
import { ActiveRecord } from '../ActiveRecord/ActiveRecord';

export class Character extends ActiveRecord<CharacterDTO> implements CharacterDTO, Serialization<CharacterDTO> {
  age: number;
  gender: GenderEnum;
  goal: string;
  group: string;
  name: string;
  profession: string;
  race: string;
  type: CharacterEnum;
  becameAlly: string;
  becameEnemy: string;
  isAllyForParty: boolean;
  allyType?: AllyTypeEnum;
  allyForHero: string;
  callForAlly: string;
  motivation: string;
  visionOnSituation: string;
  possibleToMoveAlly: string;
  mentorType?: MentorTypeEnum;
  knowledgeType?: KnowledgeTypeEnum;

  constructor() {
    super(new AsyncStoreDataGateway('character'));
  }

  serialize(): CharacterDTO {
    return {
      allyForHero: this.allyForHero,
      allyType: this.allyType,
      becameAlly: this.becameAlly,
      becameEnemy: this.becameEnemy,
      callForAlly: this.callForAlly,
      isAllyForParty: this.isAllyForParty,
      knowledgeType: this.knowledgeType,
      mentorType: this.mentorType,
      motivation: this.motivation,
      possibleToMoveAlly: this.possibleToMoveAlly,
      visionOnSituation: this.visionOnSituation,
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
    const {
      age,
      gender,
      goal,
      group,
      name,
      profession,
      race,
      type,
      id,
      mentorType,
      allyType,
      becameAlly,
      becameEnemy,
      callForAlly,
      isAllyForParty,
      knowledgeType,
      possibleToMoveAlly,
      allyForHero,
      visionOnSituation,
      motivation,
    } = object;

    this.age = age;
    this.gender = gender;
    this.goal = goal;
    this.group = group;
    this.name = name;
    this.profession = profession;
    this.race = race;
    this.type = type;
    this.id = id;
    this.mentorType = mentorType;
    this.allyType = allyType;
    this.becameAlly = becameAlly;
    this.becameEnemy = becameEnemy;
    this.callForAlly = callForAlly;
    this.isAllyForParty = isAllyForParty;
    this.knowledgeType = knowledgeType;
    this.possibleToMoveAlly = possibleToMoveAlly;
    this.allyForHero = allyForHero;
    this.visionOnSituation = visionOnSituation;
    this.motivation = motivation;
  }

  validate(): void {
    const error = new ValidationError();
    const validator = new DtoValidator(this.serialize());

    try {
      validator.checkRequiredFields(['type', 'age', 'gender', 'goal', 'race', 'profession']);
    } catch (e) {
      error.merge(e);
    }

    if (this.type === CharacterEnum.Ally) {
      try {
        validator.checkRequiredFields(['allyType']);
      } catch (e) {
        error.merge(e);
      }
    }

    if (this.type === CharacterEnum.Mentor) {
      try {
        validator.checkRequiredFields(['knowledgeType', 'mentorType']);
      } catch (e) {
        error.merge(e);
      }
    }

    try {
      validator.checkFieldRange([{ propertyName: 'name', min: NAME_VALUE_MIN_LENGTH, max: null }]);
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
