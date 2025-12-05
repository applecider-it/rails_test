import axios from 'axios';

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
    const token = document
      .querySelector('meta[name="csrf-token"]')
      ?.getAttribute('content');

    const response = await axios.post(
      '/tweets',
      { content, commit: true },
      {
        headers: {
          'X-CSRF-Token': token,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('response.data', response.data);
    return response.data;
  }

  /** 一覧取得 */
  async getList() {
    const response = await axios.get(
      '/tweets',
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );

    return response.data;
  }
}
