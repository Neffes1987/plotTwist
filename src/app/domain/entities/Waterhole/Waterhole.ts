import { AbstractEntity } from '../AbstractEntity/AbstractEntity';
import { Mentor } from '../Character/Mentor/Mentor';

export class Waterhole extends AbstractEntity {
  private _mentors: Mentor[] = [];

  constructor() {
    super();
  }

  get mentors(): Mentor[] {
    return this._mentors;
  }

  setMentors(newValue: Mentor[]): void {
    this._mentors = newValue;
  }
}
