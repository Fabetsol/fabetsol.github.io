const { GoogleSpreadsheet } = require('google-spreadsheet');

(async function() {
    const doc = new GoogleSpreadsheet('1CdWcftm8zZ_4_roXBHbQC_RqXs1afq4D_xyarDzCLLo');

    await doc.useServiceAccountAuth(require('./client_secret.json'));

    await doc.loadInfo();
    
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();

    var words = [];
    for (row in rows) {words.push([rows[row].Ranflish, rows[row].Français, rows[row].Anglois, rows[row].Flemish, rows[row]['Definition (optional)']]);}
    words = words.concat([['B'], ['C'], ['D'], ['E'], ['F'], ['G'], ['H'], ['I'], ['J'], ['K'], ['L'], ['M'], ['N'], ['O'], ['P'], ['Q'], ['R'], ['S'], ['T'], ['U'], ['V'], ['W'], ['X'], ['Y'], ['Z']]);

    var sorted_words = [['A']];
    for (i in words) {
        for (j in sorted_words) {
            if (words[i][0] <= sorted_words[j][0]) {
                sorted_words.splice(j,0, words[i]);
                break;
            }
        }
        if (!(sorted_words.includes(words[i]))) {sorted_words.push(words[i]);}
    }

    var dico = [];
    for (word in sorted_words) {
        try {
            dico.push(`<table class="reference"><tr>
            <td><p class="word">${sorted_words[word][0].split('\n').join('<br>')}</p></td>
            <td><p class="word">${sorted_words[word][1].split('\n').join('<br>')}</p></td>
            <td><p class="word">${sorted_words[word][2].split('\n').join('<br>')}</p></td>
            <td><p class="word">${sorted_words[word][3].split('\n').join('<br>')}</p></td>
            <td><p class="word">${sorted_words[word][4].split('\n').join('<br>')}</p></td>
        </tr></table>`);
        } catch {dico.push(`<span id=${sorted_words[word][0]}><p class="letter">${sorted_words[word][0]}</p></span>`);}
    }

var Final = dico.join(`\n`)
document.getElementById('dico').innerHTML = Final;

}());