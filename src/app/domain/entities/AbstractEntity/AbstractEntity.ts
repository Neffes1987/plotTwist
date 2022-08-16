import { CommonDTO } from 'backend';

export abstract class AbstractEntity {
  private _id = '';
  private _name = '';
  private _description = '';

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

  setName(newValue = ''): void {
    this._name = newValue;
  }

  setDescription(newValue = ''): void {
    this._description = newValue;
  }

  serialize(): CommonDTO {
    return {
      description: this.description,
      id: this.id,
      name: this.name,
    };
  }

  unSerializeToEntity(rawData: CommonDTO): void {
    this.setId(rawData.id ?? '');
    this.setName(rawData.name ?? '');
    this.setDescription(rawData.description ?? '');
  }
}
