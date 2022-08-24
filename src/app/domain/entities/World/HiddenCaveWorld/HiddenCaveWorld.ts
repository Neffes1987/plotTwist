import { HiddenCaveWorldDTO } from 'backend';

import { BIG_VALUE_MAX_LENGTH, SHORT_VALUE_MAX_LENGTH } from '../../../../../constants';
import { EntityValidator } from '../../AbstractEntity/EntityValidator';
import { AbstractWorld } from '../AbstractWorld/AbstractWorld';

export class HiddenCaveWorld extends AbstractWorld {
  private _mainEdgeInformation = '';
  private _shadowIntroduction = '';
  private _partyPlan = '';

  constructor() {
    super('hiddenCave');
  }

  get mainEdgeInformation(): string {
    return this._mainEdgeInformation;
  }

  get shadowIntroduction(): string {
    return this._shadowIntroduction;
  }

  get partyPlan(): string {
    return this._partyPlan;
  }

  setPartyPlan(newValue: string): void {
    this._partyPlan = newValue;
  }

  setShadowIntroduction(newValue: string): void {
    this._shadowIntroduction = newValue;
  }

  setMainEdgeInformation(newValue: string): void {
    this._mainEdgeInformation = newValue;
  }

  serialize(): HiddenCaveWorldDTO {
    return {
      ...super.serialize(),
      type: 'hiddenCave',
      mainEdgeInformation: this.mainEdgeInformation,
      partyPlan: this.partyPlan,
      shadowIntroduction: this.shadowIntroduction,
    };
  }

  unSerializeToEntity(object: HiddenCaveWorldDTO): void {
    super.unSerializeToEntity(object);

    this.setPartyPlan(object.partyPlan);
    this.setShadowIntroduction(object.shadowIntroduction);
    this.setMainEdgeInformation(object.mainEdgeInformation);
  }

  validate(): void {
    super.validate();

    const validator = new EntityValidator<Partial<HiddenCaveWorldDTO>>(this.serialize());

    validator.checkFieldRange([
      { propertyName: 'partyPlan', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH },
      { propertyName: 'shadowIntroduction', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH },
      { propertyName: 'mainEdgeInformation', min: SHORT_VALUE_MAX_LENGTH, max: BIG_VALUE_MAX_LENGTH },
    ]);
  }
}
