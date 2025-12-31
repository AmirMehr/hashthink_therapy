import { Module } from '@nestjs/common';
import { DatabaseModule } from '../infrastructure/database/database.module';
import { AiModule } from '../infrastructure/ai-services/ai.module';
import { CreateSessionUseCase } from '../core/use-cases/create-session.use-case';
import { ProcessTranscriptionUseCase } from '../core/use-cases/process-transcription.use-case';
import { GenerateSummaryUseCase } from '../core/use-cases/generate-summary.use-case';
import { GenerateEmbeddingUseCase } from '../core/use-cases/generate-embedding.use-case';
import { SearchSessionsUseCase } from '../core/use-cases/search-sessions.use-case';
import { HealthController } from 'src/controllers/health.controller';
import { SessionController } from 'src/controllers/session.controller';
import { SearchController } from 'src/controllers/search.controller';

@Module({
  imports: [DatabaseModule, AiModule],
  controllers: [HealthController, SessionController, SearchController],
  providers: [
    CreateSessionUseCase,
    ProcessTranscriptionUseCase,
    GenerateSummaryUseCase,
    GenerateEmbeddingUseCase,
    SearchSessionsUseCase,
  ],
})
export class PresentationModule {}
