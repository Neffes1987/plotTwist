import {AbstractModel, IAbstractModel} from '../../../base/abstractModel';
import {ErrorLog} from '../../../base/errors/errorLog';
import {UxException} from '../../../base/errors/uxException';

export type WorldType = 'plainWorld' | 'privateWorld' | 'hiddenCave' | 'holiday' | 'returnWithPotion';

export type WorldStatus = 'draft' | 'release';

export interface ICommonWorld extends IAbstractModel {
  story: string;
  references: string;
  timeline: string;
  failPrice: string;
  status: WorldStatus;
  edgeId: string;
  plotId: string;
  lawIds: string[];
  worldType: Nullable<WorldType>;
}

export abstract class WorldModel extends AbstractModel {
  static readonly STORY_MAX_LENGTH = 2048;
  static readonly REFERENCE_MAX_LENGTH = 2048;
  static readonly FAIL_PRICE_MAX_LENGTH = 2048;
  static readonly TIMELINE_MAX_LENGTH = 512;
  static readonly LAWS_MIN_LENGT = 2;

  worldType: Nullable<WorldType> = null;
  _story = '';
  _plotId = '';
  _references = '';
  _timeline = '';
  _failPrice = '';
  _edgeId = '';
  _lawsIds: string[] = [];
  _status: WorldStatus = 'draft';

  protected constructor(type: WorldType, data: ICommonWorld) {
    super(data);
    this.worldType = type;
    this.setStory(data.story);
    this._plotId = data.plotId;
    this._references = data.references;
    this._timeline = data.timeline;
    this._failPrice = data.failPrice;
    this._edgeId = data.edgeId;
    this._lawsIds = data.lawIds;
    this._lawsIds = data.lawIds;
    this._status = data.status;
  }

  get edgeId(): string {
    return this._edgeId;
  }

  get plotId(): string {
    return this._plotId;
  }

  get lawsIds(): string[] {
    return this._lawsIds;
  }

  get story(): string {
    return this._story;
  }

  get status(): WorldStatus {
    return this._status;
  }

  get references(): string {
    return this._references;
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

  setLawsIds(newValue: string[]): void {
    this._lawsIds = newValue;
  }

  setStatus(newValue: WorldStatus): void {
    this._status = newValue;
  }

  setReference(newValue: string): void {
    this._references = newValue;
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
      references: this._references,
      timeline: this._timeline,
      failPrice: this._failPrice,
      status: this._status,
      edgeId: this._edgeId,
      plotId: this._plotId,
      lawIds: this._lawsIds,
    };
  }

  validateMap(data: ICommonWorld): void {
    const emptyProperties: string[] = [];
    const notSatisfiedProps: Record<string, string> = {};

    if (data.story == null) {
      emptyProperties.push('story');
    } else if (data.story.length > WorldModel.STORY_MAX_LENGTH) {
      notSatisfiedProps.story = 'more_then_$STORY_MAX_LENGTH';
    }

    if (data.lawIds == null) {
      emptyProperties.push('lawsIds');
    } else if (data.lawIds.length < WorldModel.LAWS_MIN_LENGT) {
      notSatisfiedProps.lawsIds = 'less_then_$LAWS_MIN_LENGT';
    }

    if (data.references == null) {
      emptyProperties.push('references');
    } else if (data.references.length > WorldModel.REFERENCE_MAX_LENGTH) {
      notSatisfiedProps.references = 'more_then_$REFERENCE_MAX_LENGTH';
    }

    if (data.timeline == null) {
      emptyProperties.push('timeline');
    } else if (data.timeline.length > WorldModel.TIMELINE_MAX_LENGTH) {
      notSatisfiedProps.timeline = 'more_then_$TIMELINE_MAX_LENGTH';
    }

    if (data.failPrice == null) {
      emptyProperties.push('failPrice');
    } else if (data.failPrice.length > WorldModel.FAIL_PRICE_MAX_LENGTH) {
      notSatisfiedProps.failPrice = 'more_then_$FAIL_PRICE_MAX_LENGTH';
    }

    if (data.edgeId == null) {
      emptyProperties.push('edgeId');
    }

    if (data.plotId == null) {
      emptyProperties.push('plotId');
    }

    if (emptyProperties.length || notSatisfiedProps.isNotEmpty) {
      notSatisfiedProps.emptyProperties = emptyProperties.toString();

      throw new UxException(ErrorLog.validationError, notSatisfiedProps);
    }
  }
}
