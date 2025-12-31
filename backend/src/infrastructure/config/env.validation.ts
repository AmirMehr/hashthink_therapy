import { plainToInstance } from 'class-transformer';
import { IsEnum, IsOptional, IsString, validateSync } from 'class-validator';
import { TranscriptionType, EmbeddingType, SummaryType } from './ai.config';

class EnvironmentVariables {
  @IsOptional()
  @IsString()
  PORT?: string;

  @IsOptional()
  @IsEnum(TranscriptionType)
  TRANSCRIPTION_TYPE?: TranscriptionType;

  @IsOptional()
  @IsEnum(EmbeddingType)
  EMBEDDING_TYPE?: EmbeddingType;

  @IsOptional()
  @IsEnum(SummaryType)
  SUMMARY_TYPE?: SummaryType;

  @IsOptional()
  @IsString()
  ASSEMBLYAI_API_KEY?: string;

  @IsOptional()
  @IsString()
  OPENAI_API_KEY?: string;
}

export function envValidation(config: Record<string, unknown>) {
  const validatedConfig = plainToInstance(EnvironmentVariables, config, {
    enableImplicitConversion: true,
  });

  const errors = validateSync(validatedConfig, {
    skipMissingProperties: false,
  });

  if (errors.length > 0) {
    throw new Error(errors.toString());
  }

  return validatedConfig;
}
