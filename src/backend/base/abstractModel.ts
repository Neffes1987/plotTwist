export interface IAbstractModel {
  id: string;
  name: string;
  description: string;
}

export abstract class AbstractModel implements IAbstractModel {
  readonly SHORT_VALUE_MAX_LENGTH = 256;
  readonly MIDDLE_VALUE_MAX_LENGTH = 2048;
  readonly BIG_VALUE_MAX_LENGTH = 4096;

  private _id = '';
  private _name = '';
  private _description = '';

  protected constructor(props: IAbstractModel) {
    this.validateMap(props);
    this.setId(props.id);
    this.setName(props.name);
    this.setDescription(props.description);
  }

  get id(): string {
    return this._id;
  }

  get name(): string {
    return this._name;
  }

  get description(): string {
    return this._description;
  }

  setId(newValue: string): void {
    this._id = newValue;
  }

  setName(newValue: string): void {
    this._name = newValue;
  }

  setDescription(newValue?: string): void {
    this._description = newValue ?? '';
  }

  serialize(): IAbstractModel {
    return {
      ...this.getAdditionalProperties(),
      id: this._id,
      name: this._name,
      description: this._description,
    };
  }

  abstract validateMap(data: IAbstractModel): void;

  abstract getAdditionalProperties(): Record<string, unknown>;
}
