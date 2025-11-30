/**
 * ツイート画面のセットアップ
 */

const el = document.getElementById('tweet-root')!;

if (el) {
  const all = JSON.parse(el.dataset.all!);

  console.log(all);

  const { token, host } = all;

  // WebSocket 接続
  const ws = new WebSocket(`ws://${host}/ws?token=${token}&channel=tweet`);

  ws.onmessage = (event) => {
    // result = { data: { json }, sender: { user_id, email } }
    const result = JSON.parse(event.data);

    console.log(result);

    const data = JSON.parse(result.data.json);

    console.log(data);

    alert(`新しいメッセージがあります。${data.content}`);

    location.reload();
  };
}
