const ws = new ReconnectingWebSocket(
  'ws://80c7-2001-f71-1e0-8a00-e841-6e6f-a715-6b4c.ngrok-free.app',
  null,
  {
    debug: true,
    reconnectInterval: 3000
  }
);

ws.onmessage = (chatItemResponse) => {
  const chatItemResponseBody = JSON.parse(chatItemResponse.data);
  console.log(chatItemResponseBody);
  const chatType = chatItemResponseBody.type;
  const chatItem = chatItemResponseBody.body;
  // if (chatType !== 'chat') return;
  if (!chatItem?.message) return;

  const message = chatItem.message;
  const messageElement = message.map((item) => {
    if (item.text) return document.createTextNode(item.text);
    const emoji = document.createElement('img');
    emoji.src = item.url;
    return emoji;
  });

  const hyo_comment_viewer = document.getElementById('font-family-setting-container');

  const hyo_comme = document.createElement('div');
  hyo_comme.append(...messageElement);
  hyo_comment_viewer.appendChild(hyo_comme);
  hyo_comme.classList.add('comment');
  hyo_comme.style.left = '0px';

  const position = Math.floor(Math.random() * (window.innerWidth - hyo_comme.offsetWidth));
  hyo_comme.style.left = position + 'px';
};
