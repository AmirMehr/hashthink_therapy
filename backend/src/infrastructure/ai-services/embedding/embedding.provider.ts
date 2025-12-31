import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EMBEDDING_SERVICE } from '../../../core/interfaces/services/embedding.interface';
import { EmbeddingType } from '../../config/ai.config';
import { MockEmbeddingService } from './mock-embedding.service';
import { OpenAIEmbeddingService } from './openai-embedding.service';

export const embeddingProvider: Provider = {
  provide: EMBEDDING_SERVICE,
  useFactory: (configService: ConfigService) => {
    const type =
      configService.get<EmbeddingType>('EMBEDDING_TYPE') || EmbeddingType.MOCK;

    const openAiApiKey = configService.get<string>('OPENAI_API_KEY');
    switch (type) {
      case EmbeddingType.OPENAI:
        if (!openAiApiKey) throw new Error('OPENAI_API_KEY not configured');
        return new OpenAIEmbeddingService(openAiApiKey);
      case EmbeddingType.MOCK:
      default:
        return new MockEmbeddingService();
    }
  },
  inject: [ConfigService],
};
