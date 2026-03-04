/**
 * HTML関連
 */

/** HTMLエスケープ */
export function escapeHtml(str) {
  str = String(str);
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * METAタグ内のJSONデータを返す。
 */
export function getMetaJson(name: string) {
  const meta = document.querySelector(`meta[name="${name}"]`) as HTMLElement;

  if (meta) {
    const json = meta.dataset.json;
    const arr = JSON.parse(json);

    return arr;
  }

  return null;
}
