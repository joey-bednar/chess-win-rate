// return username's chess.com ratings in an array
// output format: [bullet,blitz,rapid,daily]
async function chesscom(username) {
  let obj;
  try {
    const response = await fetch('https://api.chess.com/pub/player/' + username + '/stats');

    // TODO: add visual error when user not found
    if (!response.ok) {
      console.log('User not found.');
      return;
    }

    obj = await response.json();
  } catch {
    console.log('Error fetching chess.com rating');
    return;
  }

  let ratings = ['', '', '', ''];
  const time_control = ['chess_bullet', 'chess_blitz', 'chess_rapid', 'chess_daily'];

  for (let i = 0; i < time_control.length; i++) {
    if (obj.hasOwnProperty(time_control[i])) {
      ratings[i] = obj[time_control[i]].last.rating;
    }
  }

  return ratings;
}

// return username's lichess ratings in an array
// output format: [bullet,blitz,rapid,correspondence]
async function lichess(username) {
  try {
    const response = await fetch('https://lichess.org/api/user/' + username);

    // TODO: add visual error when user not found
    if (!response.ok) {
      console.log('User not found.');
      return;
    }

    const obj = await response.json();
    return [
      obj.perfs.bullet.rating,
      obj.perfs.blitz.rating,
      obj.perfs.rapid.rating,
      obj.perfs.correspondence.rating
    ];
  } catch {
    console.log('Error fetching lichess rating');
  }
}

// probability of player with rating r1
// winning against player with rating r2
function winRate(r1, r2) {
  const m = (r2 - r1) / 400;
  const P = 1 / (1 + 10 ** m); //probability
  const percent = Number.parseFloat(P * 100).toFixed(2); //percent 2 decimals
  return percent;
}

// call chess.com/lichess fetch ratings function
async function fetchUser(username, site) {

  if (site === 'chesscom') {
    return chesscom(username);
  } else if (site === 'lichess') {
    return lichess(username);
  } else {
    console.log('Invalid website.');
  }
}

// get usernames from input, send to fetchUser, and display ratings in ui
export async function fetchStats() {
  const site = document.querySelector('#site').value;
  const time = document.querySelector('#time').value;

  const username1 = document.querySelector('#name1').value;
  const out1 = document.querySelector('#r1');

  const username2 = document.querySelector('#name2').value;
  const out2 = document.querySelector('#r2');

  if (username1 === '' || username2 === '') {
    return;
  }

  try {
    let [obj1, obj2] = await Promise.all([fetchUser(username1, site), fetchUser(username2, site)]);
    out1.value = obj1[time];
    out2.value = obj2[time];
  } catch {}
}

// get ratings from input, calculate win percentage, and display in ui
export function calculate() {
  const r1 = document.querySelector('#r1').value;
  const r2 = document.querySelector('#r2').value;
  const out = document.querySelector('#winrate');
  const wr = winRate(r1, r2);

  if (r1 == '' || r2 == '' || isNaN(r1) || isNaN(r2)) {
    return;
  }

  out.innerHTML = 'Player 1 is expected to win <b>' + wr + '%</b> of games against Player 2.';
}
