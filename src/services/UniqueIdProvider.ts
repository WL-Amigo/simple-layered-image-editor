import { IUniqueIdProvider } from './IUniqueIdProvider';
import { nanoid } from 'nanoid';

export class UniqueIdProvider implements IUniqueIdProvider {
  private readonly usedIds = new Set<string>();
  get(): string {
    let id = nanoid(16);
    while (this.usedIds.has(id)) {
      id = nanoid(16);
    }
    return id;
  }
  register(ids: readonly string[]): void {
    ids.forEach((id) => this.usedIds.add(id));
  }
}
