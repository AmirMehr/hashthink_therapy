import { SessionEntry } from 'src/core/domain/session-entry.entity';

export interface IEntryRepository {
  create(entry: SessionEntry): Promise<boolean> | boolean; // ← Returns true if added
  findBySessionId(sessionId: string): Promise<SessionEntry[]> | SessionEntry[];
  findById(
    id: string,
  ): Promise<SessionEntry | undefined> | SessionEntry | undefined;
  update(entry: SessionEntry): Promise<boolean> | boolean;
  delete(id: string): Promise<boolean> | boolean; // ← Returns true if deleted
}

// import { SessionEntry } from '../../domain/session-entry.entity';

// export interface IEntryRepository {
//   create(entry: SessionEntry): Promise<void>;
//   findBySessionId(sessionId: string): Promise<SessionEntry[]>;
//   findById(id: string): Promise<SessionEntry | null>;
//   update(entry: SessionEntry): Promise<void>;
//   delete(id: string): Promise<void>;
// }

export const ENTRY_REPOSITORY = Symbol('IEntryRepository');
