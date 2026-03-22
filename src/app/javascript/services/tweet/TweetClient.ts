import WebSocketCtrl from './tweet-client/WebSocketCtrl';
import TweetCtrl from './tweet-client/TweetCtrl';
import { User } from './types';

/**
 * ツイートクライアント
 */
export default class TweetClient {
  public webSocketCtrl: WebSocketCtrl;
  public tweetCtrl: TweetCtrl;

  /** 一覧を最新の状態にする */
  public refreshList: Function;

  constructor(token: string, wsHost: string, user: User) {
    this.webSocketCtrl = new WebSocketCtrl(token, wsHost, user, this);
    this.tweetCtrl = new TweetCtrl(user);
  }
}
