import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PresentationModule } from './presentation/presentation.module';
import { DatabaseModule } from './infrastructure/database/database.module';
import { AiModule } from './infrastructure/ai-services/ai.module';
import { envValidation } from './infrastructure/config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validate: envValidation,
    }),
    DatabaseModule,
    AiModule,
    PresentationModule,
  ],
})
export class AppModule {}
