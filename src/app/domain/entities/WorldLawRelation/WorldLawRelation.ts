import { AbstractEntity } from '../AbstractEntity/AbstractEntity';
import { WorldLawRelationDTO } from '../interface';

export class WorldLawRelation extends AbstractEntity {
  isBroken = false;
  private _lawId: string;
  private _worldId: string;

  constructor() {
    super();
  }

  get lawId(): string {
    return this._lawId;
  }

  setLawId(newValue: string): void {
    this._lawId = newValue;
  }

  setWorldIs(newValue: string): void {
    this._worldId = newValue;
  }

  serialize(): WorldLawRelationDTO {
    return {
      id: this.id,
      lawId: this._lawId,
      worldId: this._worldId,
      isBroken: this.isBroken,
    };
  }

  unSerialize(raw: WorldLawRelationDTO): void {
    this._lawId = raw.lawId;
    this._worldId = raw.worldId;
    this.isBroken = raw.isBroken;
    this.setId(raw.id);
  }

  validate(): void {
    //
  }
}
