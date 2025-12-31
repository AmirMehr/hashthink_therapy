import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { randomUUID } from 'crypto';
import { SessionEntry, Speaker } from '../domain/session-entry.entity';
import { SESSION_REPOSITORY } from '../interfaces/repositories/session-repository.interface';
import type { ISessionRepository } from '../interfaces/repositories/session-repository.interface';
import { ENTRY_REPOSITORY } from '../interfaces/repositories/entry-repository.interface';
import type { IEntryRepository } from '../interfaces/repositories/entry-repository.interface';
import { TRANSCRIPTION_SERVICE } from '../interfaces/services/transcription.interface';
import type { ITranscriptionService } from '../interfaces/services/transcription.interface';

@Injectable()
export class ProcessTranscriptionUseCase {
  constructor(
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepo: ISessionRepository,
    @Inject(ENTRY_REPOSITORY)
    private readonly entryRepo: IEntryRepository,
    @Inject(TRANSCRIPTION_SERVICE)
    private readonly transcriptionSvc: ITranscriptionService,
  ) {}

  async execute(sessionId: string, audioPath: string): Promise<number> {
    const session = await this.sessionRepo.findById(sessionId);
    if (!session) {
      throw new NotFoundException(`Session ${sessionId} not found`);
    }

    const segments = await this.transcriptionSvc.transcribe(audioPath);

    for (const segment of segments) {
      const speaker = this.mapSpeaker(segment.speaker);
      const entry = new SessionEntry(
        randomUUID(),
        sessionId,
        speaker,
        segment.text,
        new Date(),
        { start: segment.start, end: segment.end },
      );

      await this.entryRepo.create(entry);
      session.addEntry(entry);
    }

    await this.sessionRepo.update(session);
    return segments.length;
  }

  private mapSpeaker(label: string): Speaker {
    const normalized = label.toUpperCase();
    if (normalized.includes('THERAPIST') || normalized === 'A') {
      return Speaker.THERAPIST;
    }
    return Speaker.PATIENT;
  }
}
