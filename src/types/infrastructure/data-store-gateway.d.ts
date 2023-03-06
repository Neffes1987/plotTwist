type DataStoreGateway<DTO extends CommonEntityDTO> = Crud<DTO> & {
  saveInBatch: (dtos: DTO[]) => Promise<boolean>;
  deleteButch: (ids: string[]) => Promise<boolean>;
};
