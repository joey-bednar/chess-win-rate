async function chesscom(username) {

    let obj;
    try {
        const response = await fetch("https://api.chess.com/pub/player/"+username+"/stats")
        obj = await response.json()
    } catch {
        console.log("Error fetching chess.com rating")
    }

    let ratings = ["","","",""]
    const time_control = ["chess_bullet","chess_blitz","chess_rapid","chess_daily"]

    for (let i=0;i<time_control.length;i++) {
        if (obj.hasOwnProperty(time_control[i])) {
            ratings[i] = obj[time_control[i]].last.rating
        }
    }

    return ratings
}
async function lichess(username) {
    try {
        const response = await fetch("https://lichess.org/api/user/"+username)
        const obj = await response.json()
        return [
            obj.perfs.bullet.rating,
            obj.perfs.blitz.rating,
            obj.perfs.rapid.rating,
            //obj.perfs.classical.rating,
            obj.perfs.correspondence.rating]

    } catch {
        console.log("Error fetching lichess rating")
    }
}

// probability of player with rating r1
// winning against player with rating r2
function winRate(r1,r2) {
    const m = (r2-r1)/400
    const P = 1/(1+(10**m)) //probability
    const percent = Number.parseFloat(P*100).toFixed(2) //percent 2 decimals
    return percent
}

async function fetchUser(username,site) {
    if (username === "") {
        return
    }

    if (site === "chesscom") {
        return chesscom(username)
    } else if (site === "lichess") {
        return lichess(username)
    } else {
        console.log("Invalid website.")
    }
}

export async function fetchStats() {
    const site = document.querySelector("#site").value
    const time = document.querySelector("#time").value

    for (let i=1;i<=2;i++) {
        const username = document.querySelector("#name"+i).value
        const out = document.querySelector("#r"+i)
        try {
            let obj = await fetchUser(username,site)
            out.value = obj[time]
        } catch {

        }
    }
}

export function calculate() {
    const r1 = document.querySelector("#r1").value
    const r2 = document.querySelector("#r2").value
    const out = document.querySelector("#winrate")
    const wr = winRate(r1,r2)
    out.innerHTML = "Player 1 is expected to win <b>"+wr+"%</b> of games against Player 2."
}
