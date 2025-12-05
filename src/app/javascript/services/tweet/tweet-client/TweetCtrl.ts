import axios from 'axios';

import { jsonRequestHeaders } from '@/services/api/http';

/**
 * Tweet管理
 */
export default class TweetCtrl {
  user;

  constructor(user) {
    this.user = user;
  }

  /**
   * 新しいツイート送信
   * 
   * @param isCommit trueの場合は確定。falseだと確認のみ。
   */
  async sendTweet(content, isCommit: boolean) {
    const headers = jsonRequestHeaders();

    const data: any = { content };
    if (isCommit) {
      data.commit = true;
    } else {
      data.confirm = true;
    }

    const response = await axios.post('/tweets', data, {
      headers: headers,
    });
    console.log('response.data', response.data);
    return response.data;
  }

  /**
   * ツイートの更新を送信
   * 
   * @param isCommit trueの場合は確定。falseだと確認のみ。
   */
  async putTweet(id: number, content, isCommit: boolean) {
    const headers = jsonRequestHeaders();

    const data: any = { content };
    if (isCommit) {
      data.commit = true;
    } else {
      data.confirm = true;
    }

    const response = await axios.put(`/tweets/${id}`, data, {
      headers: headers,
    });
    console.log('response.data', response.data);
    return response.data;
  }

  /** ツイート取得 */
  async getTweet(id) {
    const headers = jsonRequestHeaders();

    const response = await axios.get(`/tweets/${id}`, {
      headers: headers,
    });

    return response.data;
  }

  /** 一覧取得 */
  async getList() {
    const headers = jsonRequestHeaders();

    const response = await axios.get('/tweets', {
      headers: headers,
    });

    return response.data;
  }

  /**
   * ツイート削除送信
   */
  async deleteTweet(id: number) {
    const headers = jsonRequestHeaders();

    const response = await axios.delete(`/tweets/${id}`, {
      headers: headers,
    });
    console.log('response.data', response.data);
    return response.data;
  }

}
