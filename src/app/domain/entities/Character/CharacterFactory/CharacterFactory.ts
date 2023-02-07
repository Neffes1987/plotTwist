import { CharacterEnum } from '../../../../../constants/character.enum';
import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';
import { Ally } from '../Ally/Ally';
import { Enemy } from '../Enemy/Enemy';
import { Guard } from '../Guard/Guard';
import { Mentor } from '../Mentor/Mentor';
import { Messenger } from '../Messenger/Messenger';
import { Shadow } from '../Shadow/Shadow';

export function characterFactory(type?: CharacterEnum): AbstractCharacter {
  switch (type) {
    case CharacterEnum.Ally:
      return new Ally();
    case CharacterEnum.Enemy:
      return new Enemy();
    case CharacterEnum.Guard:
      return new Guard();
    case CharacterEnum.Mentor:
      return new Mentor();
    case CharacterEnum.Messenger:
      return new Messenger();
    case CharacterEnum.Shadow:
      return new Shadow();
    default:
      return new Ally();
  }
}
