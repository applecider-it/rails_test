import axios from 'axios';

import { jsonRequestHeaders, getApiUrl } from '@/services/api/http';

/** 一覧取得 */
export async function getList() {
  const headers = jsonRequestHeaders();

  const url = getApiUrl('/tweets/index');

  const response = await axios.get(url, {
    headers: headers,
  });

  return response.data;
}
