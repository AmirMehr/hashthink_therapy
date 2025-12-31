export enum Speaker {
  THERAPIST = 'THERAPIST',
  PATIENT = 'PATIENT',
}

export class SessionEntry {
  id: string;
  sessionId: string;
  speaker: Speaker;
  text: string;
  timestamp: Date;
  metadata?: Record<string, any>;

  constructor(
    id: string,
    sessionId: string,
    speaker: Speaker,
    text: string,
    timestamp: Date,
    metadata?: Record<string, any>,
  ) {
    this.id = id;
    this.sessionId = sessionId;
    this.speaker = speaker;
    this.text = text;
    this.timestamp = timestamp;
    this.metadata = metadata;
  }
}
