import { Injectable } from '@nestjs/common';
import {
  ITranscriptionService,
  TranscribedSegment,
} from '../../../core/interfaces/services/transcription.interface';

@Injectable()
export class MockTranscriptionService implements ITranscriptionService {
  transcribe(_audioPath: string): Promise<TranscribedSegment[]> {
    void _audioPath;
    return Promise.resolve([
      {
        text: 'Hello, how are you feeling today?',
        speaker: 'THERAPIST',
        start: 0,
        end: 3000,
      },
      {
        text: 'I have been feeling anxious lately.',
        speaker: 'PATIENT',
        start: 3500,
        end: 7000,
      },
      {
        text: 'Can you tell me more about that?',
        speaker: 'THERAPIST',
        start: 7500,
        end: 10000,
      },
    ]);
  }
}
