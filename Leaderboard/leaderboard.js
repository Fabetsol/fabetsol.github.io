const { GoogleSpreadsheet } = require('google-spreadsheet');

(async function() {
    const doc = new GoogleSpreadsheet('1X7Wj0eIHeryQ6s_UA_l1U0IqxBp11SVpo-QTji1OXF4');

    await doc.useServiceAccountAuth(require('./client_secret.json'));

    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    var members = [];
    for (row in rows) {members.push([rows[row].ID, rows[row].XP, rows[row].GOAL, rows[row].LEVEL, rows[row].COLOR, rows[row].AVATAR_URL, rows[row].NAME]);}

    var leaderboard = [[null, null, null, -1]];
    for (i in members) {
        for (j in leaderboard) {
            if (members[i][3] <= leaderboard[j][3]) {
                leaderboard.splice(j,0, members[i]);
                break;
            }
        }
        if (!(leaderboard.includes(members[i]))) {leaderboard.push(members[i]);}
    }

    leaderboard = leaderboard.reverse();
    for (i in leaderboard) {leaderboard[i].push(Number(i)+1);}
    leaderboard.pop()

    var board = [];

    for (i in leaderboard) {
        board.push(`
        <tr class="reference_members"><td style="border-radius:20px 0px 0px 20px;"><img style="border-radius:100%;width:150px;height:auto;" src="${leaderboard[i][5]}"></td>
        <td><p style="font-size:30px; font-weight:bold;">#${leaderboard[i][7]}</p></td>
        <td><p style="font-size:20px;font-weight:bold;">${leaderboard[i][6]}</p></td>
        <td><p style="font-size:25px;">${leaderboard[i][1]}xp / ${leaderboard[i][2]}</p></td>
        <td style="border-radius:0px 20px 20px 0px;"><p style="font-size:35px;">Lvl.${leaderboard[i][3]}</p></td>
        </tr></table>`);

        document.getElementById('leaderboard').innerHTML = board.join('\n');
    }
}());
