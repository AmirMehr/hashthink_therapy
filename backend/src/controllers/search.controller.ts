import {
  BadRequestException,
  Controller,
  Get,
  InternalServerErrorException,
  Query,
} from '@nestjs/common';
import {
  SearchResult,
  SearchSessionsUseCase,
} from 'src/core/use-cases/search-sessions.use-case';

@Controller('search')
export class SearchController {
  constructor(private readonly searchSessionsUseCase: SearchSessionsUseCase) {}

  @Get()
  async search(@Query('q') query?: string): Promise<SearchResult[]> {
    if (!query) {
      throw new BadRequestException("Query parameter 'q' is required");
    }

    try {
      const results: SearchResult[] =
        await this.searchSessionsUseCase.execute(query);
      return results;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      throw new InternalServerErrorException(message);
    }
  }
}
