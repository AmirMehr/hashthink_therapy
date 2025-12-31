export const TRANSCRIPTION_SERVICE = 'TRANSCRIPTION_SERVICE';

export interface TranscribedSegment {
  speaker: string;
  text: string;
  start: number;
  end: number;
}

export interface ITranscriptionService {
  transcribe(audioPath: string): Promise<TranscribedSegment[]>;
}
