import { BaseError } from './BaseError';

export class InvalidStateError extends BaseError {
  public constructor(message: string) {
    super(`無効な状態が発生しました: ${message}`);
  }
}
