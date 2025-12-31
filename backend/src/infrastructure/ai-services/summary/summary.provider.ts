import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { SUMMARY_SERVICE } from '../../../core/interfaces/services/summary.interface';
import { SummaryType } from '../../config/ai.config';
import { BasicSummaryService } from './basic-summary.service';
import { OpenAISummaryService } from './openai-summary.service';

export const summaryProvider: Provider = {
  provide: SUMMARY_SERVICE,
  useFactory: (configService: ConfigService) => {
    const type =
      configService.get<SummaryType>('SUMMARY_TYPE') || SummaryType.BASIC;

    const openAiApiKey = configService.get<string>('OPENAI_API_KEY');
    switch (type) {
      case SummaryType.OPENAI:
        if (!openAiApiKey) throw new Error('OPENAI_API_KEY not configured');
        return new OpenAISummaryService(openAiApiKey);
      case SummaryType.BASIC:
      default:
        return new BasicSummaryService();
    }
  },
  inject: [ConfigService],
};
