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
    console.log('🎤 Starting transcription for:', audioPath);

    let audioUrl: string;

    if (audioPath.startsWith('http://') || audioPath.startsWith('https://')) {
      audioUrl = audioPath;
      console.log('🌐 Using URL:', audioUrl);
    } else {
      console.log('📤 Uploading local file...');
      const audioData = fs.readFileSync(audioPath);
      console.log(
        '📊 File size:',
        (audioData.length / 1024 / 1024).toFixed(2),
        'MB',
      );
      audioUrl = await this.client.files.upload(audioData);
      console.log('✅ File uploaded to AssemblyAI:', audioUrl);
    }

    console.log('🔄 Requesting transcription with diarization...');
    const transcript = await this.client.transcripts.transcribe({
      audio: audioUrl,
      speaker_labels: true,
    });

    console.log('📝 Transcription status:', transcript.status);

    if (transcript.status === 'error') {
      throw new Error(`Transcription failed: ${transcript.error}`);
    }

    const entries: TranscribedSegment[] = [];
    const utterances = transcript.utterances || [];

    console.log('🎙️ Utterances found:', utterances.length);

    for (const utterance of utterances) {
      entries.push({
        speaker: utterance.speaker,
        text: utterance.text,
        start: utterance.start,
        end: utterance.end,
      });
    }

    console.log('✅ Transcription complete. Segments created:', entries.length);
    return entries;
  }
}
