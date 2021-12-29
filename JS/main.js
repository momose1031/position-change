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
    let position1 = [fw2, fw4, mf3, mf7, mf9, mf13, df1, df2, df4, df5];
    let position1_formation = ['CF', 'CF', 'OMF', 'LSH', 'RSH', 'DMF', 'LSB', 'CB', 'CB', 'RSB'];
    for (let i = 0; i < position1.length; i++) {
      position1[i].textContent = position1_formation[i];
    }
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
        for (let i = 0; i < position1.length; i++) {
          position1[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        }
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => { // スタメン決定ボタン（モーダル）
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          for (let i = 0; i < position1.length; i++) {
            modalP[i + 1].textContent = position1_formation[i] + '：' + position1[i].textContent;
          }
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => { // 再シャッフル
          for (let i = 0; i < position1.length; i++) {
            players.push(position1[i].textContent);
          }
          for (let i = 0; i < position1.length; i++) {
            position1[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          }
        });
      });
    });
  }
  else if (e.target.value === 'position2') { // 4-3-3を選択
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    let position2 = [fw2, fw3, fw4, mf7, mf8, mf9, df1, df2, df4, df5];
    let position2_formation = ['LWG', 'CF', 'RWG', 'CMF', 'CMF', 'CMF', 'LSB', 'CB', 'CB', 'RSB'];
    for (let i = 0; i < position2.length; i++) {
      position2[i].textContent = position2_formation[i];
    }
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
        for (let i = 0; i < position2.length; i++) {
          position2[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        }
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          for (let i = 0; i < position2.length; i++) {
            modalP[i + 1].textContent = position2_formation[i] + '：' + position2[i].textContent;
          }
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          for (let i = 0; i < position2.length; i++) {
            players.push(position2[i].textContent);
          }
          for (let i = 0; i < position2.length; i++) {
            position2[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          }
        });
      });
    });
  }
  else if (e.target.value === 'position3') { // 4-5-1を選択
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    let position3 = [fw3, mf3, mf6, mf10, mf12, mf14, df1, df2, df4, df5];
    let position3_formation = ['CF', 'OMF', 'LSH', 'RSH', 'DMF', 'DMF', 'LSB', 'CB', 'CB', 'RSB'];
    for (let i = 0; i < position3.length; i++) {
      position3[i].textContent = position3_formation[i];
    }
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
        for (let i = 0; i < position3.length; i++) {
          position3[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        }
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          for (let i = 0; i < position3.length; i++) {
            modalP[i + 1].textContent = position3_formation[i] + '：' + position3[i].textContent;
          }
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          for (let i = 0; i < position3.length; i++) {
            players.push(position3[i].textContent);
          }
          for (let i = 0; i < position3.length; i++) {
            position3[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          }
        });
      });
    });
  }
  else if (e.target.value === 'position4') { // 3-5-2を選択
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    let position4 = [fw2, fw4, mf3, mf6, mf10, mf12, mf14, df2, df3, df4];
    let position4_formation = ['CF', 'CF', 'OMF', 'LSH', 'RSH', 'DMF', 'DMF', 'CB', 'CB', 'CB'];
    for (let i = 0; i < position4.length; i++) {
      position4[i].textContent = position4_formation[i];
    }
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
        for (let i = 0; i < position4.length; i++) {
          position4[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        }
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          for (let i = 0; i < position4.length; i++) {
            modalP[i + 1].textContent = position4_formation[i] + '：' + position4[i].textContent;
          }
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          for (let i = 0; i < position4.length; i++) {
            players.push(position4[i].textContent);
          }
          for (let i = 0; i < position4.length; i++) {
            position4[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          }
        });
      });
    });
  }
  else if (e.target.value === 'position5') { // 3-4-3を選択
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    let position5 = [fw2, fw3, fw4, mf6, mf7, mf9, mf10, df2, df3, df4];
    let position5_formation = ['LWG', 'CF', 'RWG', 'LSH', 'CMF', 'CMF', 'RSH', 'CB', 'CB', 'CB'];
    for (let i = 0; i < position5.length; i++) {
      position5[i].textContent = position5_formation[i];
    }
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
        for (let i = 0; i < position5.length; i++) {
          position5[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        }
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          for (let i = 0; i < position5.length; i++) {
            modalP[i + 1].textContent = position5_formation[i] + '：' + position5[i].textContent;
          }
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          for (let i = 0; i < position5.length; i++) {
            players.push(position5[i].textContent);
          }
          for (let i = 0; i < position5.length; i++) {
            position5[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          }
        });
      });
    });
  }
  else if (e.target.value === 'position6') { // 3-6-1を選択
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    let position6 = [fw3, mf2, mf4, mf6, mf10, mf12, mf14, df2, df3, df4];
    let position6_formation = ['CF', 'OMF', 'OMF', 'LSH', 'RSH', 'DMF', 'DMF', 'CB', 'CB', 'CB'];
    for (let i = 0; i < position6.length; i++) {
      position6[i].textContent = position6_formation[i];
    }
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
        for (let i = 0; i < position6.length; i++) {
          position6[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        }
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          for (let i = 0; i < position6.length; i++) {
            modalP[i + 1].textContent = position6_formation[i] + '：' + position6[i].textContent;
          }
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          for (let i = 0; i < position6.length; i++) {
            players.push(position6[i].textContent);
          }
          for (let i = 0; i < position6.length; i++) {
            position6[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          }
        });
      });
    });
  }
  else if (e.target.value === 'position7') { // 5-4-1を選択
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    let position7 = [fw3, mf3, mf7, mf9, mf13, df1, df2, df3, df4, df5];
    let position7_formation = ['CF', 'OMF', 'CMF', 'CMF', 'DMF', 'LSB', 'CB', 'CB', 'CB', 'RSB'];
    for (let i = 0; i < position7.length; i++) {
      position7[i].textContent = position7_formation[i];
    }
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
        for (let i = 0; i < position7.length; i++) {
          position7[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        }
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          for (let i = 0; i < position7.length; i++) {
            modalP[i + 1].textContent = position7_formation[i] + '：' + position7[i].textContent;
          }
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          for (let i = 0; i < position7.length; i++) {
            players.push(position7[i].textContent);
          }
          for (let i = 0; i < position7.length; i++) {
            position7[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          }
        });
      });
    });
  }
  else if (e.target.value === 'position8') { // 5-3-2を選択
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    let position8 = [fw2, fw4, mf7, mf8, mf9, df1, df2, df3, df4, df5];
    let position8_formation = ['CF', 'CF', 'CMF', 'CMF', 'CMF', 'LSB', 'CB', 'CB', 'CB', 'RSB'];
    for (let i = 0; i < position8.length; i++) {
      position8[i].textContent = position8_formation[i];
    }
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
        for (let i = 0; i < position8.length; i++) {
          position8[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
        }
        changeBtn.classList.add('hidden');
        retryBtn.classList.remove('hidden');
        endBtn.classList.remove('hidden');
        endBtn.addEventListener('click', () => {
          modal.classList.remove('hidden');
          mask.classList.remove('hidden');
          modalP0.textContent = '今日のスタメンはこれだ！！';
          for (let i = 0; i < position8.length; i++) {
            modalP[i + 1].textContent = position8_formation[i] + '：' + position8[i].textContent;
          }
          reloadBtn.classList.remove('hidden');
        });
        retryBtn.addEventListener('click', () => {
          for (let i = 0; i < position8.length; i++) {
            players.push(position8[i].textContent);
          }
          for (let i = 0; i < position8.length; i++) {
            position8[i].textContent = players.splice(Math.floor(Math.random() * players.length), 1)[0];
          }
        });
      });
    });
  }
  else if (e.target.value === 'position0') { // フォーメーションを選択
    [].forEach.call(tds, (td) => {
      td.textContent = '';
    });
    gk.classList.add('hidden');
    selectBtn.classList.add('hidden');
  }
});