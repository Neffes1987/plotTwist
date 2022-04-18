import {ServiceType} from '../../controller/serviceMediator';

export class Command {
  private readonly _type: Nullable<ServiceType>;
  private readonly _operationName;
  private _payload: Record<string, unknown> = {};

  constructor(
    type: ServiceType,
    operationName: string,
    payload?: Record<string, unknown>,
  ) {
    this._type = type;
    this._operationName = operationName;

    if (payload) {
      this._payload = payload;
    }
  }

  get payload(): Record<string, unknown> {
    return this._payload;
  }

  get type(): Nullable<ServiceType> {
    return this._type;
  }

  get operationName(): string {
    return this._operationName;
  }

  setPayload(newValue: Record<string, unknown>) {
    this._payload = newValue;
  }
}
