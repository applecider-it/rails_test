import WebSocketCtrl from './tweet-client/WebSocketCtrl';
import TweetCtrl from './tweet-client/TweetCtrl';

/**
 * ツイートクライアント
 */
export default class TweetClient {
  public webSocketCtrl: WebSocketCtrl;
  public tweetCtrl: TweetCtrl;

  /** 一覧を最新の状態にする */
  public refreshList: Function;

  constructor(token, wsHost, user) {
    this.webSocketCtrl = new WebSocketCtrl(token, wsHost, user);
    this.tweetCtrl = new TweetCtrl(user);
  }
}
