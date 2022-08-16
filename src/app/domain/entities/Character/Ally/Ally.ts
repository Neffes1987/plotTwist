import { AbstractCharacter } from '../AbstractCharacter/AbstractCharacter';

import { AllyType } from './interface';

export class Ally extends AbstractCharacter {
  isAllyForParty = false;
  readonly allyType: AllyType;

  private _allyForHero = '';
  private _callForAlly = '';

  constructor(allyType: AllyType) {
    super('ally');
    this.allyType = allyType;
  }

  get allyForHero(): string {
    return this._allyForHero;
  }

  get callForAlly(): string {
    return this._callForAlly;
  }

  setIsAllyForParty(newValue: boolean): void {
    this.isAllyForParty = newValue;
    this._allyForHero = '';
  }

  setAllyForHero(newValue: string): void {
    this.isAllyForParty = false;
    this._allyForHero = newValue;
  }

  setCallForAlly(newValue: string): void {
    this._callForAlly = newValue;
  }
}
