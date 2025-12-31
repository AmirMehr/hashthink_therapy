import OpenAI from 'openai';
import { IEmbeddingService } from '../../../core/interfaces/services/embedding.interface';

export class OpenAIEmbeddingService implements IEmbeddingService {
  private client: OpenAI;

  constructor(apiKey: string) {
    this.client = new OpenAI({ apiKey });
  }

  async generate(text: string): Promise<number[]> {
    const response = await this.client.embeddings.create({
      model: 'text-embedding-3-small',
      input: text,
    });

    return response.data[0].embedding;
  }
}
