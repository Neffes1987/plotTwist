import { AbstractEntity } from '../AbstractEntity/AbstractEntity';
import { Messenger } from '../Character/Messenger/Messenger';

import { CallStatus, CallType } from './interface';

export class Call extends AbstractEntity {
  readonly type: CallType;

  private _partyMotivation = '';
  private _status: CallStatus = 'created';
  private _messengers: Messenger[] = [];

  constructor(type: CallType) {
    super();
    this.type = type;
  }

  get status(): CallStatus {
    return this._status;
  }

  get partyMotivation(): string {
    return this._partyMotivation;
  }

  get messengers(): Messenger[] {
    return this._messengers;
  }

  setMessengers(newValue: Messenger[]): void {
    this._messengers = newValue;
  }

  setStatus(newValue: CallStatus): void {
    this._status = newValue;
  }

  setPartyMotivation(newValue: string): void {
    this._partyMotivation = newValue;
  }
}
