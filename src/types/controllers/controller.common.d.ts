interface ListParams<DTO> {
  query?: Partial<Record<keyof DTO, string | string[]>>;
}

interface Crud<DTO extends CommonEntityDTO> {
  get: (id: string) => Promise<Nullable<DTO>>;
  save: (dto: DTO) => Promise<string>;
  delete: (id: string) => Promise<boolean>;
  list: (params: ListParams<DTO>) => Promise<DTO[]>;
}
