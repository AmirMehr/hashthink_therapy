import { Injectable } from '@nestjs/common';
import { ISummaryService } from '../../../core/interfaces/services/summary.interface';

@Injectable()
export class BasicSummaryService implements ISummaryService {
  async summarize(text: string): Promise<string> {
    const lines = text.split('\n').filter((l) => l.trim());
    const preview = lines.slice(0, 3).join(' ');
    return Promise.resolve(
      `Session with ${lines.length} entries. Preview: ${preview.substring(0, 200)}...`,
    );
  }
}
