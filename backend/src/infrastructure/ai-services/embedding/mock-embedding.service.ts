import { Injectable } from '@nestjs/common';
import { IEmbeddingService } from '../../../core/interfaces/services/embedding.interface';

@Injectable()
export class MockEmbeddingService implements IEmbeddingService {
  async generate(text: string): Promise<number[]> {
    const seed = text.length;
    return Promise.resolve(
      Array.from({ length: 1536 }, (_, i) => Math.sin(seed + i) * 0.5),
    );
  }
}
