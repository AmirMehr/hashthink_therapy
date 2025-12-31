import { Injectable } from '@nestjs/common';
import { Session } from '../../../core/domain/session.entity';
import { ISessionRepository } from '../../../core/interfaces/repositories/session-repository.interface';
import { InMemoryDatabase } from './in-memory.database';

@Injectable()
export class InMemorySessionRepository implements ISessionRepository {
  private db = InMemoryDatabase.getInstance();

  create(session: Session): Promise<boolean> | boolean {
    return !!this.db.sessions.set(session.id, session);
  }

  findById(id: string): Promise<Session | undefined> | Session | undefined {
    return this.db.sessions.get(id) || undefined;
  }

  findAll(): Promise<Session[]> | Session[] {
    return Array.from(this.db.sessions.values());
  }

  update(session: Session): Promise<boolean> | boolean {
    return !!this.db.sessions.set(session.id, session);
  }

  delete(id: string): Promise<boolean> | boolean {
    return this.db.sessions.delete(id);
  }
}
