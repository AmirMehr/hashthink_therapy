import OpenAI from 'openai';
import { ISummaryService } from '../../../core/interfaces/services/summary.interface';

export class OpenAISummaryService implements ISummaryService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async summarize(text: string): Promise<string> {
    const response = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content:
            'You are a professional therapist assistant. Summarize therapy sessions concisely.',
        },
        {
          role: 'user',
          content: `Summarize this therapy session:\n\n${text}`,
        },
      ],
      max_tokens: 500,
    });

    return response.choices[0].message.content || 'No summary generated';
  }
}
