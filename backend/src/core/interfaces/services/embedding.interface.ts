export interface IEmbeddingService {
  generate(text: string): Promise<number[]>;
}

export const EMBEDDING_SERVICE = Symbol('IEmbeddingService');
