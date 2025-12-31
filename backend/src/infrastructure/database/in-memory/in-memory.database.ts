import { Session } from '../../../core/domain/session.entity';
import { SessionEntry } from '../../../core/domain/session-entry.entity';

export class InMemoryDatabase {
  private static instance: InMemoryDatabase;

  public sessions: Map<string, Session> = new Map();
  public entries: Map<string, SessionEntry> = new Map();

  private constructor() {}

  static getInstance(): InMemoryDatabase {
    if (!InMemoryDatabase.instance) {
      InMemoryDatabase.instance = new InMemoryDatabase();
    }
    return InMemoryDatabase.instance;
  }

  reset(): void {
    this.sessions.clear();
    this.entries.clear();
  }
}
