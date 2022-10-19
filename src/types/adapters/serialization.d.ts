interface Serialization<DTO extends CommonEntityDTO> {
  serialize: () => DTO;
  unSerialize: (dto: DTO) => void;
}
