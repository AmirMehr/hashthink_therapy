export enum Speaker {
  THERAPIST = "THERAPIST",
  PATIENT = "PATIENT",
}

export interface SessionEntry {
  speaker: Speaker;
  content: string;
  timestamp?: string;
  metadata?: Record<string, string | number | boolean | null>;
}

export interface Session {
  id?: string; // Backend uses 'id'
  sessionId: string;
  therapistId: string;
  clientId: string;
  startTime: string;
  endTime?: string;
  summary?: string;
  embedding?: number[];
  entries: SessionEntry[];
}

export interface SearchResult {
  sessionId: string;
  therapistId: string;
  clientId: string;
  startTime: string;
  score: number;
}

// Type guard for error responses
export interface ErrorResponse {
  error: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isErrorResponse(data: any): data is ErrorResponse {
  return "error" in data && typeof data.error === "string";
}
