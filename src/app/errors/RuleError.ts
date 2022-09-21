interface RuleErrorConfig {
  code: string;
  payload?: Record<string, string>;
}

interface EntityDuplicationRuleErrorConfig {
  code: 'ENTITY_DUPLICATION';
  payload: {
    entityId: string;
    entityName: string;
  };
}

type RuleErrorCommonConfig = EntityDuplicationRuleErrorConfig;

export class RuleError extends Error {
  readonly errorPayload: RuleErrorConfig;

  constructor(config: RuleErrorCommonConfig) {
    super('RULE_ERROR');
    this.errorPayload = config;
  }
}
