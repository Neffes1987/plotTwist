import { CharacterEnum } from '../../../../../constants/character.enum';
import { GuardianDTO } from '../../../../../types/entities/character';
import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

export class Guard extends AbstractCharacter implements Omit<GuardianDTO, 'type'> {
  becameAlly: string;
  becameEnemy: string;

  constructor() {
    super(CharacterEnum.Guard);
  }

  serialize(): GuardianDTO {
    return {
      ...super.serialize(),
      becameAlly: this.becameAlly,
      becameEnemy: this.becameEnemy,
      type: CharacterEnum.Guard,
    };
  }

  unSerialize(object: GuardianDTO): void {
    super.unSerialize(object);

    this.becameAlly = object.becameAlly;
    this.becameEnemy = object.becameEnemy;
  }
}
