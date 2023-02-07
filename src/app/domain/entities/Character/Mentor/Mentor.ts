import { CharacterEnum, KnowledgeTypeEnum, MentorTypeEnum } from '../../../../../constants/character.enum';
import { MentorDTO } from '../../../../../types/entities/character';
import { ValidationError } from '../../../../errors/ValidationError';
import { DtoValidator } from '../../../../infrastructure/validators/DtoValidator/DtoValidator';
import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

export class Mentor extends AbstractCharacter implements Omit<MentorDTO, 'type'> {
  knowledgeType: KnowledgeTypeEnum;
  mentorType: MentorTypeEnum;

  constructor() {
    super(CharacterEnum.Messenger);
  }

  serialize(): MentorDTO {
    return {
      ...super.serialize(),
      knowledgeType: this.knowledgeType,
      mentorType: this.mentorType,
      type: CharacterEnum.Mentor,
    };
  }

  unSerialize(object: MentorDTO): void {
    super.unSerialize(object);

    this.mentorType = object.mentorType;
    this.knowledgeType = object.knowledgeType;
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
      validator.checkRequiredFields(['knowledgeType', 'mentorType']);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
