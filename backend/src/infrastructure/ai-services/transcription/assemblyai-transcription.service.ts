import { AssemblyAI } from 'assemblyai';
import {
  ITranscriptionService,
  TranscribedSegment,
} from '../../../core/interfaces/services/transcription.interface';

export class AssemblyAITranscriptionService implements ITranscriptionService {
  private client: AssemblyAI;

  constructor(apiKey: string) {
    this.client = new AssemblyAI({ apiKey });
  }

  async transcribe(audioPath: string): Promise<TranscribedSegment[]> {
    const transcript = await this.client.transcripts.transcribe({
      audio: audioPath,
      speaker_labels: true,
    });

    if (transcript.status === 'error') {
      throw new Error(`Transcription failed: ${transcript.error}`);
    }

    const segments: TranscribedSegment[] = [];

    if (transcript.utterances) {
      for (const utterance of transcript.utterances) {
        segments.push({
          speaker: utterance.speaker, // "A" or "B"
          text: utterance.text,
          start: utterance.start,
          end: utterance.end,
        });
      }
    }

    return segments;
  }
}
