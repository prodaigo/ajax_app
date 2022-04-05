const buildHTML = (XHR) => {  //関数宣言
  const item = XHR.response.post;  //
  const html = `
    <div class="post">
      <div class="post-date">
        投稿日時：${item.created_at}
      </div>
      <div class="post-content">
        ${item.content}
      </div>
    </div>`;
  return html;
};

function post () {
  const submit = document.getElementById("submit");  //投稿ボタンの要素を取得
  submit.addEventListener("click", (e) => {  //イベント発火（クリックされたとき）
    e.preventDefault();  //
    const form = document.getElementById("form");  //フォームの要素を取得
    const formData = new FormData(form);  //フォームの値を取得
    const XHR = new XMLHttpRequest();  //非同期通信を行うためにXMLHttpRequestオブジェクトを生成
    XHR.open("POST", "/posts", true);  //リクエスト内容を指定(HTTP通信：POST, パス：/posts, 非同期通信：on)
    XHR.responseType = "json";  //レスポンスのデータフォーマットをjsonに指定
    XHR.send(formData);  //リクエストを送信
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      };
      const list = document.getElementById("list");
      const formText = document.getElementById("content");
      list.insertAdjacentHTML("afterend", buildHTML(XHR));
      formText.value = "";
    };
  });
};

window.addEventListener('load', post);