import { Injectable, Inject, NotFoundException } from '@nestjs/common';

import { SESSION_REPOSITORY } from '../interfaces/repositories/session-repository.interface';
import type { ISessionRepository } from '../interfaces/repositories/session-repository.interface';

import { EMBEDDING_SERVICE } from '../interfaces/services/embedding.interface';
import type { IEmbeddingService } from '../interfaces/services/embedding.interface';

@Injectable()
export class GenerateEmbeddingUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepo: ISessionRepository,
    @Inject(EMBEDDING_SERVICE)
    private readonly embeddingSvc: IEmbeddingService,
  ) {}

  async execute(sessionId: string): Promise<number[]> {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) {
      throw new NotFoundException(`Session ${sessionId} not found`);
    }

    const text = session.summary || session.getAllEntriesText();
    const embedding = await this.embeddingSvc.generate(text);

    session.setEmbedding(embedding);
    await this.sessionRepo.update(session);

    return embedding;
  }
}
