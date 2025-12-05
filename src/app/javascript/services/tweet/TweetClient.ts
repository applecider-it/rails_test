import axios from 'axios';

import { showToast } from '@/services/ui/message';

import WebSocketCtrl from './tweet-client/WebSocketCtrl';
import TweetCtrl from './tweet-client/TweetCtrl';

/**
 * ツイートクライアント
 */
export default class TweetClient {
  public webSocketCtrl: WebSocketCtrl;
  public tweetCtrl: TweetCtrl;

  constructor(token, wsHost, user) {
    this.webSocketCtrl = new WebSocketCtrl(token, wsHost, user);
    this.tweetCtrl = new TweetCtrl(user);
  }
}
