export function normalizeText(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '');
}

export function hasAnyKeyword(text: string, keywords: string[]): boolean {
  const normalized = normalizeText(text);
  return keywords.some((keyword) => normalized.includes(normalizeText(keyword)));
}
