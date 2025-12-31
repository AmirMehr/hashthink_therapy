import { SessionEntry } from './session-entry.entity';

export class Session {
  id: string;
  therapistId: string;
  clientId: string;
  startTime: Date;
  endTime?: Date;
  entries: SessionEntry[];
  summary?: string;
  embedding?: number[];

  constructor(
    id: string,
    therapistId: string,
    clientId: string,
    startTime: Date,
    entries: SessionEntry[] = [],
    endTime?: Date,
    summary?: string,
    embedding?: number[],
  ) {
    this.id = id;
    this.therapistId = therapistId;
    this.clientId = clientId;
    this.startTime = startTime;
    this.entries = entries;
    this.endTime = endTime;
    this.summary = summary;
    this.embedding = embedding;
  }

  addEntry(entry: SessionEntry): void {
    this.entries.push(entry);
  }

  setSummary(summary: string): void {
    this.summary = summary;
  }

  setEmbedding(embedding: number[]): void {
    this.embedding = embedding;
  }

  getAllEntriesText(): string {
    return this.entries.map((e) => `${e.speaker}: ${e.text}`).join('\n');
  }
}
