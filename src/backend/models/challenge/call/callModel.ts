import { AbstractModel, IAbstractModel, IValidatorConfiguration } from '../../../base/abstractModel';

export type CallStatus = 'active' | 'closed' | 'failed' | 'created';

export type CallType =
  | 'disorientation'
  | 'gossip'
  | 'treasureHunt'
  | 'inferring'
  | 'lackOfChoice'
  | 'deprivation'
  | 'requestOfHelp'
  | 'temptation'
  | 'synchronism'
  | 'pushToAction'
  | 'heraldOfChange';

export interface ICallModel extends IAbstractModel {
  partyMotivation: string;
  challengeId: string;
  status?: CallStatus;
  type?: CallType;
}

export class CallModel extends AbstractModel {
  static readonly PARTY_MOTIVATION = 2048;

  private _partyMotivation = '';
  private _challengeId = '';
  private _status: CallStatus = 'created';
  private _type: CallType = 'gossip';

  constructor(data: ICallModel) {
    super(data);
    this.setChallengeId(data.challengeId);
    this.setStatus(data.status ?? 'created');
    this.setType(data.type ?? 'gossip');
    this.setPartyMotivation(data.partyMotivation);
  }

  get status(): CallStatus {
    return this._status;
  }

  get challengeId(): string {
    return this._challengeId;
  }

  setChallengeId(newValue: string): void {
    this._challengeId = newValue;
  }

  setStatus(newValue: CallStatus): void {
    this._status = newValue;
  }

  setType(newValue: CallType): void {
    this._type = newValue;
  }

  setPartyMotivation(newValue: string): void {
    this._partyMotivation = newValue;
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      partyMotivation: this._partyMotivation,
      challengeId: this._challengeId,
      status: this._status,
      type: this._type,
    };
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      { name: 'challengeId' },
      { name: 'type' },
      { name: 'name' },
      {
        name: 'partyMotivation',
        max: CallModel.PARTY_MOTIVATION,
      },
    ];
  }
}
