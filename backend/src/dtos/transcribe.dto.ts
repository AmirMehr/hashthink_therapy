import { IsString } from 'class-validator';

export class TranscribeDto {
  @IsString()
  audioPath: string;
}
