export class UxException extends Error {
  constructor(message: string, additionalProperties: Record<string, string> = {}) {
    let properties: Record<string, string> = {
      message,
    };

    if (additionalProperties != null) {
      properties = {
        ...properties,
        ...additionalProperties,
      };
    }

    super(JSON.stringify(properties));
  }
}
