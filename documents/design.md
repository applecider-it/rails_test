# 設計

## 構成

Railsをモノリスにする。

websocketはgoのマイクロサービス。

```
go/ <- goマイクロサービス
  documents/ <- goマイクロサービス固有のドキュメント
src/ <- Railsモノリス
  documents/ <- Railsモノリス固有のドキュメント
documents/ <- 全体のドキュメント
```
