(async function() {
const notes_du_dev = [`"C'est un peu Squid Game là."`,
    `" 'feur."`,
    `"C'est le premier vrai site que j'ai developpé,<br>   Il est pas si mal, hein ?"`];

var note = notes_du_dev[Math.floor(Math.random()*notes_du_dev.length)];

const note_du_dev = document.getElementById(`note`);
note_du_dev.innerHTML = note;
}());