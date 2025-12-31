import { Injectable, Inject } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { Session } from '../domain/session.entity';

import { SESSION_REPOSITORY } from '../interfaces/repositories/session-repository.interface';
import type { ISessionRepository } from '../interfaces/repositories/session-repository.interface';

@Injectable()
export class CreateSessionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepo: ISessionRepository,
  ) {}

  async execute(
    therapistId: string,
    clientId: string,
    startTime: Date,
  ): Promise<string> {
    const sessionId = randomUUID();
    const session = new Session(sessionId, therapistId, clientId, startTime);
    await this.sessionRepo.create(session);
    return sessionId;
  }
}
