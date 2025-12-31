import { Module } from '@nestjs/common';
import { SESSION_REPOSITORY } from '../../core/interfaces/repositories/session-repository.interface';
import { ENTRY_REPOSITORY } from '../../core/interfaces/repositories/entry-repository.interface';
import { InMemorySessionRepository } from './in-memory/in-memory-session.repository';
import { InMemoryEntryRepository } from './in-memory/in-memory-entry.repository';

@Module({
  providers: [
    {
      provide: SESSION_REPOSITORY,
      useClass: InMemorySessionRepository,
    },
    {
      provide: ENTRY_REPOSITORY,
      useClass: InMemoryEntryRepository,
    },
  ],
  exports: [SESSION_REPOSITORY, ENTRY_REPOSITORY],
})
export class DatabaseModule {}
