// 各ボタンを取得
const startBtn = document.getElementById('start-btn'); //はじめる
const selectBtn = document.getElementById('select-btn'); //フォーメーション決定
const btn = document.getElementById('btn'); //プレイヤー入力
const changeBtn = document.getElementById('change-btn'); //シャッフル
const retryBtn = document.getElementById('retry-btn'); //再シャッフル
const endBtn = document.getElementById('end-btn'); //スタメン決定
const reloadBtn = document.getElementById('reload-btn'); //最初に戻る

// トップページ→説明モーダル（まずは、フォーメーションを決めよう！）
const topPage = document.getElementById('top-page');
const modal = document.getElementById('modal');
const mask = document.getElementById('mask'); // 背景をグレーにする
const close = document.getElementById('close'); // 閉じるボタン
startBtn.addEventListener('click', () => { // はじめるを押すとトップページを閉じる
  topPage.classList.add('hidden'); // トップページを閉じる
  modal.classList.remove('hidden'); // 中心に説明モーダルを表示
  mask.classList.remove('hidden'); // 中心以外をグレー背景にする
});
close.addEventListener('click', () => { // 閉じるボタン
  modal.classList.add('hidden'); // モーダルを閉じる
  mask.classList.add('hidden'); // グレー背景を閉じる
  player.focus(); // 入力部分にカーソルを合わせる
});
mask.addEventListener('click', () => { // グレー背景（モーダル以外）をクリックしてもモーダルが閉じる
  close.click();
});

// フォーメーション決定後のモーダル
const modalP0 = document.getElementById('modal-p');
function modal2 () {
  modal.classList.remove('hidden');
  mask.classList.remove('hidden');
  modalP0.textContent = 'フィールドプレーヤーを10人登録して、ポジションシャッフルしよう！！';
}

// スタメンを決定後に各ポジションを表示するモーダルの準備（<p>タグを作成・取得）
let MODAL = {};
let modalP = {};
for (let i = 1; i < 11; i++) {
  MODAL[i] = document.createElement('p');
  close.before(MODAL[i]);
  MODAL[i].id = `modalP${i}`;
  modalP[i] = document.getElementById(`modalP${i}`)
}

// プレイヤー登録
const playerLists = document.getElementById('player-lists');
let players = [];
function bytes(str) { // 全角1文字、半角2文字としてカウント
	str = str.replace(/[｡-ﾟ]/g, 'K');
	let hex = '';
	for (let i = 0; i < str.length; i++) {
    hex += (('0000' + str.charCodeAt(i).toString(16)).slice(-4)).replace(/^00/, '');
	}
	return hex.length/2;
}
function playerInput () { // プレイヤー入力
  if (bytes(player.value) > 8) { // 全角4文字半角8文字以内に制限
    alert('全角4文字以内で入力してください')
  }
  if (bytes(player.value) <= 8 && player.value) { // プレイヤーが正常に入力された場合
    player.focus();
    players.push(player.value);
    const li = document.createElement('li');
    li.textContent = player.value;
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '(削除する)';
    playerLists.appendChild(li);
    playerLists.appendChild(deleteBtn);
    player.value = ''; // inputの中身を空にする
    deleteBtn.addEventListener('click', () => { // 登録済プレイヤーの削除
      li.remove();
      deleteBtn.remove();
      let index = players.indexOf(li.textContent);
      if (index > -1) {
        players.splice(index, 1);
      }
      if(players.length < 10) { // 登録済プレイヤーが9人以下になった場合
        player.classList.remove('hidden');
        player.focus();
        btn.classList.remove('hidden');
        changeBtn.classList.add('hidden');
      }
    });
    if (players.length > 9) { // 登録済プレイヤーが10人になった場合
      player.classList.add('hidden');
      btn.classList.add('hidden');
      changeBtn.classList.remove('hidden');
    }
  }
}

// getElementByIdで各ポジションを取得
let fw = {};
let df = {};
let mf = {};
for (let i = 1; i < 6; i++) {
  fw[i] = document.getElementById(`fw${i}`);
  df[i] = document.getElementById(`df${i}`);
}
for (let i = 1; i < 16; i++) {
  mf[i] = document.getElementById(`mf${i}`);
}

// フォーメーションの要素を取得
let formation = document.getElementById('formation'); // フォーメーション<select>タグ
let tds = document.querySelectorAll('td'); // 各ポジションの全てを取得
let gk = document.getElementById('gk');
let player = document.getElementById('player'); // プレイヤー入力値
const playerForm = document.getElementById('player-form'); // プレイヤー入力欄

// フォーメーションの設定→プレイヤー登録→シャッフル→スタメン決定
formation.addEventListener('change', (e) => {
  if (e.target.value === 'position1') { // 4-4-2を選択
    [].forEach.call(tds, (td) => {
      td.textContent = ''; // 各ボジションの表示を無くす
    });
    // 各ポジションを表示
    fw2.textContent = 'CF';
    fw4.textContent = 'CF';
    mf3.textContent = 'OMF';
    mf7.textContent = 'LSH';
    mf9.textContent = 'RSH';
    mf13.textContent = 'DMF';
    df1.textContent = 'LSB';
    df2.textContent = 'CB';
    df4.textContent = 'CB';
    df5.textContent = 'RSB';
    gk.classList.remove('hidden');
    selectBtn.classList.remove('hidden'); // フォーメーションを決定ボタン表示
    selectBtn.addEventListener('click', () => {
      modal2 (); // モーダルの表示(プレイヤーを登録しよう)
      // フォーメーションを編集できないようにする
      formation.disabled = true;
      selectBtn.classList.add('hidden');
      // 入力フォームを表示
      player.classList.remove('hidden');
      btn.classList.remove('hidden');
      playerForm.addEventListener('submit', (e) => {
        playerInput();
        e.preventDefault(); // 入力するとトップページに戻るバグ解消
      });
      changeBtn.addEventListener('click', () => {
        if (e.target.value !== 'position1') { //フォーメーションを変更した時被ったポジションが表示されないバグ解消
          return;
        }
        // 全ての削除ボタンの表示を無くす
        const allDeleteBtn = document.getElementsByClassName('delete-btn');
        [].forEach.call(allDeleteBtn, (deleteBtn) => {
          deleteBtn.classList.add('hidden');
        });
        if (players.length === 0) { // フォーメーションを変更したときにプレイヤーが表示されないバグ解消
          return;
        }
        // ランダムにプレイヤーを表示
        const player1 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw2.textContent = player1;
        const player2 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw4.textContent = player2;
        const player3 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf3.textContent = player3;
        const player4 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf7.textContent = player4;
        const player5 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf9.textContent = player5;
        const player6 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf13.textContent = player6;
        const player7 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df1.textContent = player7;
        const player8 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df2.textContent = player8;
        const player9 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df4.textContent = player9;
        const player10 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df5.textContent = player10;
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          modalP1.textContent = 'CF：' + fw2.textContent;
          modalP2.textContent = 'CF：' + fw4.textContent;
          modalP3.textContent = '0MF：' + mf3.textContent;
          modalP4.textContent = 'LSH：' + mf7.textContent;
          modalP5.textContent = 'RSH：' + mf9.textContent;
          modalP6.textContent = 'DMF：' + mf13.textContent;
          modalP7.textContent = 'LSB：' + df1.textContent;
          modalP8.textContent = 'CB：' + df2.textContent;
          modalP9.textContent = 'CB：' + df4.textContent;
          modalP10.textContent = 'RSB：' + df5.textContent;
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          players.push(player1, player2, player3, player4, player5, player6, player7, player8, player9, player10);
          fw2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          fw4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf7.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf9.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf13.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df1.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df5.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        });
      });
    });
  }
  else if (e.target.value === 'position2') {
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    fw2.textContent = 'LWG';
    fw3.textContent = 'CF';
    fw4.textContent = 'RWG';
    mf7.textContent = 'CMF';
    mf8.textContent = 'CMF';
    mf9.textContent = 'CMF';
    df1.textContent = 'LSB';
    df2.textContent = 'CB';
    df4.textContent = 'CB';
    df5.textContent = 'RSB';
    gk.classList.remove('hidden');
    selectBtn.classList.remove('hidden');
    selectBtn.addEventListener('click', () => {
      modal2 ();
      formation.disabled = true;
      selectBtn.classList.add('hidden');
      player.classList.remove('hidden');
      btn.classList.remove('hidden');
      playerForm.addEventListener('submit', (e) => {
        playerInput();
        e.preventDefault();
      });
      changeBtn.addEventListener('click', () => {
        if (e.target.value !== 'position2') {
          return;
        }
        const allDeleteBtn = document.getElementsByClassName('delete-btn');
        [].forEach.call(allDeleteBtn, (deleteBtn) => {
          deleteBtn.classList.add('hidden');
        });
        if (players.length === 0) {
          return;
        }
        const player1 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw2.textContent = player1;
        const player2 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw3.textContent = player2;
        const player3 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw4.textContent = player3;
        const player4 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf7.textContent = player4;
        const player5 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf8.textContent = player5;
        const player6 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf9.textContent = player6;
        const player7 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df1.textContent = player7;
        const player8 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df2.textContent = player8;
        const player9 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df4.textContent = player9;
        const player10 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df5.textContent = player10;
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          modalP1.textContent = 'LWG：' + fw2.textContent;
          modalP2.textContent = 'CF：' + fw3.textContent;
          modalP3.textContent = 'RWG：' + fw4.textContent;
          modalP4.textContent = 'CMF：' + mf7.textContent;
          modalP5.textContent = 'CMF：' + mf8.textContent;
          modalP6.textContent = 'CMF：' + mf9.textContent;
          modalP7.textContent = 'LSB：' + df1.textContent;
          modalP8.textContent = 'CB：' + df2.textContent;
          modalP9.textContent = 'CB：' + df4.textContent;
          modalP10.textContent = 'RSB：' + df5.textContent;
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          players.push(player1, player2, player3, player4, player5, player6, player7, player8, player9, player10);
          fw2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          fw3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          fw4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf7.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf8.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf9.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df1.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df5.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        });
      });
    });
  }
  else if (e.target.value === 'position3') {
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    fw3.textContent = 'CF';
    mf3.textContent = 'OMF';
    mf6.textContent = 'LSH';
    mf10.textContent = 'RSH';
    mf12.textContent = 'DMF';
    mf14.textContent = 'DMF';
    df1.textContent = 'LSB';
    df2.textContent = 'CB';
    df4.textContent = 'CB';
    df5.textContent = 'RSB';
    gk.classList.remove('hidden');
    selectBtn.classList.remove('hidden');
    selectBtn.addEventListener('click', () => {
      modal2 ();
      formation.disabled = true;
      selectBtn.classList.add('hidden');
      player.classList.remove('hidden');
      btn.classList.remove('hidden');
      playerForm.addEventListener('submit', (e) => {
        playerInput();
        e.preventDefault();
      });
      changeBtn.addEventListener('click', () => {
        if (e.target.value !== 'position3') {
          return;
        }
        const allDeleteBtn = document.getElementsByClassName('delete-btn');
        [].forEach.call(allDeleteBtn, (deleteBtn) => {
          deleteBtn.classList.add('hidden');
        });
        if (players.length === 0) {
          return;
        }
        const player1 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw3.textContent = player1;
        const player2 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf3.textContent = player2;
        const player3 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf6.textContent = player3;
        const player4 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf10.textContent = player4;
        const player5 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf12.textContent = player5;
        const player6 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf14.textContent = player6;
        const player7 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df1.textContent = player7;
        const player8 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df2.textContent = player8;
        const player9 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df4.textContent = player9;
        const player10 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df5.textContent = player10;
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          modalP1.textContent = 'CF：' + fw3.textContent;
          modalP2.textContent = 'OMF：' + mf3.textContent;
          modalP3.textContent = 'LSH：' + mf6.textContent;
          modalP4.textContent = 'RSH：' + mf10.textContent;
          modalP5.textContent = 'DMF：' + mf12.textContent;
          modalP6.textContent = 'DMF：' + mf14.textContent;
          modalP7.textContent = 'LSB：' + df1.textContent;
          modalP8.textContent = 'CB：' + df2.textContent;
          modalP9.textContent = 'CB：' + df4.textContent;
          modalP10.textContent = 'RSB：' + df5.textContent;
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          players.push(player1, player2, player3, player4, player5, player6, player7, player8, player9, player10);
          fw3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf6.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf10.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf12.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf14.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df1.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df5.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        });
      });
    });
  }
  else if (e.target.value === 'position4') {
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    fw2.textContent = 'CF';
    fw4.textContent = 'CF';
    mf3.textContent = 'OMF';
    mf6.textContent = 'LSH';
    mf10.textContent = 'RSH';
    mf12.textContent = 'DMF';
    mf14.textContent = 'DMF';
    df2.textContent = 'CB';
    df3.textContent = 'CB';
    df4.textContent = 'CB';
    gk.classList.remove('hidden');
    selectBtn.classList.remove('hidden');
    selectBtn.addEventListener('click', () => {
      modal2 ();
      formation.disabled = true;
      selectBtn.classList.add('hidden');
      player.classList.remove('hidden');
      btn.classList.remove('hidden');
      playerForm.addEventListener('submit', (e) => {
        playerInput();
        e.preventDefault();
      });
      changeBtn.addEventListener('click', () => {
        if (e.target.value !== 'position4') {
          return;
        }
        const allDeleteBtn = document.getElementsByClassName('delete-btn');
        [].forEach.call(allDeleteBtn, (deleteBtn) => {
          deleteBtn.classList.add('hidden');
        });
        if (players.length === 0) {
          return;
        }
        const player1 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw2.textContent = player1;
        const player2 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw4.textContent = player2;
        const player3 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf3.textContent = player3;
        const player4 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf6.textContent = player4;
        const player5 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf10.textContent = player5;
        const player6 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf12.textContent = player6;
        const player7 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf14.textContent = player7;
        const player8 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df2.textContent = player8;
        const player9 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df3.textContent = player9;
        const player10 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df4.textContent = player10;
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          modalP1.textContent = 'CF：' + fw2.textContent;
          modalP2.textContent = 'CF：' + fw4.textContent;
          modalP3.textContent = 'OMF：' + mf3.textContent;
          modalP4.textContent = 'LSH：' + mf6.textContent;
          modalP5.textContent = 'RSH：' + mf10.textContent;
          modalP6.textContent = 'DMF：' + mf12.textContent;
          modalP7.textContent = 'DMF：' + mf14.textContent;
          modalP8.textContent = 'CB：' + df2.textContent;
          modalP9.textContent = 'CB：' + df3.textContent;
          modalP10.textContent = 'CB：' + df4.textContent;
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          players.push(player1, player2, player3, player4, player5, player6, player7, player8, player9, player10);
          fw2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          fw4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf6.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf10.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf12.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf14.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        });
      });
    });
  }
  else if (e.target.value === 'position5') {
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    fw2.textContent = 'LWG';
    fw3.textContent = 'CF';
    fw4.textContent = 'RWG';
    mf6.textContent = 'LSH';
    mf7.textContent = 'CMF';
    mf9.textContent = 'CMF';
    mf10.textContent = 'RSH';
    df2.textContent = 'CB';
    df3.textContent = 'CB';
    df4.textContent = 'CB';
    gk.classList.remove('hidden');
    selectBtn.classList.remove('hidden');
    selectBtn.addEventListener('click', () => {
      modal2 ();
      formation.disabled = true;
      selectBtn.classList.add('hidden');
      player.classList.remove('hidden');
      btn.classList.remove('hidden');
      playerForm.addEventListener('submit', (e) => {
        playerInput();
        e.preventDefault();
      });
      changeBtn.addEventListener('click', () => {
        if (e.target.value !== 'position5') {
          return;
        }
        const allDeleteBtn = document.getElementsByClassName('delete-btn');
        [].forEach.call(allDeleteBtn, (deleteBtn) => {
          deleteBtn.classList.add('hidden');
        });
        if (players.length === 0) {
          return;
        }
        const player1 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw2.textContent = player1;
        const player2 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw3.textContent = player2;
        const player3 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw4.textContent = player3;
        const player4 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf6.textContent = player4;
        const player5 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf7.textContent = player5;
        const player6 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf9.textContent = player6;
        const player7 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf10.textContent = player7;
        const player8 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df2.textContent = player8;
        const player9 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df3.textContent = player9;
        const player10 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df4.textContent = player10;
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          modalP1.textContent = 'LWG：' + fw2.textContent;
          modalP2.textContent = 'CF：' + fw3.textContent;
          modalP3.textContent = 'RWG：' + fw4.textContent;
          modalP4.textContent = 'LSH：' + mf6.textContent;
          modalP5.textContent = 'CMF：' + mf7.textContent;
          modalP6.textContent = 'CMF：' + mf9.textContent;
          modalP7.textContent = 'RSH：' + mf10.textContent;
          modalP8.textContent = 'CB：' + df2.textContent;
          modalP9.textContent = 'CB：' + df3.textContent;
          modalP10.textContent = 'CB：' + df4.textContent;
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          players.push(player1, player2, player3, player4, player5, player6, player7, player8, player9, player10);
          fw2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          fw3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          fw4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf6.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf7.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf9.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf10.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        });
      });
    });
  }
  else if (e.target.value === 'position6') {
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    fw3.textContent = 'CF';
    mf2.textContent = 'OMF';
    mf4.textContent = 'OMF';
    mf6.textContent = 'LSH';
    mf10.textContent = 'RSH';
    mf12.textContent = 'DMF';
    mf14.textContent = 'DMF';
    df2.textContent = 'CB';
    df3.textContent = 'CB';
    df4.textContent = 'CB';
    gk.classList.remove('hidden');
    selectBtn.classList.remove('hidden');
    selectBtn.addEventListener('click', () => {
      modal2 ();
      formation.disabled = true;
      selectBtn.classList.add('hidden');
      player.classList.remove('hidden');
      btn.classList.remove('hidden');
      playerForm.addEventListener('submit', (e) => {
        playerInput();
        e.preventDefault();
      });
      changeBtn.addEventListener('click', () => {
        if (e.target.value !== 'position6') {
          return;
        }
        const allDeleteBtn = document.getElementsByClassName('delete-btn');
        [].forEach.call(allDeleteBtn, (deleteBtn) => {
          deleteBtn.classList.add('hidden');
        });
        if (players.length === 0) {
          return;
        }
        const player1 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw3.textContent = player1;
        const player2 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf2.textContent = player2;
        const player3 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf4.textContent = player3;
        const player4 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf6.textContent = player4;
        const player5 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf10.textContent = player5;
        const player6 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf12.textContent = player6;
        const player7 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf14.textContent = player7;
        const player8 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df2.textContent = player8;
        const player9 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df3.textContent = player9;
        const player10 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df4.textContent = player10;
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          modalP1.textContent = 'CF：' + fw3.textContent;
          modalP2.textContent = 'OMF：' + mf2.textContent;
          modalP3.textContent = 'OMF：' + mf4.textContent;
          modalP4.textContent = 'LSH：' + mf6.textContent;
          modalP5.textContent = 'RSH：' + mf10.textContent;
          modalP6.textContent = 'DMF：' + mf12.textContent;
          modalP7.textContent = 'DMF：' + mf14.textContent;
          modalP8.textContent = 'CB：' + df2.textContent;
          modalP9.textContent = 'CB：' + df3.textContent;
          modalP10.textContent = 'CB：' + df4.textContent;
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          players.push(player1, player2, player3, player4, player5, player6, player7, player8, player9, player10);
          fw3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf6.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf10.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf12.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf14.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        });
      });
    });
  }
  else if (e.target.value === 'position7') {
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    fw3.textContent = 'CF';
    mf3.textContent = 'OMF';
    mf7.textContent = 'CMF';
    mf9.textContent = 'CMF';
    mf13.textContent = 'DMF';
    df1.textContent = 'LSB';
    df2.textContent = 'CB';
    df3.textContent = 'CB';
    df4.textContent = 'CB';
    df5.textContent = 'RSB';
    gk.classList.remove('hidden');
    selectBtn.classList.remove('hidden');
    selectBtn.addEventListener('click', () => {
      modal2 ();
      formation.disabled = true;
      selectBtn.classList.add('hidden');
      player.classList.remove('hidden');
      btn.classList.remove('hidden');
      playerForm.addEventListener('submit', (e) => {
        playerInput();
        e.preventDefault();
      });
      changeBtn.addEventListener('click', () => {
        if (e.target.value !== 'position7') {
          return;
        }
        const allDeleteBtn = document.getElementsByClassName('delete-btn');
        [].forEach.call(allDeleteBtn, (deleteBtn) => {
          deleteBtn.classList.add('hidden');
        });
        if (players.length === 0) {
          return;
        }
        const player1 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw3.textContent = player1;
        const player2 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf3.textContent = player2;
        const player3 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf7.textContent = player3;
        const player4 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf9.textContent = player4;
        const player5 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf13.textContent = player5;
        const player6 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df1.textContent = player6;
        const player7 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df2.textContent = player7;
        const player8 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df3.textContent = player8;
        const player9 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df4.textContent = player9;
        const player10 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df5.textContent = player10;
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          modalP1.textContent = 'CF：' + fw3.textContent;
          modalP2.textContent = 'OMF：' + mf3.textContent;
          modalP3.textContent = 'CMF：' + mf7.textContent;
          modalP4.textContent = 'CMF：' + mf9.textContent;
          modalP5.textContent = 'DMF：' + mf13.textContent;
          modalP6.textContent = 'LSB：' + df1.textContent;
          modalP7.textContent = 'CB：' + df2.textContent;
          modalP8.textContent = 'CB：' + df3.textContent;
          modalP9.textContent = 'CB：' + df4.textContent;
          modalP10.textContent = 'RSB：' + df5.textContent;
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          players.push(player1, player2, player3, player4, player5, player6, player7, player8, player9, player10);
          fw3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf7.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf9.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf13.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df1.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df5.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        });
      });
    });
  }
  else if (e.target.value === 'position8') {
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    fw2.textContent = 'CF';
    fw4.textContent = 'CF';
    mf7.textContent = 'CMF';
    mf8.textContent = 'CMF';
    mf9.textContent = 'CMF';
    df1.textContent = 'LSB';
    df2.textContent = 'CB';
    df3.textContent = 'CB';
    df4.textContent = 'CB';
    df5.textContent = 'RSB';
    gk.classList.remove('hidden');
    selectBtn.classList.remove('hidden');
    selectBtn.addEventListener('click', () => {
      modal2 ();
      formation.disabled = true;
      selectBtn.classList.add('hidden');
      player.classList.remove('hidden');
      btn.classList.remove('hidden');
      playerForm.addEventListener('submit', (e) => {
        playerInput();
        e.preventDefault();
      });
      changeBtn.addEventListener('click', () => {
        if (e.target.value !== 'position8') {
          return;
        }
        const allDeleteBtn = document.getElementsByClassName('delete-btn');
        [].forEach.call(allDeleteBtn, (deleteBtn) => {
          deleteBtn.classList.add('hidden');
        });
        if (players.length === 0) {
          return;
        }
        const player1 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw2.textContent = player1;
        const player2 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        fw4.textContent = player2;
        const player3 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf7.textContent = player3;
        const player4 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf8.textContent = player4;
        const player5 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        mf9.textContent = player5;
        const player6 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df1.textContent = player6;
        const player7 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df2.textContent = player7;
        const player8 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df3.textContent = player8;
        const player9 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df4.textContent = player9;
        const player10 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        df5.textContent = player10;
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          modalP1.textContent = 'CF：' + fw2.textContent;
          modalP2.textContent = 'CF：' + fw4.textContent;
          modalP3.textContent = 'CMF：' + mf7.textContent;
          modalP4.textContent = 'CMF：' + mf8.textContent;
          modalP5.textContent = 'CMF：' + mf9.textContent;
          modalP6.textContent = 'LSB：' + df1.textContent;
          modalP7.textContent = 'CB：' + df2.textContent;
          modalP8.textContent = 'CB：' + df3.textContent;
          modalP9.textContent = 'CB：' + df4.textContent;
          modalP10.textContent = 'RSB：' + df5.textContent;
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          players.push(player1, player2, player3, player4, player5, player6, player7, player8, player9, player10);
          fw2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          fw4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf7.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf8.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          mf9.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df1.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df2.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df3.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df4.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          df5.textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        });
      });
    });
  }
  else if (e.target.value === 'position0') {
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    gk.classList.add('hidden');
    selectBtn.classList.add('hidden');
  }
});