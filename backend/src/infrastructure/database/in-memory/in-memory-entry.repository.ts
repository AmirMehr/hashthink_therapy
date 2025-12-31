import { Injectable } from '@nestjs/common';
import { SessionEntry } from '../../../core/domain/session-entry.entity';
import { IEntryRepository } from '../../../core/interfaces/repositories/entry-repository.interface';
import { InMemoryDatabase } from './in-memory.database';

@Injectable()
export class InMemoryEntryRepository implements IEntryRepository {
  private db = InMemoryDatabase.getInstance();

  create(entry: SessionEntry): boolean {
    return !!this.db.entries.set(entry.id, entry);
  }

  findBySessionId(sessionId: string): SessionEntry[] {
    return Array.from(this.db.entries.values()).filter(
      (e) => e.sessionId === sessionId,
    );
  }

  findById(id: string): SessionEntry | undefined {
    return this.db.entries.get(id) || undefined;
  }

  update(entry: SessionEntry): boolean {
    return !!this.db.entries.set(entry.id, entry);
  }

  delete(id: string): boolean {
    return this.db.entries.delete(id);
  }
}
