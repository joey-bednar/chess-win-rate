import { calculate, fetchStats } from './chess.js'

document.querySelector('#app').innerHTML = `
    <div>
        <input placeholder="Player 1 Rating" id="r1" />
        <input placeholder="Player 2 Rating" id="r2" />
        <button id="calc">Calculate</button>
    </div>
    <div>
        <input placeholder="Player 1 Username" id="name1" />
        <input placeholder="Player 1 Username" id="name2" />
        <select id="time">
            <option value="0">Bullet</option>
            <option value="1">Blitz</option>
            <option value="2">Rapid</option>
            <option value="3">Daily</option>
        </select>
        <select id="site">
            <option value="chesscom">Chess.com</option>
            <option value="lichess">Lichess</option>
        </select>
        <button id="fetch">Fetch</button>
    </div>
    <div id="winrate">
    </div>
`

const calcButton = document.querySelector("#calc");
calcButton.addEventListener("click", (event) => {
    calculate()
});
const fetchButton = document.querySelector("#fetch");
fetchButton.addEventListener("click", (event2) => {
    fetchStats()
});
