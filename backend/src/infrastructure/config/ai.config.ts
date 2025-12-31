export enum TranscriptionType {
  MOCK = 'MOCK',
  ASSEMBLYAI = 'ASSEMBLYAI',
}

export enum EmbeddingType {
  MOCK = 'MOCK',
  OPENAI = 'OPENAI',
}

export enum SummaryType {
  BASIC = 'BASIC',
  OPENAI = 'OPENAI',
}

export interface AiConfig {
  transcriptionType: TranscriptionType;
  embeddingType: EmbeddingType;
  summaryType: SummaryType;
  assemblyAiApiKey?: string;
  openaiApiKey?: string;
}

export const getAiConfig = (): AiConfig => ({
  transcriptionType:
    (process.env.TRANSCRIPTION_TYPE as TranscriptionType) ||
    TranscriptionType.MOCK,
  embeddingType:
    (process.env.EMBEDDING_TYPE as EmbeddingType) || EmbeddingType.MOCK,
  summaryType: (process.env.SUMMARY_TYPE as SummaryType) || SummaryType.BASIC,
  assemblyAiApiKey: process.env.ASSEMBLYAI_API_KEY,
  openaiApiKey: process.env.OPENAI_API_KEY,
});
