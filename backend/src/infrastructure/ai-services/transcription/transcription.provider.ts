import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TRANSCRIPTION_SERVICE } from '../../../core/interfaces/services/transcription.interface';
import { TranscriptionType } from '../../config/ai.config';
import { MockTranscriptionService } from './mock-transcription.service';
import { AssemblyAITranscriptionService } from './assemblyai-transcription.service';

export const transcriptionProvider: Provider = {
  provide: TRANSCRIPTION_SERVICE,
  useFactory: (configService: ConfigService) => {
    const type =
      configService.get<TranscriptionType>('TRANSCRIPTION_TYPE') ||
      TranscriptionType.MOCK;

    const assemblyAIApiKey = configService.get<string>('ASSEMBLYAI_API_KEY');
    switch (type) {
      case TranscriptionType.ASSEMBLYAI:
        if (!assemblyAIApiKey)
          throw new Error('ASSEMBLYAI_API_KEY not configured');
        return new AssemblyAITranscriptionService(assemblyAIApiKey);
      case TranscriptionType.MOCK:
      default:
        return new MockTranscriptionService();
    }
  },
  inject: [ConfigService],
};
