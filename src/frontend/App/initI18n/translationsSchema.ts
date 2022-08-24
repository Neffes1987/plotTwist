import { TranslationPage } from './interface';

export class TranslationNamespace<Type extends TranslationPage> {
  readonly translationNamespace: string;
  private schema: Type;

  constructor(translationNamespace: string, schema: Type) {
    this.translationNamespace = translationNamespace;
    this.schema = schema;
    this.mergeNamespaceWithSchemaRecords();
  }

  get labels(): Type['labels'] {
    return this.schema.labels ?? {};
  }

  get errors(): Type['errors'] {
    return this.schema.errors ?? {};
  }

  get actions(): Type['actions'] {
    return this.schema.actions ?? {};
  }

  get messages(): Type['messages'] {
    return this.schema.messages ?? {};
  }

  get caption(): Type['caption'] {
    return this.schema.caption ?? {};
  }

  get lists(): Type['lists'] {
    return this.schema.lists ?? {};
  }

  private mergeNamespaceWithSchemaRecords(): void {
    const convertedSchema: Record<string, Record<string, string>> = {};

    Object.keys(this.schema).forEach(schemaBlockKey => {
      const translationBlock = this.schema[schemaBlockKey as keyof TranslationPage];

      if (schemaBlockKey === 'caption') {
        // @ts-ignore
        convertedSchema.caption = this.addNamespace(translationBlock);

        return;
      }

      if (schemaBlockKey === 'caption') {
        // @ts-ignore
        convertedSchema.caption = this.addNamespace(translationBlock);

        return;
      }

      if (schemaBlockKey === 'lists') {
        // @ts-ignore
        convertedSchema.lists = this.mergeLists(schemaBlockKey, translationBlock as Type['lists']);

        return;
      }

      convertedSchema[schemaBlockKey] = this.addNamespaceToTranslationBlocks(schemaBlockKey, (translationBlock as unknown) as Record<string, string>);
    });

    this.schema = (convertedSchema as unknown) as Type;
  }

  private mergeLists(key: string, blockValues?: Record<string, Record<string, string>>): Record<string, Record<string, string>> {
    if (!blockValues) {
      return {};
    }

    Object.keys(blockValues).forEach(translationKey => {
      blockValues[translationKey] = this.addNamespaceToTranslationBlocks(`${key}.${translationKey}`, blockValues[translationKey]);
    });

    return blockValues;
  }

  private addNamespaceToTranslationBlocks(key: string, blockValues?: Record<string, string>): Record<string, string> {
    if (!blockValues) {
      return {};
    }

    Object.keys(blockValues).forEach(translationKey => {
      blockValues[translationKey] = this.addNamespace(`${key}.${blockValues[translationKey]}`);
    });

    return blockValues;
  }

  private addNamespace(translationKey: string): string {
    return `${this.translationNamespace}.${translationKey}`;
  }
}
