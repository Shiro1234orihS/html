const { Server } = require("socket.io")
const { players, isAdmin } = require("./users.js")


const io = new Server({
  cors: {
    origin: "*"
  }
});


const sockets = {

}

const weapons = {
	"pistol" : {
		damage: 10,
		speed: 9,
		shootDelay: 500,
		bulletLifeTime: 1750,
		type: "classic"
	},
	"shootGun" : {
		damage: 20,
		speed: 12,
		shootDelay: 750,
		bulletLifeTime: 1000,
		type: "classic"
	},
	"assaultRifle" : {
		damage: 8,
		speed: 15,
		shootDelay: 250,
		bulletLifeTime: 3500,
		type: "classic"
	},
	"sniper" : {
		damage: 75,
		speed: 35,
		shootDelay: 1500,
		bulletLifeTime: 10000,
		type: "classic"
	},
	"submachine" : {
		damage: 5,
		speed: 12,
		shootDelay: 30,
		bulletLifeTime: 750,
		type: "classic"
	},
	"machinegun" : {
		damage: 5,
		speed: 15,
		shootDelay: 5,
		bulletLifeTime: 5000,
		type: "classic"
	},
	"rocketLauncher" : {
		damage: 0, // les dégats viennent de l'explosion
		speed: 10,
		shootDelay: 5000,
		bulletLifeTime: 5000,
		type: "explosive"
	}
}

// -----------------------------------------------------------MAP
const map = {
	width: 3000,
	height: 3000,
	gridGap: 50,
	shapes: [
		{ shape: "rectangle", x: 0, y: 0, w: 20, h: 3000, color: "rgba(255,255,255,.5)"},
		{ shape: "rectangle", x: 20, y: 0, w: 2980, h: 20, color: "rgba(255,255,255,.5)"},
		{ shape: "rectangle", x: 2980, y: 20, w: 20, h: 2980, color: "rgba(255,255,255,.5)"},
		{ shape: "rectangle", x: 20, y: 2980, w: 2960, h: 20, color: "rgba(255,255,255,.5)"},

		{ shape: "circle", x: 1000, y: 1000, r: 150, color: "rgba(200,200,0,.5)"},
		{ shape: "circle", x: 2000, y: 2200, r: 150, color: "rgba(200,200,0,.5)"},
		{ shape: "circle", x: 2200, y: 2700, r: 200, color: "rgba(255,200,100,.5)"},
		{ shape: "rectangle", x: 2500, y: 2200, w: 300, h: 200, color: "rgba(50,200,200,.5)"},
		{ shape: "rectangle", x: 300, y: 900, w: 50, h: 600, color: "rgba(50,200,200,.5)"},


		{ shape: "rectangle", x: 500, y: 2000, w: 500, h: 50, color: "rgba(255,100,200,.5)"},
		{ shape: "rectangle", x: 500, y: 2500, w: 500, h: 50, color: "rgba(255,100,200,.5)"},
		{ shape: "rectangle", x: 500, y: 2050, w: 50, h: 350, color: "rgba(255,100,200,.5)"},
		{ shape: "rectangle", x: 950, y: 2150, w: 50, h: 350, color: "rgba(255,100,200,.5)"},

		{ shape: "rectangle", x: 90, y: 2500, w: 250, h: 50, color: "rgba(202,97,255,.5)"},
		{ shape: "rectangle", x: 400, y: 2700, w: 50, h: 280, color: "rgba(202,97,255,.5)"},
		{ shape: "rectangle", x: 200, y: 2800, w: 200, h: 50, color: "rgba(202,97,255,.5)"},
		

	],
	weapons: [
		{weapon: "shootGun", x: 751, y: 2277, color: "rgba(133,53,48,1)", size: 15},
		{weapon: "shootGun", x: 1900, y: 1500, color: "rgba(133,53,48,1)", size: 15},
		{weapon: "sniper", x: 50, y: 1200, color: "rgba(237,199,128,1)", size: 20},
		{weapon: "sniper", x: 2705, y: 2725, color: "rgba(237,199,128,1)", size: 20},
		{weapon: "submachine", x: 760, y: 220, color: "rgba(74,89,86,1)", size: 10},
		{weapon: "submachine", x: 340, y: 2915, color: "rgba(74,89,86,1)", size: 10},
		{weapon: "assaultRifle", x: 2570, y: 90, color: "rgba(53,63,84,1)", size: 15},
		{weapon: "assaultRifle", x: 930, y: 1620, color: "rgba(53,63,84,1)", size: 15},
		{weapon: "pistol", x: 1900, y: 1300, color: "rgba(75,53,84,1)", size: 10},
		{weapon: "pistol", x: 1390, y: 2741, color: "rgba(75,53,84,1)", size: 10},

		{weapon: "machinegun", x: 2955, y: 1385, color: "rgba(143,101,73,1)", size: 5},
		{weapon: "rocketLauncher", x: 40, y: 45, color: "rgba(50,50,50,1)", size: 20},
	]
}
for (let i=0; i<14; i++) 
	map.shapes.push({ shape: "rectangle", x: 150+i*200, y: 200+i%2*200, w: 30, h: 200, color: "rgba("+(100+155*i/14)+",200,200,.5)"});

for (let i=0; i<5; i++)
	for (let j=0; j<5; j++)
		map.shapes.push({ shape: "circle", x: 1500+j*200, y: 1000+i*200, r: 30+Math.random()*20, color: "rgba(200,"+(100+155*i/5)+","+(255-110*j/5)+",.5)"})


//-----------------------------------------------------------COLLISIONS
function inShape(x,y,r) {
	let collide = false
	map.shapes.forEach(function (shape) {
		if (shape.shape == "circle") {
			let d = Math.sqrt( Math.pow(shape.x-x, 2) + Math.pow(shape.y-y, 2) )
			if (d <= shape.r+r) {
				collide = true
			}
		
		} else if (shape.shape == "rectangle") {
			if (x+r > shape.x && y+r>shape.y && 
				  x-r<shape.x+shape.w && y-r<shape.y+shape.h)
				collide = true

		}

	})
	return collide
}

function inWeapon(x, y, r) {
	let collide = null;
	map.weapons.forEach(function (weapon) {
		let d = Math.sqrt(Math.pow(weapon.x-x, 2) + Math.pow(weapon.y-y, 2));
		if(d <= weapon.size+r) {
			collide = weapon.weapon;
		}
	})
	return collide;
}

//------------------------------------------------------------LOBBIES

const MAX_PER_LOBBY = 100

const lobbies = []

setInterval(_ => {

	lobbies.forEach((lobby,il) => {
		let s = ""
		lobby.players.forEach(player => {
			s += player.pseudo + " "
		})
		console.log("-----------------------"+il+"---------")
		console.log(s)
	})
}, 2000)

//----------------------PLAYERS OF LOBBY
setInterval(_ => {
	lobbies.forEach(lobby => {
		list = lobby.players.map( p => {
			return {
				pseudo: p.pseudo,
				login: p.login,
				x: p.x,
				y: p.y,
				r: p.r,
				hp: p.hp,
				color: p.color,
				score: p.score,
				weapon: p.weapon
			}
		})

		lobby.players.forEach(player => {
			if (player.socket) {
				player.socket.emit("players", list)
			}
		})
	})
}, 32)

//-----------------------------------------------------------BULLETS

setInterval(function() {

	lobbies.forEach(lobby => {
		//--move bullets
		lobby.bullets.forEach((bullet,ib) => {
			bullet.x += bullet.vx * weapons[players[bullet.owner].weapon].speed;
			bullet.y += bullet.vy * weapons[players[bullet.owner].weapon].speed;
			bullet.currentLifeTime += (Date.now() - bullet.lastTime);
			bullet.lastTime = Date.now();
			if (inShape(bullet.x,bullet.y,3))
				lobby.bullets.splice(ib,1)
			else if(bullet.currentLifeTime >= bullet.lifeTime)
				lobby.bullets.splice(ib, 1)
			//--player shooted
			lobby.players.forEach((player,ip) => {
				if (Math.abs(bullet.x-player.x) < player.r &&
				 	  Math.abs(bullet.y-player.y) < player.r) {
					
					player.hp -= weapons[players[bullet.owner].weapon].damage;
					lobby.bullets.splice(ib,1)


					if (player.hp<=0) {
						// lobby.players.splice(ip,1)
						if (player.socket)
							player.socket.emit("dead", "GG")
						player.hp = 100
						let pos = { x: 0, y: 0 }
						while (inShape(pos.x, pos.y, player.r)) {
							pos.x = Math.floor(Math.random()*(map.width-200)+100)
							pos.y = Math.floor(Math.random()*(map.height-200)+100)
						}
						player.x = pos.x
						player.y = pos.y

						let killer = players[bullet.owner]
						killer.score ++

					}

				}
			}) 
		})
		//--move rockets
		lobby.rockets.forEach((rocket, ir) => {
			rocket.x += rocket.vx * weapons[players[rocket.owner].weapon].speed;
			rocket.y += rocket.vy * weapons[players[rocket.owner].weapon].speed;
			rocket.currentLifeTime += (Date.now() - rocket.lastTime);
			rocket.lastTime = Date.now();
			if(inShape(rocket.x, rocket.y, 3)) {
				lobby.explosions.push({
					owner: rocket.owner,
					x: rocket.x,
					y: rocket.y,
					r: 125,
					damage: 150,
					lifeTime: 1000,
					currentLifeTime: 0,
					lastTime: Date.now()
				});
				lobby.rockets.splice(ir, 1)
			}
			else if(rocket.currentLifeTime >= rocket.lifeTime) {
				lobby.explosions.push({
					owner: rocket.owner,
					x: rocket.x,
					y: rocket.y,
					r: 125,
					damage: 150,
					lifeTime: 1000,
					currentLifeTime: 0,
					lastTime: Date.now()
				});
				lobby.rockets.splice(ir, 1)
			}
			//-- Player shooted
			lobby.players.forEach((player,ip) => {
				if (Math.abs(rocket.x-player.x) < player.r && Math.abs(rocket.y-player.y) < player.r) {
					lobby.explosions.push({
						owner: rocket.owner,
						x: rocket.x,
						y: rocket.y,
						r: 125,
						damage: 150,
						lifeTime: 1000,
						currentLifeTime: 0,
						lastTime: Date.now()
					});
					lobby.rockets.splice(ir, 1)
				}
			})
		})
		//--Change explosion
		lobby.explosions.forEach((explosion, ie) => {
			explosion.currentLifeTime += (Date.now() - explosion.lastTime)
			explosion.lastTime = Date.now()
			if(explosion.currentLifeTime >= explosion.lifeTime) {
				lobby.explosions.splice(ie, 1)
			}
			//--player exploded
			lobby.players.forEach((player,ip) => {
				if (Math.abs(explosion.x-player.x) < explosion.r &&
				 	  Math.abs(explosion.y-player.y) < explosion.r) {
					
					player.hp -= explosion.damage;


					if (player.hp<=0) {
						// lobby.players.splice(ip,1)
						if (player.socket)
							player.socket.emit("dead", "GG")
						player.hp = 100
						let pos = { x: 0, y: 0 }
						while (inShape(pos.x, pos.y, player.r)) {
							pos.x = Math.floor(Math.random()*(map.width-200)+100)
							pos.y = Math.floor(Math.random()*(map.height-200)+100)
						}
						player.x = pos.x
						player.y = pos.y

						let killer = players[explosion.owner]
						if(player.login != explosion.owner)
							killer.score ++

					}

				}
			}) 
		})
		//--sending bullets to everyone
		lobby.players.forEach(player => {
			if (player.socket)
				player.socket.emit("bullets",lobby.bullets)
				player.socket.emit("rockets",lobby.rockets)
				player.socket.emit("explosions",lobby.explosions)
		})
	})

}, 27)


//-------------------------------------------------------------CONNECTED
io.on("connect", (socket) => {
	// console.log("open: " + socket.handshake.address)

	let player = null

	//---------------------------------------------LOGIN -> LOBBY
	socket.on("login", function(data) {
		if (data)
			if (players[data.login]) {
				if (players[data.login].passwd == data.passwd) {
					// console.log("connected: "+data.login)
					player = players[data.login]
					sockets[socket] = player
					player.socket = socket

					socket.emit("map",map)

					//-------------------------------------POS
					let pos = { x: 0, y: 0, r: player.r, color: player.color, hp: player.hp, pseudo: player.pseudo, weapon: player.weapon }
					while (inShape(pos.x, pos.y, player.r)) {
						pos.x = Math.floor(Math.random()*(map.width-200)+100)
						pos.y = Math.floor(Math.random()*(map.height-200)+100)
					}
					player.x = pos.x
					player.y = pos.y
					socket.emit("auth", { error: false, pseudo: player.pseudo })
					socket.emit("position", pos)

					//------------------------------------ENTER LOBY
					let lobby = null
					i = 0
					while (i<lobbies.length && lobby == null) {
						if (lobbies[i].players.length < MAX_PER_LOBBY)
						 // && 
						// 	  !lobbies[i].playing)
							lobby = lobbies[i]
						i++
					}
					
					if (lobby == null) {
						lobby = {
							playing: false,
							players: [ player ],
							bullets: [],
							rockets: [],
							explosions: [],
						}
						lobbies.push(lobby)
					} else {
						// let idx = lobby.players.map( p => p.login ).indexOf(player.login)  
						// if (idx != -1) {
						// 	lobby.players.splice(idx,1)
						// }
						lobby.players.push(player)
					}

					player.lobby = lobby

				} else {
					socket.emit("auth", { error: true })
				}
			}
	})


	//--------------------------------------------------------START
	socket.on("start", _ => {
		if (player) {
			player.lobby.playing = true
			player.lobby.players.forEach( p => {
				if (p.socket)
					p.socket.emit("start", { })
			})

		}
	})	

	//--------------------------------------------------------MOVE
	let timestamp = Date.now()
	socket.on("move", function(data) {
		if (player && Date.now()-timestamp > 20) {
			deltatime = Date.now()-timestamp;
			timestamp = Date.now()
			let speed = 7
			if(player.weapon == "machinegun") {
				speed = 3;
			}
			if(player.weapon == "pistol") {
				speed = 12;
			}
			let d = Math.sqrt(Math.pow(data.vx,2)+Math.pow(data.vy,2))
			let x
			let y
			if (d != 0) {
				x = player.x+data.vx*speed/d
				y = player.y+data.vy*speed/d

			} else {
				x = player.x+data.vx*speed
				y = player.y+data.vy*speed

			}
			if (!inShape(x,y,player.r)) {
				player.x = x
				player.y = y
			}
			let w = inWeapon(x, y, player.r);
			if(w != null) {
				player.weapon = w;
				socket.emit("weapon", w);
			}
		}
	})
	setInterval(_ => {
		if (player)
			socket.emit("position", 
				{
					x: player.x, 
				  y: player.y, 
				  r: player.r, 
				  color: player.color, 
				  hp: player.hp,
				  pseudo: player.pseudo,
				  weapon: player.weapon
				})

	},10)

	//----------------------------------------------------------SHOOT
	let timestampBullet = Date.now()
	socket.on("shoot", function(data) {
		if (player) {
			if (Date.now() - timestampBullet > weapons[player.weapon].shootDelay) {
				if (player) {
					let d = Math.sqrt(Math.pow(data.vx,2)+Math.pow(data.vy,2))
					if (d != 0) {
						player.lobby.bullets.push(
							{ 
							  x: player.x+data.vx*45/d, 
							  y: player.y+data.vy*45/d, 
							  vx: data.vx/d, 
							  vy: data.vy/d,
							  owner: player.login,
							  lifeTime: weapons[player.weapon].bulletLifeTime,
							  currentLifeTime: 0,
							  lastTime: Date.now(),
							  type: "classic"
							}
						);
						if(player.weapon == "shootGun") {
							player.lobby.bullets.push(
								{ x: player.x+data.vx*45/d, 
								  y: player.y+data.vy*45/d, 
								  vx: (data.vx/d) * 0.96 - (data.vy/d) * 0.25, 
								  vy: (data.vx/d) * 0.25 + (data.vy/d) * 0.96,
								  owner: player.login,
								  lifeTime: weapons[player.weapon].bulletLifeTime,
							  	  currentLifeTime: 0,
								  lastTime: Date.now()
								}
							);
							player.lobby.bullets.push(
								{ x: player.x+data.vx*45/d, 
								  y: player.y+data.vy*45/d, 
								  vx: (data.vx/d) * 0.96 + (data.vy/d) * 0.25, 
								  vy: -(data.vx/d) * 0.25 + (data.vy/d) * 0.96,
								  owner: player.login,
								  lifeTime: weapons[player.weapon].bulletLifeTime,
							  	  currentLifeTime: 0,
								  lastTime: Date.now()
								}
							);
						}

					}
				}
				timestampBullet = Date.now()	
			}

		}
	})

	let timestampRocket = Date.now();
	socket.on("shootRocket", function(data) {
		if (player) {
			if (Date.now() - timestampRocket > weapons[player.weapon].shootDelay) {
				if (player) {
					let d = Math.sqrt(Math.pow(data.vx,2)+Math.pow(data.vy,2))
					if (d != 0) {
						player.lobby.rockets.push(
							{ 
							  x: player.x+data.vx*45/d, 
							  y: player.y+data.vy*45/d, 
							  vx: data.vx/d, 
							  vy: data.vy/d,
							  owner: player.login,
							  lifeTime: weapons[player.weapon].bulletLifeTime,
							  currentLifeTime: 0,
							  lastTime: Date.now(),
							  type: "explosive"
							}
						);
					}
				}
				timestampRocket = Date.now()	
			}

		}
	})


	//---------------------------------------------------------DISCONNECT
	socket.on("disconnect", function(data) {
		if (player) {
			player.socket = null
			player.lobby.players.splice(player.lobby.players.indexOf(player),1)
			if (player.lobby.players.length == 0)
				player.lobby.playing = false
			delete sockets[socket]
		}
	})

	
})





io.listen(9541);
