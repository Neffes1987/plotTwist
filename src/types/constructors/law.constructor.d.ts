export interface ILawConstructor extends ICommonConstructor<LawDTO> {
  toggleWorldLawRelation: (lawId: string, worldId: string) => Promise<boolean>;
  toggleWorldLawStatus: (lawId: string, isBroken: boolean) => Promise<boolean>;
}
