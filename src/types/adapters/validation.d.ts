interface Validation<DTO extends CommonEntityDTO> {
  validate: (dto: DTO) => void;
}
