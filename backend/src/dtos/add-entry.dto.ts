import { IsString, IsEnum, IsOptional, IsObject } from 'class-validator';
import { Speaker } from 'src/core/domain/session-entry.entity';

export class AddEntryDto {
  @IsEnum(Speaker)
  speaker: Speaker;

  @IsString()
  text: string;

  @IsOptional()
  @IsObject()
  metadata?: Record<string, any>;
}
