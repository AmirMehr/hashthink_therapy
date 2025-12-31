import { Session } from 'src/core/domain/session.entity';

export interface ISessionRepository {
  create(session: Session): Promise<boolean> | boolean; // ← Returns true if created
  findById(id: string): Promise<Session | undefined> | Session | undefined;
  findAll(): Promise<Session[]> | Session[];
  update(session: Session): Promise<boolean> | boolean; // ← Returns true if updated
  delete(id: string): Promise<boolean> | boolean; // ← Returns true if deleted
}

export const SESSION_REPOSITORY = Symbol('ISessionRepository');
