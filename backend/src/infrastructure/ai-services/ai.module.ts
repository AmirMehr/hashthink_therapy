import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TRANSCRIPTION_SERVICE } from '../../core/interfaces/services/transcription.interface';
import { EMBEDDING_SERVICE } from '../../core/interfaces/services/embedding.interface';
import { SUMMARY_SERVICE } from '../../core/interfaces/services/summary.interface';
import { AssemblyAITranscriptionService } from './transcription/assemblyai-transcription.service';
import { MockTranscriptionService } from './transcription/mock-transcription.service';
import { OpenAIEmbeddingService } from './embedding/openai-embedding.service';
import { MockEmbeddingService } from './embedding/mock-embedding.service';
import { OpenAISummaryService } from './summary/openai-summary.service';
import { BasicSummaryService } from './summary/basic-summary.service';

@Module({
  providers: [
    {
      provide: TRANSCRIPTION_SERVICE,
      useFactory: (config: ConfigService) => {
        const type: string | undefined = config.get('TRANSCRIPTION_TYPE');
        if (type === 'ASSEMBLYAI') {
          const apiKey: string | undefined = config.get('ASSEMBLYAI_API_KEY');
          if (!apiKey) throw new Error('ASSEMBLYAI_API_KEY not set');
          return new AssemblyAITranscriptionService(apiKey);
        }
        return new MockTranscriptionService();
      },
      inject: [ConfigService],
    },
    {
      provide: EMBEDDING_SERVICE,
      useFactory: (config: ConfigService) => {
        const type: string | undefined = config.get('EMBEDDING_TYPE');
        if (type === 'OPENAI') {
          const apiKey: string | undefined = config.get('OPENAI_API_KEY');
          if (!apiKey) throw new Error('OPENAI_API_KEY not set');
          return new OpenAIEmbeddingService(apiKey);
        }
        return new MockEmbeddingService();
      },
      inject: [ConfigService],
    },
    {
      provide: SUMMARY_SERVICE,
      useFactory: (config: ConfigService) => {
        const type: string | undefined = config.get('SUMMARY_TYPE');
        if (type === 'OPENAI') {
          const apiKey: string | undefined = config.get('OPENAI_API_KEY');
          if (!apiKey) throw new Error('OPENAI_API_KEY not set');
          return new OpenAISummaryService(apiKey);
        }
        return new BasicSummaryService();
      },
      inject: [ConfigService],
    },
  ],
  exports: [TRANSCRIPTION_SERVICE, EMBEDDING_SERVICE, SUMMARY_SERVICE],
})
export class AiModule {}
