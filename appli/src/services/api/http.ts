/**
 * APIのhttp関連
 */

/** JSON通信用のヘッダー */
export function jsonRequestHeaders() {
  const headers = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  return headers;
}

/** URL取得 */
export function getApiUrl(path: string) {
  return `http://localhost:3000/api/appli${path}`;
}
