import { CharacterEnum } from '../../../../../constants/character.enum';
import { EnemyDTO } from '../../../../../types/entities/character';
import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

export class Enemy extends AbstractCharacter implements Omit<EnemyDTO, 'type'> {
  motivation: string;
  possibleToMoveAlly: string;

  constructor() {
    super(CharacterEnum.Messenger);
  }

  serialize(): EnemyDTO {
    return {
      ...super.serialize(),
      motivation: this.motivation,
      possibleToMoveAlly: this.possibleToMoveAlly,
      type: CharacterEnum.Enemy,
    };
  }

  unSerialize(object: EnemyDTO): void {
    super.unSerialize(object);

    this.motivation = object.motivation;
    this.possibleToMoveAlly = object.possibleToMoveAlly;
  }
}
