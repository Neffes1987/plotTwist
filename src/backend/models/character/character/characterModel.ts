import 'package:plot_twist_app/models/domain/base/abstract_model.dart';
import '../../../controller/errors/errorLog.dart';
import '../../../controller/uxException.dart';

import {AbstractModel, IAbstractModel} from '../../../base/abstractModel';
import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

export type CharacterType = 'mentor' | 'guard' | 'messenger' | 'ally' | 'enemy' | 'shadow';

export interface ICharacterModel extends IAbstractModel {
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
    this.setStrongest(data.strongest);
    this.setWeakness(data.weakness);
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

  validateMap(data: ICharacterModel) {
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.age == null) {
      emptyProperties.push('age');
    }

    if (data.race == null) {
      emptyProperties.push('race');
    } else if (data.race.length > this.SHORT_VALUE_MAX_LENGTH) {
      notSatisfiedProps.race = 'more_then_$SHORT_VALUE_MAX_LENGTH';
    }

    if (data.gender == null) {
      emptyProperties.push('gender');
    } else if (data.gender.length > this.SHORT_VALUE_MAX_LENGTH) {
      notSatisfiedProps.gender = 'more_then_$SHORT_VALUE_MAX_LENGTH';
    }

    if (data.goal == null) {
      emptyProperties.push('goal');
    } else if (data.goal.length > this.SHORT_VALUE_MAX_LENGTH) {
      notSatisfiedProps.goal = 'more_then_$SHORT_VALUE_MAX_LENGTH';
    }

    if (data.profession == null) {
      emptyProperties.push('profession');
    } else if (data.profession.length > this.SHORT_VALUE_MAX_LENGTH) {
      notSatisfiedProps.profession = 'more_then_$SHORT_VALUE_MAX_LENGTH';
    }

    if (data.group == null) {
      emptyProperties.push('group');
    } else if (data.group.length > this.SHORT_VALUE_MAX_LENGTH) {
      notSatisfiedProps.group = 'more_then_$SHORT_VALUE_MAX_LENGTH';
    }

    if (data.strongest == null) {
      emptyProperties.push('strongest');
    } else if (data.strongest.length < CharacterModel.ABILITIES_MIN_LENGTH) {
      notSatisfiedProps.strongest = 'less_then_$ABILITIES_MIN_LENGTH';
    }

    if (data.weakness == null) {
      emptyProperties.push('weakness');
    } else if (data.weakness.length < CharacterModel.ABILITIES_MIN_LENGTH) {
      notSatisfiedProps.weakness = 'less_then_$ABILITIES_MIN_LENGTH';
    }

    if (data.name == null) {
      emptyProperties.push('name');
    }

    if (data.description == null) {
      emptyProperties.push('description');
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
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
    };
  }
}
