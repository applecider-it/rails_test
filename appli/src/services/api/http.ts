import { Capacitor } from '@capacitor/core';

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
  const host = (Capacitor.getPlatform() === 'android') ?
    '10.0.2.2:3000' : '127.0.0.1:3000'

  const url = `http://${host}/api/appli${path}`;

  return url;
}
