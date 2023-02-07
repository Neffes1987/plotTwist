import { CharacterEnum } from '../../../../../constants/character.enum';
import { ShadowDTO } from '../../../../../types/entities/character';
import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

export class Shadow extends AbstractCharacter implements Omit<ShadowDTO, 'type'> {
  motivation: string;
  visionOnSituation: string;

  constructor() {
    super(CharacterEnum.Messenger);
  }

  serialize(): ShadowDTO {
    return {
      ...super.serialize(),
      motivation: this.motivation,
      visionOnSituation: this.visionOnSituation,
      type: CharacterEnum.Shadow,
    };
  }

  unSerialize(object: ShadowDTO): void {
    super.unSerialize(object);

    this.motivation = object.motivation;
    this.visionOnSituation = object.visionOnSituation;
  }
}
