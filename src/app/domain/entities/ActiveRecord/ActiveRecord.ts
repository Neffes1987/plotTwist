export abstract class ActiveRecord<DTO extends CommonEntityDTO> implements IActiveRecord, Serialization<DTO> {
  id = '';
  protected readonly _gateway: DataStoreGateway<DTO>;

  protected constructor(gateway: DataStoreGateway<DTO>) {
    this._gateway = gateway;
  }

  async load(): Promise<void> {
    if (!this.id) {
      return;
    }

    const dto = await this._gateway.get(this.id);

    if (!dto) {
      return;
    }

    this.unSerialize(dto);
  }

  async save(): Promise<string> {
    this.validate();
    const dto = this.serialize();

    return this._gateway.save(dto);
  }

  remove(): Promise<boolean> {
    if (!this.id) {
      return Promise.resolve(false);
    }

    return this._gateway.delete(this.id);
  }

  unSerialize(dto: DTO): void {
    Object.keys(dto).forEach((key: string) => {
      this[key] = dto[key];
    });
  }

  abstract validate(): void;

  abstract serialize(): DTO;
}
