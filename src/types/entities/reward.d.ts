interface RewardDto extends CommonEntityDTO {
  name: string;
  description: string;
}

interface RewardInEdgeDTO extends RewardDto {
  isAssigned?: boolean;
}
