import { AbstractEntity } from '../AbstractEntity/AbstractEntity';
import { Entities, RelationDTO } from '../interface';

export class Relation extends AbstractEntity {
  private _fieldId: string;
  private _fieldName: Entities;
  private _siblingId: string;
  private _siblingName: Entities;

  constructor() {
    super();
  }

  serialize(): RelationDTO {
    return {
      id: this.id,
      fieldId: this._fieldId,
      fieldName: this._fieldName,
      siblingId: this._siblingId,
      siblingName: this._siblingName,
    };
  }

  unSerialize(raw: RelationDTO): void {
    this._fieldId = raw.fieldId;
    this._fieldName = raw.fieldName;
    this._siblingId = raw.siblingId;
    this._siblingName = raw.siblingName;
    this.setId(raw.id);
  }

  validate(): void {
    //
  }
}
