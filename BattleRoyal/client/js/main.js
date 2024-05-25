/*
login : mifdyl
password : 8rD6fr
*/
const socket = io("51.83.36.122:9541")


//--------------------------------URL PARAMS
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const login = urlParams.get('login');
const password = urlParams.get('password');

//---------------------------------CANVAS
const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth-20 > 1920 ? 1920 : window.innerWidth-20
canvas.height = window.innerHeight-20 > 1080 ? 1080 : window.innerHeight-20
const w = canvas.width
const h = canvas.height
const c = canvas.getContext("2d")

const player = {
	x: 0,
	y: 0,
	r: 0,
	color: "red",
	pseudo: "",
	hp: 0
}

const dir = {
	x: 0,
	y: 0
};

const mouse = { x: 0, y: 0 }
const map = {
	w:0,
	h:0,
	gridGap:0,
	shapes:[],
	weapons:[]
};
var players = [];
var bullets = [];
var rockets = [];
var explosions = [];
var autofire = false;

document.querySelector("body").addEventListener("mousemove", event => {
	mouse.x = event.pageX
	mouse.y = event.pageY
})
document.querySelector("body").addEventListener("click", _ => {
	let normMove = normalize(mouse.x - w/2, mouse.y - h/2);
	if (player.weapon == "rocketLauncher") {
		socket.emit("shootRocket", {vx: normMove[0], vy: normMove[1]});
	} else {
		socket.emit("shoot", {vx: normMove[0], vy: normMove[1]});
	}
});

socket.emit("login", {login:login, passwd:password});
socket.on("auth", data => {
	if(data.error) {
		window.location = window.location.toString().substring(0, window.location.toString().indexOf("/game"));
	}
	player.pseudo = data.pseudo
});
socket.on("dead", data => {
	window.location.reload()
});
socket.on("map", data => {
	map.w = data.width
	map.h = data.height
	map.gridGap = data.gridGap
	map.shapes = data.shapes
	map.weapons = data.weapons
})
socket.on("position", data => {
	player.r = data.r;
	player.x = data.x;
	player.y = data.y;
	player.color = data.color;
	player.weapon = data.weapon;
})
socket.on("players", data => {
	players = data;
})
socket.on("bullets", data => {
	bullets = data;
})
socket.on("rockets", data => {
	rockets = data;
})
socket.on("explosions", data => {
	explosions = data;
})
socket.on("weapon", data => {
	player.weapon = data;
	autofire = false;
})


setInterval(_ => {
	normMove = normalize(dir.x, dir.y);
	socket.emit("move", {vx: normMove[0], vy: normMove[1]});
}, 30);

setInterval(_ => {
	if(autofire) {
		let normMove = normalize(mouse.x - w/2, mouse.y - h/2);
		socket.emit("shoot", {vx: normMove[0], vy: normMove[1]});
	}
}, 150);

document.addEventListener("keydown", function(e) {
	if(e.key == "z" || e.key == "ArrowUp") {
		dir.y = -1;
	}
	if(e.key == "s" || e.key == "ArrowDown") {
		dir.y = 1;
	}
	if(e.key == "q" || e.key == "ArrowLeft") {
		dir.x = -1;
	}
	if(e.key == "d" || e.key == "ArrowRight") {
		dir.x = 1;
	}
	if(e.key == "a" && player.weapon == "machinegun") {
		autofire = !autofire;
	}
});

document.addEventListener("keyup", function(e) {
	if(e.key == "z" || e.key == "ArrowUp") {
		dir.y = 0;
	}
	if(e.key == "s" || e.key == "ArrowDown") {
		dir.y = 0;
	}
	if(e.key == "q" || e.key == "ArrowLeft") {
		dir.x = 0;
	}
	if(e.key == "d" || e.key == "ArrowRight") {
		dir.x = 0;
	}
})


function drawMap() {
	for(let shape of map.shapes) {
		c.beginPath()
		if (shape.shape == "rectangle") {
			c.fillStyle = shape.color;
			c.fillRect(shape.x-player.x + w/2, shape.y-player.y +h/2, shape.w, shape.h);
			c.fill();
		} else if(shape.shape == "circle") {
			c.fillStyle = shape.color;
			c.arc(shape.x-player.x + w/2, shape.y-player.y +h/2, shape.r, 0, Math.PI*2);
			c.fill()
		}
	}
}

function drawWeapons() {
	for(let weapon of map.weapons) {
		c.beginPath()
		c.fillStyle = weapon.color;
		c.arc(weapon.x-player.x+w/2, weapon.y-player.y+h/2, weapon.size, 0, Math.PI*2);
		c.fillText(weapon.weapon, weapon.x-player.x+w/2, weapon.y-player.y+h/2-5-weapon.size);
		c.fill();
	}
}

function drawPlayers() {
	for(let oPlayers of players) {
		if(oPlayers.pseudo != player.pseudo) {
			c.beginPath()
			c.fillStyle = oPlayers.color;
			c.arc(oPlayers.x - player.x + w/2, oPlayers.y - player.y + h/2, oPlayers.r, 0, Math.PI*2);
			c.fill();

			c.beginPath()
			c.font = "20px sans-serif";
			c.fillStyle = oPlayers.color;
			let measure = c.measureText(oPlayers.pseudo);
			c.fillText(oPlayers.pseudo + "hp : " + oPlayers.hp, oPlayers.x - player.x + w/2 - measure.width/2, oPlayers.y - player.y + h/2 - oPlayers.r - 5);
			c.fill()
		} else {
			player.hp = oPlayers.hp;
		}
	}
}

function drawGrid() {
	for(let x = map.gridGap*Math.floor((player.x-w/2) / map.gridGap); x <= player.x + w/2; x+=map.gridGap*2) {
		c.beginPath()
		c.moveTo(x-player.x + w/2, 0);
		c.lineTo(x-player.x + w/2, h);
		c.moveTo(x-player.x + w/2 + 50, 0);
		c.lineTo(x-player.x + w/2 + 50, h);
		c.strokeStyle = "rgba(50, 50, 50, 0.5)";
		c.lineWidth = 5;
		c.stroke();
		//console.log(x)
	}
	for(let y = map.gridGap*Math.floor((player.y-h/2) / map.gridGap); y <= player.y + h/2; y+=map.gridGap*2) {
		c.beginPath()
		c.moveTo(0, y-player.y + h/2);
		c.lineTo(w, y-player.y + h/2);
		c.moveTo(0, y-player.y + h/2 + 50);
		c.lineTo(w, y-player.y + h/2 + 50);
		c.strokeStyle = "rgba(50, 50, 50, 0.5)";
		c.lineWidth = 5;
		c.stroke();
		//console.log(x)
	}
}

function normalize(vx, vy) {
	if(vx == 0 && vy == 0) {
		return [0, 0];
	}
	return [vx/Math.sqrt(vx**2 + vy**2), vy/Math.sqrt(vx**2 + vy**2)]
}



//-----------------------------------------SETINTERVAL
// Ne JAMAIS faire de console.log dans une boucle rapide et infinie
// const game = (timestamp) => {
// 	c.clearRect(0,0,w,h)

// 	//---------------------------------------MAP
// 	drawGrid();
// 	drawMap();

// 	//------------------------------------OTHRE PLAYERS
// 	drawPlayers();


// 	//--------------------------------------JOUEUR
// 	c.beginPath()
// 	c.arc(w/2,h/2,player.r, 0, Math.PI*2)
// 	c.fillStyle = player.color
// 	c.fill()
	

// 	//---------------------------------------LOG
// 	c.beginPath()
// 	c.font = "25px sans-serif";
// 	c.fillStyle = "white"
//   	c.fillText("Pseudo : " + player.pseudo + " hp : " + player.hp, 10, 50);
//   	c.fill()


// 	//------------------------------PLAYERS LIST
// 	for(let i = 0; i<players.length; i++) {
// 		c.beginPath()
// 		c.font = "20px sans-serif";
// 		c.fillStyle = players[i].color;
// 		c.fillText(players[i].pseudo + " : " + players[i].score, w-350, 50 + 25*i);
// 		c.fill()
// 	}


// 	//---------------------------BULLETS
// 	for(let bullet of bullets) {
// 		c.beginPath()
// 		c.fillStyle = "yellow";
// 		c.arc(bullet.x - player.x + w/2, bullet.y - player.y + h/2, 10, 0, Math.PI*2);
// 		c.fill();
// 	}

// 	requestAnimationFrame(game);
// }
// requestAnimationFrame(game);

let _game = setInterval(function() {
	c.clearRect(0,0,w,h)

	//---------------------------------------MAP
	drawGrid();
	drawMap();
	drawWeapons();

	//------------------------------------OTHRE PLAYERS
	drawPlayers();

	//-------------WEAPONS EFFECT
	if(player.weapon == "assaultRifle") {
		c.beginPath();
		c.moveTo(w/2, h/2);
		c.lineTo(mouse.x, mouse.y);
		c.strokeStyle = "rgba(130, 0, 0, 0.5)";
		c.lineWidth = 5;
		c.stroke();
	}
	if(player.weapon == "sniper") {
		for(p of players) {
			c.beginPath();
			c.moveTo(w/2, h/2);
			c.lineTo(p.x-player.x+w/2, p.y-player.y+h/2);
			c.strokeStyle = "rgba(113, 5, 130, 0.5)";
			c.lineWidth = 5;
			c.stroke();
		}
	}
	if(player.weapon == "machinegun") {
		c.beginPath();
		c.font = "20px sans-serif";
		c.fillStyle = "white"
		c.fillText("press A to enable/disable autofire", 20, h-5);
		c.fill();
	}


	//--------------------------------------JOUEUR
	c.beginPath()
	c.arc(w/2,h/2,player.r, 0, Math.PI*2)
	c.fillStyle = player.color
	c.fill()
	

	//---------------------------------------LOG
	c.beginPath()
	c.font = "25px sans-serif";
	c.fillStyle = "white"
  	c.fillText("Pseudo : " + player.pseudo + " hp : " + player.hp, 10, 50);
  	c.fill()


	//------------------------------PLAYERS LIST
	for(let i = 0; i<players.length; i++) {
		c.beginPath()
		c.font = "20px sans-serif";
		c.fillStyle = players[i].color;
		c.fillText(players[i].pseudo + " : " + players[i].score, w-350, 50 + 25*i);
		c.fill()
	}

	//---------------------------WEAPON
	c.beginPath();
	c.font = "20px sans-serif";
	c.fillStyle = "white"
	c.fillText(player.weapon, 20, h-35);
	c.fill();


	//---------------------------BULLETS
	for(let bullet of bullets) {
		c.beginPath()
		c.fillStyle = "yellow";
		c.arc(bullet.x - player.x + w/2, bullet.y - player.y + h/2, 10, 0, Math.PI*2);
		c.fill();
	}
	for(let rocket of rockets) {
		c.beginPath()
		c.fillStyle = "grey";
		c.arc(rocket.x - player.x + w/2, rocket.y - player.y + h/2, 10, 0, Math.PI*2);
		c.fill();
	}
	for(let explosion of explosions) {
		c.beginPath()
		c.fillStyle = "orange";
		c.arc(explosion.x - player.x + w/2, explosion.y - player.y + h/2, explosion.r, 0, Math.PI*2)
		c.fill();
	}
}, 30);
