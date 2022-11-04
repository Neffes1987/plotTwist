export type IWaterholeConstructor = ICommonConstructor<WaterholeDTO> & {
  getWorldWaterholes: (worldId: string) => Promise<WaterholeInWorldDTO[]>;
};
