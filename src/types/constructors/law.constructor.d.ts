export type ILawConstructor = ICommonConstructor<LawDTO> & {
  getWorldLaws: (worldId: string) => Promise<LawInWorldDTO[]>;
};
