interface LawDTO extends CommonEntityDTO {
  name: string;
  description: string;
  punishment: string;
}

interface LawInWorldDTO extends LawDTO {
  isBroken: boolean;
}
