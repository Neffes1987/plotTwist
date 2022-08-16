import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

export class Messenger extends AbstractCharacter {
  private _motivation = '';

  constructor() {
    super('messenger');
  }

  get motivation(): string {
    return this._motivation;
  }

  setMotivation(newValue: string): void {
    this._motivation = newValue;
  }
}
