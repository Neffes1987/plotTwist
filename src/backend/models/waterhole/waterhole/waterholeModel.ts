import {AbstractModel, IAbstractModel} from '../../../base/abstractModel';
import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

export interface IWaterholeModel extends IAbstractModel {
  mentorIds: string[];
  messengerIds: string[];
}

export class WaterholeModel extends AbstractModel {
  readonly MENTORS_MIN_VALUE = 2;
  readonly MESSENGERS_MIN_VALUE = 2;

  private _mentorIds: string[] = [];
  private _messengerIds: string[] = [];

  constructor(data: IWaterholeModel) {
    super(data);

    this.setMentorsIds(data.mentorIds);
    this.setMessengersIds(data.messengerIds);
  }

  setMentorsIds(newValue: string[]): void {
    this._mentorIds = newValue;
  }

  setMessengersIds(newValue: string[]): void {
    this._messengerIds = newValue;
  }

  validateMap(data: IWaterholeModel): void {
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.name == null) {
      emptyProperties.push('name');
    } else if (data.name.length > this.MIDDLE_VALUE_MAX_LENGTH) {
      notSatisfiedProps.name = 'more_then_$MIDDLE_VALUE_MAX_LENGTH';
    }

    if (data.description == null) {
      emptyProperties.push('description');
    } else if (data.description.length > this.BIG_VALUE_MAX_LENGTH) {
      notSatisfiedProps.description = 'more_then_$BIG_VALUE_MAX_LENGTH';
    }

    if (data.mentorIds == null) {
      emptyProperties.push('mentors');
    } else if (data.mentorIds.length < this.MENTORS_MIN_VALUE) {
      notSatisfiedProps.mentors = 'less_then_$MENTORS_MIN_VALUE';
    }

    if (data.messengerIds == null) {
      emptyProperties.push('messengers');
    } else if (data.messengerIds.length < this.MESSENGERS_MIN_VALUE) {
      notSatisfiedProps.messengers = 'less_then_$MESSENGERS_MIN_VALUE';
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      mentorIds: this._mentorIds,
      messengerIds: this._messengerIds,
    };
  }
}
