import { Injectable, Inject } from '@nestjs/common';

import { SESSION_REPOSITORY } from '../interfaces/repositories/session-repository.interface';
import type { ISessionRepository } from '../interfaces/repositories/session-repository.interface';
import { EMBEDDING_SERVICE } from '../interfaces/services/embedding.interface';
import type { IEmbeddingService } from '../interfaces/services/embedding.interface';

export interface SearchResult {
  sessionId: string;
  score: number;
  therapistId: string;
  clientId: string;
  startTime: Date;
}

@Injectable()
export class SearchSessionsUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepo: ISessionRepository,
    @Inject(EMBEDDING_SERVICE)
    private readonly embeddingSvc: IEmbeddingService,
  ) {}

  async execute(query: string): Promise<SearchResult[]> {
    const queryVec = await this.embeddingSvc.generate(query);
    const allSessions = await this.sessionRepo.findAll();

    const results = allSessions
      .filter((s) => s.embedding && s.embedding.length > 0)
      .map((s) => ({
        sessionId: s.id,
        score: this.cosineSimilarity(queryVec, s.embedding!),
        therapistId: s.therapistId,
        clientId: s.clientId,
        startTime: s.startTime,
      }))
      .sort((a, b) => b.score - a.score);

    return results;
  }

  private cosineSimilarity(a: number[], b: number[]): number {
    if (a.length !== b.length) return 0;

    let dotProduct = 0;
    let normA = 0;
    let normB = 0;

    for (let i = 0; i < a.length; i++) {
      dotProduct += a[i] * b[i];
      normA += a[i] * a[i];
      normB += b[i] * b[i];
    }

    const denominator = Math.sqrt(normA) * Math.sqrt(normB);
    return denominator === 0 ? 0 : dotProduct / denominator;
  }
}
