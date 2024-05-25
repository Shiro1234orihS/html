//------------------------------Canvas
const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth-5
canvas.height = window.innerHeight-5
const w = canvas.width
const h = canvas.height
const c = canvas.getContext("2d")

//------- connexion
// Fond noir
c.fillStyle = "black"
c.fillRect(0, 0, w, h);
// text connexion
c.fillStyle = getComputedStyle(document.body).getPropertyValue("--color");
c.font = "48px sans serif"
const textMetrics = c.measureText("Connexion")
c.fillText("Connexion", w/2-textMetrics.width/2, 50);
// ----- bouton

const loginInput = document.querySelector("#loginInput");
const passInput = document.querySelector("#passInput");

const button = document.querySelector("button");
button.addEventListener("click", function() {
    window.location = window.location + "/game?login="+loginInput.value+"&password="+passInput.value;
})