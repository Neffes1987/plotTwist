import { PlotDTO } from 'backend';

import { AbstractEntity } from '../AbstractEntity/AbstractEntity';
import { AbstractWorld } from '../World/AbstractWorld/AbstractWorld';

import { PlotStatus } from './interface';

export class Plot extends AbstractEntity {
  private _status: PlotStatus = 'draft';
  private _worlds: AbstractWorld[] = [];

  constructor() {
    super();
  }

  get status(): PlotStatus {
    return this._status;
  }

  get worlds(): AbstractWorld[] {
    return this._worlds;
  }

  setStatus(newValue: PlotStatus): void {
    this._status = newValue;
  }

  setWorlds(newValue: AbstractWorld[]): void {
    this._worlds = newValue;
  }

  serialize(): PlotDTO {
    return { ...super.serialize(), status: this.status, worlds: this._worlds };
  }

  unSerializeToEntity(rawData: PlotDTO): void {
    super.unSerializeToEntity(rawData);

    this.setStatus(rawData.status);
  }
}
