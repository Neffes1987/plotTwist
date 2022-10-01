import { CommonDTO } from '../interface';

export abstract class AbstractEntity {
  private _id = '';

  get id(): string {
    return this._id;
  }

  setId(newValue: string): void {
    this._id = newValue;
  }

  serialize(): CommonDTO {
    return {
      id: this.id,
    };
  }

  unSerializeToEntity(rawData: CommonDTO): void {
    this.setId(rawData.id ?? '');
  }

  abstract validate(): void;
}
