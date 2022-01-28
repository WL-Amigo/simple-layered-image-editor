import { BaseError } from './BaseError';

export class DependencyNotProvidedError extends BaseError {
  public constructor(injectionKey: string) {
    super(`次の依存関係が正しく provide されていません: ${injectionKey}`);
  }
}
