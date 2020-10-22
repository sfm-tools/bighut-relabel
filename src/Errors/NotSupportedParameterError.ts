export class NotSupportedParameterError extends Error {

  constructor(parameterName?: string) {
    super(`${parameterName || 'Parameter'} is not supported.`);
  }

}
