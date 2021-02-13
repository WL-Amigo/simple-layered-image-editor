export interface IUniqueIdProvider {
  get(): string;
  register(ids: readonly string[]): void;
}
