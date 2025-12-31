import { IsString, IsDateString } from 'class-validator';

export class CreateSessionDto {
  @IsString()
  therapistId: string;

  @IsString()
  clientId: string;

  @IsDateString()
  startTime: string;
}
