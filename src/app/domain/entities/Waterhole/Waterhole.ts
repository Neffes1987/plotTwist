import { AbstractTextEntity } from '../AbstractTextEntity/AbstractTextEntity';
import { Mentor } from '../Character/Mentor/Mentor';

export class Waterhole extends AbstractTextEntity {
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
