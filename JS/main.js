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

function add () {
  if (player.value) { //プレイヤーが登録された場合
    players.push(player.value);
    const li = document.createElement('li');
    li.textContent = player.value;
    const deleteBtn = document.createElement('div');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = '削除';
    li.appendChild(deleteBtn);
    playerLists.appendChild(li);
    player.value = ''; //inputの中身を空にする
    deleteBtn.addEventListener('click', () => {
      li.remove();
      // players.splice(removeNum, 1);
      console.log(players);
    });
    if (players.length > 9) {
      const mem1 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
      fw2.textContent = mem1;
      const mem2 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
      fw4.textContent = mem2;
      const mem3 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
      mf3.textContent = mem3;
      const mem4 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
      mf7.textContent = mem4;
      const mem5 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
      mf9.textContent = mem5;
      const mem6 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
      mf13.textContent = mem6;
      const mem7 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
      df1.textContent = mem7;
      const mem8 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
      df2.textContent = mem8;
      const mem9 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
      df4.textContent = mem9;
      const mem10 = players.splice(Math.floor(Math.random() * players.length), 1)[0];
      df5.textContent = mem10;
    }
  }
}