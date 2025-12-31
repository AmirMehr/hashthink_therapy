import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CreateSessionDto } from '../dtos/create-session.dto';

import { Inject } from '@nestjs/common';
import { CreateSessionUseCase } from 'src/core/use-cases/create-session.use-case';
import { ProcessTranscriptionUseCase } from 'src/core/use-cases/process-transcription.use-case';
import { GenerateSummaryUseCase } from 'src/core/use-cases/generate-summary.use-case';
import { GenerateEmbeddingUseCase } from 'src/core/use-cases/generate-embedding.use-case';
import { SESSION_REPOSITORY } from 'src/core/interfaces/repositories/session-repository.interface';
import type { ISessionRepository } from 'src/core/interfaces/repositories/session-repository.interface';
import {
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { AudioFileValidator } from 'src/validators/audio-file.validator';

@Controller('sessions')
export class SessionController {
  constructor(
    private readonly createSessionUseCase: CreateSessionUseCase,
    private readonly processTranscriptionUseCase: ProcessTranscriptionUseCase,
    private readonly generateSummaryUseCase: GenerateSummaryUseCase,
    private readonly generateEmbeddingUseCase: GenerateEmbeddingUseCase,
    @Inject(SESSION_REPOSITORY)
    private readonly sessionRepo: ISessionRepository,
  ) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(@Body() dto: CreateSessionDto) {
    const sessionId = await this.createSessionUseCase.execute(
      dto.therapistId,
      dto.clientId,
      new Date(dto.startTime),
    );
    return { sessionId };
  }

  @Post(':id/transcribe')
  @UseInterceptors(
    FileInterceptor('audio', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const uniqueSuffix =
            Date.now() + '-' + Math.round(Math.random() * 1e9);
          cb(null, `audio-${uniqueSuffix}${extname(file.originalname)}`);
        },
      }),
    }),
  )
  async transcribe(
    @Param('id') id: string,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 100 * 1024 * 1024 }), // 100MB
          new AudioFileValidator(),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log('📁 File uploaded:', file.filename);
    console.log('📂 File path:', file.path);
    console.log('🎯 Session ID:', id);
    const entriesCreated = await this.processTranscriptionUseCase.execute(
      id,
      file.path,
    );

    console.log('✅ Entries created:', entriesCreated);
    return {
      success: true,
      entriesCreated,
      message: `Successfully transcribed audio and created ${entriesCreated} entries`,
      filename: file.filename,
    };
  }

  @Post(':id/summary')
  async getSummary(@Param('id') id: string) {
    const summary = await this.generateSummaryUseCase.execute(id);
    return { summary };
  }

  @Post(':id/embed')
  async embed(@Param('id') id: string) {
    const embedding = await this.generateEmbeddingUseCase.execute(id);
    return { embeddingLength: embedding.length };
  }

  @Get(':id')
  async getSession(@Param('id') id: string) {
    const session = await this.sessionRepo.findById(id);
    if (!session) {
      return { error: 'Session not found' };
    }
    return session;
  }

  @Get()
  async getAllSessions() {
    const sessions = await this.sessionRepo.findAll();
    console.log('📋 Fetching all sessions. Count:', sessions.length);
    return sessions;
  }
}
