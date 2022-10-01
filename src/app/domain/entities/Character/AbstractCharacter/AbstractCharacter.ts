import { CharacterType } from 'backend';

import { AbstractTextEntity } from '../../AbstractTextEntity/AbstractTextEntity';
import { Result } from '../../Result/Result';

export abstract class AbstractCharacter extends AbstractTextEntity {
  private readonly _type: CharacterType;
  private _age = 0;
  private _race = '';
  private _gender = '';
  private _goal = '';
  private _profession = '';
  private _group = '';
  // private _strongest: string[] = [];
  // private _weakness: string[] = [];
  private _result: Nullable<Result> = null;

  protected constructor(type: CharacterType) {
    super();

    this._type = type;
  }

  get age(): number {
    return this._age;
  }

  get race(): string {
    return this._race;
  }

  get gender(): string {
    return this._gender;
  }

  get goal(): string {
    return this._goal;
  }

  get profession(): string {
    return this._profession;
  }

  get group(): string {
    return this._group;
  }

  get type(): CharacterType {
    return this._type;
  }

  get result(): Nullable<Result> {
    return this._result;
  }

  setAge(newValue: number) {
    this._age = newValue;
  }

  setRace(newValue: string) {
    this._race = newValue;
  }

  setGender(newValue: string) {
    this._gender = newValue;
  }

  setGoal(newValue: string) {
    this._goal = newValue;
  }

  setProfession(newValue: string) {
    this._profession = newValue;
  }

  setGroup(newValue: string) {
    this._group = newValue;
  }

  setStrongest(newValue: string[]) {
    // this._strongest = newValue;
  }

  setWeakness(newValue: string[]) {
    // this._weakness = newValue;
  }

  setResult(newValue: Result) {
    this._result = newValue;
  }
}
