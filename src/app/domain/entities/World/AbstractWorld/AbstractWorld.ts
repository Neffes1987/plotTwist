import { WorldDTO } from 'backend';

import { BIG_VALUE_MAX_LENGTH, MIDDLE_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../constants';
import { ValidationError } from '../../../../errors/ValidationError';
import { AbstractTextEntity } from '../../AbstractTextEntity/AbstractTextEntity';
import { EntityValidator } from '../../AbstractTextEntity/EntityValidator';
import { AbstractChallenge } from '../../Challenge/AbstractChallenge/AbstractChallenge';
import { Law } from '../../Law/Law';
import { Waterhole } from '../../Waterhole/Waterhole';

import { WorldStatus, WorldType } from './interface';

export abstract class AbstractWorld extends AbstractTextEntity {
  private _type: Nullable<WorldType> = null;
  private _story = '';
  private _reference = '';
  private _timeline = '';
  private _failPrice = '';
  private _plotId = '';
  private _status: WorldStatus = 'draft';
  private _laws: Law[] = [];
  private _waterholes: Waterhole[] = [];
  private _challenge: Nullable<AbstractChallenge> = null;

  protected constructor(worldType: WorldType) {
    super();
    this._type = worldType;
  }

  get type(): WorldType {
    return this._type ?? 'plainWorld';
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

  get laws(): Law[] {
    return this._laws;
  }

  get challenge(): Nullable<AbstractChallenge> {
    return this._challenge;
  }

  get waterholes(): Waterhole[] {
    return this._waterholes;
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

  setPlotId(newValue: string): void {
    this._plotId = newValue;
  }

  setLaws(newValue: Law[]): void {
    this._laws = newValue;
  }

  setChallenges(newValue: AbstractChallenge): void {
    this._challenge = newValue;
  }

  setWaterholes(newValue: Waterhole[]): void {
    this._waterholes = newValue;
  }

  serialize(): WorldDTO {
    return {
      ...super.serialize(),
      failPrice: this.failPrice,
      reference: this.reference,
      status: this.status,
      story: this.story,
      timeline: this.timeline,
      plotId: this.plotId,
      laws: this.laws,
      waterholes: this.waterholes,
      type: 'plainWorld',
    };
  }

  unSerializeToEntity(object: WorldDTO): void {
    super.unSerializeToEntity(object);

    this.setFailPrice(object.failPrice);
    this.setReference(object.reference);
    this.setStatus(object.status);
    this.setStory(object.story);
    this.setTimeline(object.timeline);
    this.setPlotId(object.plotId);
    this._type = object.type;
    // this.setLaws(object.laws ?? []);
    // this.setWaterholes(object.waterholes ?? []);
  }

  validate(): void {
    const error = new ValidationError();

    try {
      super.validate();
    } catch (e) {
      error.merge(e);
    }

    const validator = new EntityValidator<Partial<WorldDTO>>(this.serialize());

    try {
      validator.checkRequiredFields(['status', 'plotId', 'type']);
    } catch (e) {
      error.merge(e);
    }

    try {
      validator.checkFieldRange([
        { propertyName: 'failPrice', min: SHORT_VALUE_MAX_LENGTH, max: MIDDLE_VALUE_MAX_LENGTH },
        { propertyName: 'reference', min: SHORT_VALUE_MAX_LENGTH, max: MIDDLE_VALUE_MAX_LENGTH },
        { propertyName: 'story', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH },
        { propertyName: 'timeline', min: SHORT_VALUE_MAX_LENGTH, max: MIDDLE_VALUE_MAX_LENGTH },
      ]);
    } catch (e) {
      error.merge(e);
    }

    if (error.length) {
      throw error;
    }
  }
}
