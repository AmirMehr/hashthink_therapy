import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import type { ISessionRepository } from '../interfaces/repositories/session-repository.interface';
import { SESSION_REPOSITORY } from '../interfaces/repositories/session-repository.interface';
import type { ISummaryService } from '../interfaces/services/summary.interface';
import { SUMMARY_SERVICE } from '../interfaces/services/summary.interface';

@Injectable()
export class GenerateSummaryUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepo: ISessionRepository,
    @Inject(SUMMARY_SERVICE)
    private readonly summarySvc: ISummaryService,
  ) {}

  async execute(sessionId: string): Promise<string> {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) {
      throw new NotFoundException(`Session ${sessionId} not found`);
    }

    const fullText = session.getAllEntriesText();
    const summary = await this.summarySvc.summarize(fullText);

    session.setSummary(summary);
    await this.sessionRepo.update(session);

    return summary;
  }
}
