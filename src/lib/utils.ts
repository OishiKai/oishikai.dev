export function formatDate(date: Date): string {
  return date.toLocaleDateString('ja-JP', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function formatDateISO(date: Date): string {
  return date.toISOString().split('T')[0];
}

export const SITE_TITLE = 'oishikai.dev';
export const SITE_DESCRIPTION = 'フロントエンドエンジニアのポートフォリオ＆技術ブログ';
export const SITE_URL = 'https://oishikai.dev';
export const POSTS_PER_PAGE = 6;
