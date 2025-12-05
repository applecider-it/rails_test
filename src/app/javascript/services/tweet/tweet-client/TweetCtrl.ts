import axios from 'axios';

import {jsonRequestHeaders} from '@/services/api/http';

/**
 * Tweet管理
 */
export default class TweetCtrl {
  user;

  constructor(user) {
    this.user = user;
  }

  /** 新しいツイート送信 */
  async sendTweet(content) {
    const headers = jsonRequestHeaders();

    const response = await axios.post(
      '/tweets',
      { content, commit: true },
      {
        headers: headers,
      }
    );
    console.log('response.data', response.data);
    return response.data;
  }

  /** 一覧取得 */
  async getList() {
    const headers = jsonRequestHeaders();

    const response = await axios.get(
      '/tweets',
      {
        headers: headers,
      }
    );

    return response.data;
  }
}
