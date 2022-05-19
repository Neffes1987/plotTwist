import { AbstractModel, IAbstractModel, IValidatorConfiguration } from '../../../base/abstractModel';

export type WorldType = 'plainWorld' | 'privateWorld' | 'hiddenCave' | 'holiday' | 'returnWithPotion';

export type WorldStatus = 'draft' | 'release' | 'finished';

export interface ICommonWorld extends IAbstractModel {
  story: string;
  reference: string;
  timeline: string;
  failPrice: string;
  status: WorldStatus;
  edgeId: string;
  plotId: string;
  worldType: Nullable<WorldType>;
}

export abstract class WorldModel extends AbstractModel {
  private readonly _worldType: Nullable<WorldType>;
  private _story = '';
  private readonly _plotId;
  private _reference = '';
  private _timeline = '';
  private _failPrice = '';
  private readonly _edgeId;
  private _status: WorldStatus = 'draft';

  protected constructor(type: WorldType, data: ICommonWorld) {
    super(data);
    this._worldType = type;
    this.setStory(data.story);
    this._plotId = data.plotId;
    this._reference = data.reference;
    this._timeline = data.timeline;
    this._failPrice = data.failPrice;
    this._edgeId = data.edgeId;
    this._status = data.status;
  }

  get edgeId(): string {
    return this._edgeId;
  }

  get plotId(): string {
    return this._plotId;
  }

  get story(): string {
    return this._story;
  }

  get status(): WorldStatus {
    return this._status;
  }

  get reference(): string {
    return this._reference;
  }

  get timeline(): string {
    return this._timeline;
  }

  get failPrice(): string {
    return this._failPrice;
  }

  setStory(newValue: string): void {
    this._story = newValue;
  }

  setStatus(newValue: WorldStatus): void {
    this._status = newValue;
  }

  setReference(newValue: string): void {
    this._reference = newValue;
  }

  setTimeline(newValue: string): void {
    this._timeline = newValue;
  }

  setFailPrice(newValue: string): void {
    this._failPrice = newValue;
  }

  getAdditionalProperties(): Record<string, unknown> {
    return {
      story: this._story,
      reference: this._reference,
      timeline: this._timeline,
      failPrice: this._failPrice,
      status: this._status,
      edgeId: this._edgeId,
      plotId: this._plotId,
      worldType: this._worldType,
    };
  }

  getValidationConfig(): IValidatorConfiguration[] {
    return [
      { name: 'story', max: this.BIG_VALUE_MAX_LENGTH },
      { name: 'reference', max: this.BIG_VALUE_MAX_LENGTH },
      { name: 'timeline', max: this.MIDDLE_VALUE_MAX_LENGTH },
      { name: 'failPrice', max: this.BIG_VALUE_MAX_LENGTH },
      { name: 'edgeId' },
      { name: 'plotId' },
    ];
  }
}
