import { AbstractEntity } from '../AbstractEntity/AbstractEntity';
import { Mentor } from '../Character/Mentor/Mentor';

export class Law extends AbstractEntity {
  isBroken = false;
  private _punishment = '';
  private _mentors: Mentor[] = [];

  constructor() {
    super();
  }

  get punishment(): string {
    return this._punishment;
  }

  get mentors(): Mentor[] {
    return this._mentors;
  }

  setPunishment(newValue: string): void {
    this._punishment = newValue;
  }

  setMentors(newValue: Mentor[]): void {
    this._mentors = newValue;
  }
}
