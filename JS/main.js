'use strict';

const fw1 = document.getElementById('fw1');
const fw2 = document.getElementById('fw2');
const fw3 = document.getElementById('fw3');
const fw4 = document.getElementById('fw4');
const fw5 = document.getElementById('fw5');

const mf1 = document.getElementById('mf1');
const mf2 = document.getElementById('mf2');
const mf3 = document.getElementById('mf3');
const mf4 = document.getElementById('mf4');
const mf5 = document.getElementById('mf5');
const mf6 = document.getElementById('mf6');
const mf7 = document.getElementById('mf7');
const mf8 = document.getElementById('mf8');
const mf9 = document.getElementById('mf9');
const mf10 = document.getElementById('mf10');
const mf11 = document.getElementById('mf11');
const mf12 = document.getElementById('mf12');
const mf13 = document.getElementById('mf13');
const mf14 = document.getElementById('mf14');
const mf15 = document.getElementById('mf15');

const df1 = document.getElementById('df1');
const df2 = document.getElementById('df2');
const df3 = document.getElementById('df3');
const df4 = document.getElementById('df4');
const df5 = document.getElementById('df5');



const btn = document.getElementById('btn');
let players = [];

btn.addEventListener('click', () => {
  let player = document.getElementById('player');
  add();
  // console.log(players);
});

const playerLists = document.getElementById('player-lists');
const changeBtn = document.getElementById('change-btn');

function add () {
  if (player.value) { //プレイヤーが登録された場合
    players.push(player.value);
    console.log(players);
    const li = document.createElement('li');
    li.textContent = player.value;
    // const deleteBtn = document.createElement('div');
    // deleteBtn.classList.add('delete-btn');
    // deleteBtn.textContent = '削除';
    // li.appendChild(deleteBtn);
    playerLists.appendChild(li);
    player.value = ''; //inputの中身を空にする
    // deleteBtn.addEventListener('click', () => {
      //   li.remove();
      //   // players.splice();
      // });
      if (players.length > 9) {
        player.classList.add('hidden');
        btn.classList.add('hidden');
        changeBtn.classList.remove('hidden');
        changeBtn.addEventListener('click', () => {
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
        });
      }
  }
}