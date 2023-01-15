export type IRewardConstructor = ICommonConstructor<RewardDto> & {
  getEdgeRewards: (edgeId: string) => Promise<RewardInEdgeDTO[]>;
};
