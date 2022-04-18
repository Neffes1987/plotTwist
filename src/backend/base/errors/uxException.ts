export class UxException extends Error {
  _translationMessage = '';
  _properties: Record<string, string> = {};

  constructor(message: string, additionalProperties: Record<string, string> = {}) {
    super(message);

    this._translationMessage = message;

    if (additionalProperties != null) {
      this._properties = {
        ...this._properties,
        ...additionalProperties,
      };
    }
  }
}
