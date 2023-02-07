import { AllyTypeEnum, CharacterEnum } from '../../../../../constants/character.enum';
import { AllyDTO } from '../../../../../types/entities/character';
import { ValidationError } from '../../../../errors/ValidationError';
import { DtoValidator } from '../../../../infrastructure/validators/DtoValidator/DtoValidator';
import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

export class Ally extends AbstractCharacter implements Omit<AllyDTO, 'type'> {
  allyForHero: string;
  allyType: AllyTypeEnum;
  callForAlly: string;
  isAllyForParty: boolean;

  constructor() {
    super(CharacterEnum.Ally);
  }

  serialize(): AllyDTO {
    return {
      ...super.serialize(),
      allyForHero: this.allyForHero,
      allyType: this.allyType,
      callForAlly: this.callForAlly,
      isAllyForParty: this.isAllyForParty,
      type: CharacterEnum.Ally,
    };
  }

  unSerialize(object: AllyDTO): void {
    super.unSerialize(object);

    this.allyForHero = object.allyForHero;
    this.allyType = object.allyType;
    this.callForAlly = object.callForAlly;
    this.isAllyForParty = object.isAllyForParty;
  }

  validate(): void {
    const error = new ValidationError();
    const validator = new DtoValidator(this.serialize());

    try {
      super.validate();
    } catch (e) {
      error.merge(e);
    }

    try {
      validator.checkRequiredFields(['allyType']);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
