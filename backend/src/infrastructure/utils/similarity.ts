/**
 * Calculates the cosine similarity between two numeric vectors.
 *
 * Cosine similarity measures how close two vectors are in direction,
 * regardless of their magnitude. It is commonly used in semantic search
 * and Retrieval-Augmented Generation (RAG) systems to compare text embeddings.
 *
 * Return values:
 * - 1.0   → vectors are identical in direction
 * - 0.0   → vectors are unrelated
 * - -1.0  → vectors are opposite in direction
 *
 * @param a - First embedding vector
 * @param b - Second embedding vector
 * @returns A number representing semantic similarity between the vectors
 * @throws Error if vectors have different lengths
 */
export function cosineSimilarity(a: number[], b: number[]): number {
  if (a.length !== b.length) {
    throw new Error('Vector length mismatch');
  }

  let dot = 0;
  let magA = 0;
  let magB = 0;

  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    magA += a[i] * a[i];
    magB += b[i] * b[i];
  }

  return dot / (Math.sqrt(magA) * Math.sqrt(magB));
}
