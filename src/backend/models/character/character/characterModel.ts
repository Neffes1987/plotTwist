import { AbstractModel, IAbstractModel, IValidatorConfiguration } from '../../../base/abstractModel';

export type CharacterType = 'mentor' | 'guard' | 'messenger' | 'ally' | 'enemy' | 'shadow';

export interface ICharacterModel extends IAbstractModel {
  plotId: string;
  age: string;
  race: string;
  gender: string;
  goal: string;
  previewId: string;
  profession: string;
  group: string;
  type: CharacterType;
  strongest: string[];
  weakness: string[];
  resultIds: string[];
}

export abstract class CharacterModel extends AbstractModel {
  static readonly ABILITIES_MIN_LENGTH = 2;

  private _age = '0';
  private _race = '';
  private _gender = '';
  private _goal = '';
  private _previewId = '';
  private _profession = '';
  private _group = '';
  private readonly _type: CharacterType;
  private _strongest: string[] = [];
  private _weakness: string[] = [];
  private _resultIds: string[] = [];
  private readonly _plotId: string;

  protected constructor(data: ICharacterModel) {
    super(data);

    this.setAge(data.age);
    this.setRace(data.race);
    this.setGender(data.gender);
    this.setGoal(data.goal);
    this.setPreviewId(data.previewId);
    this.setProfession(data.profession);
    this.setGroup(data.group);
    this._type = data.type;
    this._plotId = data.plotId;
    this.setStrongest(data.strongest);
    this.setWeakness(data.weakness);
  }

  get plotId(): string {
    return this._plotId;
  }

  get type(): CharacterType {
    return this._type;
  }

  get resultIds(): string[] {
    return this._resultIds;
  }

  setAge(newValue: string) {
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

  setPreviewId(newValue: string) {
    this._previewId = newValue;
  }

  setProfession(newValue: string) {
    this._profession = newValue;
  }

  setGroup(newValue: string) {
    this._group = newValue;
  }

  setStrongest(newValue: string[]) {
    this._strongest = newValue;
  }

  setWeakness(newValue: string[]) {
    this._weakness = newValue;
  }

  setResultIds(newValue: string[]) {
    this._resultIds = newValue;
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      { name: 'age' },
      { name: 'plotId' },
      { name: 'race', max: this.SHORT_VALUE_MAX_LENGTH },
      { name: 'gender', max: this.SHORT_VALUE_MAX_LENGTH },
      { name: 'goal', max: this.SHORT_VALUE_MAX_LENGTH },
      { name: 'profession', max: this.SHORT_VALUE_MAX_LENGTH },
      { name: 'group', max: this.SHORT_VALUE_MAX_LENGTH },
      { name: 'name', max: this.SHORT_VALUE_MAX_LENGTH },
      { name: 'description', max: this.SHORT_VALUE_MAX_LENGTH },
      { name: 'strongest', min: CharacterModel.ABILITIES_MIN_LENGTH },
      { name: 'weakness', min: CharacterModel.ABILITIES_MIN_LENGTH },
      { name: 'resultIds' },
    ];
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      age: this._age,
      gender: this._gender,
      goal: this._goal,
      previewId: this._previewId,
      profession: this._profession,
      race: this._race,
      strongest: this._strongest,
      weakness: this._weakness,
      type: this._type,
      group: this._group,
      plotId: this._plotId,
      resultIds: this._resultIds,
    };
  }
}
