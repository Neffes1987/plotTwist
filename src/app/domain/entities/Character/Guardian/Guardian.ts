import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

export class Guardian extends AbstractCharacter {
  private _becameAlly = '';
  private _becameEnemy = '';

  constructor() {
    super('guardian');
  }

  get becameAlly(): string {
    return this._becameAlly;
  }

  get becameEnemy(): string {
    return this._becameEnemy;
  }

  setBecameAlly(newValue: string): void {
    this._becameAlly = newValue;
  }

  setBecameEnemy(newValue: string): void {
    this._becameEnemy = newValue;
  }
}
