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

    this.id = await this._gateway.save(dto);

    return this.id;
  }

  async saveButch(dtos: DTO[]): Promise<boolean> {
    return this._gateway.saveInBatch(dtos);
  }

  async removeButch(ids: string[]): Promise<boolean> {
    return this._gateway.deleteButch(ids);
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

  list(params: ListParams<DTO>): Promise<DTO[]> {
    return this._gateway.list(params);
  }

  abstract validate(): void;

  abstract serialize(): DTO;
}
