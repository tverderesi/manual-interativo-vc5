export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

export function tokenizeText(value: string): string[] {
  return normalizeText(value).split(' ').filter(Boolean);
}

export function hasAnyKeyword(text: string, keywords: string[]): boolean {
  const normalized = normalizeText(text);
  return keywords.some((keyword) => normalized.includes(normalizeText(keyword)));
}

function levenshteinDistance(a: string, b: string): number {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const dp = Array.from({ length: a.length + 1 }, () => new Array<number>(b.length + 1).fill(0));

  for (let i = 0; i <= a.length; i += 1) dp[i][0] = i;
  for (let j = 0; j <= b.length; j += 1) dp[0][j] = j;

  for (let i = 1; i <= a.length; i += 1) {
    for (let j = 1; j <= b.length; j += 1) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + cost
      );
    }
  }

  return dp[a.length][b.length];
}

function similarityScore(a: string, b: string): number {
  const maxLength = Math.max(a.length, b.length);
  if (maxLength === 0) return 1;
  const distance = levenshteinDistance(a, b);
  return 1 - distance / maxLength;
}

export function keywordScore(text: string, keyword: string): number {
  const normalizedText = normalizeText(text);
  const normalizedKeyword = normalizeText(keyword);

  if (!normalizedText || !normalizedKeyword) return 0;
  if (normalizedText.includes(normalizedKeyword)) return 1;

  const tokens = tokenizeText(normalizedText);
  const keywordTokens = tokenizeText(normalizedKeyword);

  let best = 0;

  for (const keywordToken of keywordTokens) {
    for (const token of tokens) {
      const score = similarityScore(token, keywordToken);
      if (score > best) best = score;
    }
  }

  return best;
}

export function fuzzyMatchAny(text: string, keywords: string[], threshold = 0.82): boolean {
  return keywords.some((keyword) => keywordScore(text, keyword) >= threshold);
}
