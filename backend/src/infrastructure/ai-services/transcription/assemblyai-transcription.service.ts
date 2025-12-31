import { AssemblyAI } from 'assemblyai';
import {
  ITranscriptionService,
  TranscribedSegment,
} from 'src/core/interfaces/services/transcription.interface';
import * as fs from 'fs';

export class AssemblyAITranscriptionService implements ITranscriptionService {
  private client: AssemblyAI;

  constructor(apiKey: string) {
    this.client = new AssemblyAI({ apiKey });
  }

  async transcribe(audioPath: string): Promise<TranscribedSegment[]> {
    // Check if audioPath is a local file or URL
    let audioUrl: string;

    if (audioPath.startsWith('http://') || audioPath.startsWith('https://')) {
      // It's already a URL
      audioUrl = audioPath;
    } else {
      // It's a local file - upload it first
      const audioData = fs.readFileSync(audioPath);
      audioUrl = await this.client.files.upload(audioData);
    }

    // Transcribe with speaker diarization
    const transcript = await this.client.transcripts.transcribe({
      audio: audioUrl,
      speaker_labels: true, // Enable diarization
    });

    if (transcript.status === 'error') {
      throw new Error(`Transcription failed: ${transcript.error}`);
    }

    const entries: TranscribedSegment[] = [];
    const utterances = transcript.utterances || [];

    for (const utterance of utterances) {
      entries.push({
        speaker: utterance.speaker,
        text: utterance.text,
        start: utterance.start,
        end: utterance.end,
      });
    }

    return entries;
  }
}
