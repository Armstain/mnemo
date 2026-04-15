import { ContextDump } from '@/hooks/use-context-store';

const K1 = 1.5;
const B = 0.75;

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter((t) => t.length > 1);
}

function termFrequency(term: string, tokens: string[]): number {
  let count = 0;
  for (const t of tokens) {
    if (t === term) count++;
  }
  return count;
}

/**
 * Rank documents by BM25 score against the given query.
 * Returns all documents when the query is empty (preserving original order).
 */
export function bm25Search(query: string, documents: ContextDump[]): ContextDump[] {
  if (!query.trim()) return documents;

  const queryTerms = tokenize(query);
  if (queryTerms.length === 0) return documents;

  const docTokens = documents.map((doc) =>
    tokenize(`${doc.title} ${doc.notes}`)
  );

  const N = documents.length;
  const avgdl =
    docTokens.reduce((sum, tokens) => sum + tokens.length, 0) / (N || 1);

  const idf = (term: string): number => {
    const ni = docTokens.filter((tokens) => tokens.includes(term)).length;
    return Math.log((N - ni + 0.5) / (ni + 0.5) + 1);
  };

  const scored = documents.map((doc, i) => {
    const tokens = docTokens[i];
    const dl = tokens.length;
    let score = 0;

    for (const term of queryTerms) {
      const tf = termFrequency(term, tokens);
      if (tf === 0) continue;
      const termIdf = idf(term);
      score +=
        termIdf *
        ((tf * (K1 + 1)) / (tf + K1 * (1 - B + B * (dl / avgdl))));
    }

    return { doc, score };
  });

  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .map(({ doc }) => doc);
}
