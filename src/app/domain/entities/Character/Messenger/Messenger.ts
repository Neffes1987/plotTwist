import { CharacterEnum } from '../../../../../constants/character.enum';
import { MessengerDTO } from '../../../../../types/entities/character';
import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

export class Messenger extends AbstractCharacter implements Omit<MessengerDTO, 'type'> {
  motivation: string;
  visionOnSituation: string;

  constructor() {
    super(CharacterEnum.Messenger);
  }

  serialize(): MessengerDTO {
    return {
      ...super.serialize(),
      motivation: this.motivation,
      visionOnSituation: this.visionOnSituation,
      type: CharacterEnum.Messenger,
    };
  }

  unSerialize(object: MessengerDTO): void {
    super.unSerialize(object);

    this.motivation = object.motivation;
    this.visionOnSituation = object.visionOnSituation;
  }
}
