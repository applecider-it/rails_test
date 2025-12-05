/**
 * APIのhttp関連
 */

/** JSON通信用のヘッダー */
export function jsonRequestHeaders () {
  const token = document
  .querySelector('meta[name="csrf-token"]')
  ?.getAttribute('content');

  const headers = {
    'X-CSRF-Token': token,
    Accept: 'application/json',
    'Content-Type': 'application/json',
  }

  return headers;
}