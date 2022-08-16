import { ReturnWithPotionWorldDTO } from 'backend';

import { AbstractWorld } from '../AbstractWorld/AbstractWorld';

import { FinalType, PotionType } from './interface';

export class ReturnWithPotionWorld extends AbstractWorld {
  _finalType?: FinalType;
  _potionType?: PotionType;
  _cliffhanger = '';

  constructor() {
    super('returnWithPotion');
  }

  get finalType(): FinalType | undefined {
    return this._finalType;
  }

  get cliffhanger(): string {
    return this._cliffhanger;
  }

  get potionType(): PotionType | undefined {
    return this._potionType;
  }

  setFinalType(newValue?: FinalType): void {
    this._finalType = newValue;
  }

  setPotionType(newValue?: PotionType): void {
    this._potionType = newValue;
  }

  setCliffhanger(newValue: string): void {
    this._cliffhanger = newValue;
  }

  serialize(): ReturnWithPotionWorldDTO {
    return {
      ...super.serialize(),
      finalType: this.finalType,
      cliffhanger: this.cliffhanger,
      potionType: this.potionType,
      type: 'returnWithPotion',
    };
  }

  unSerializeToEntity(object: ReturnWithPotionWorldDTO): void {
    super.unSerializeToEntity(object);
    this.setPotionType(object.potionType);
    this.setCliffhanger(object.cliffhanger);
    this.setFinalType(object.finalType);
  }
}
