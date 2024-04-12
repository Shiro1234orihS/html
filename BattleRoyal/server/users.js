




const players = {
	ldama:  { score: 0, pseudo: "Luc Damas", login: "ldama",  x: 0, y: 0, r: 20, hp: 100, color: "orange", socket: null,passwd: "hop", weapon: "pistol" },
	dylan:  { score: 0, pseudo: "DyDy_LePluBo", login: "dylan",  x: 0, y: 0, r: 20, hp: 100, color: "blue", socket: null,passwd: "dylan", weapon: "pistol" },
	victor:  { score: 0, pseudo: "Vicousse", login: "victor",  x: 0, y: 0, r: 20, hp: 100, color: "red", socket: null,passwd: "V1ct0r", weapon: "pistol" },
	arcturus:  { score: 0, pseudo: "xArcturus", login: "arcturus",  x: 0, y: 0, r: 20, hp: 100, color: "purple", socket: null,passwd: "arthur_le_gigolo", weapon: "pistol" },
	riina:  { score: 0, pseudo: "riina", login: "riina",  x: 0, y: 0, r: 20, hp: 100, color: "pink", socket: null,passwd: "riina_dolfin", weapon: "pistol" },
	lekdo:  { score: 0, pseudo: "Lekdo", login: "lekdo",  x: 0, y: 0, r: 20, hp: 100, color: "green", socket: null,passwd: "RL_lekdo", weapon: "pistol" },
	dat_sword:  { score: 0, pseudo: "Dat_Sword", login: "dat_sword",  x: 0, y: 0, r: 20, hp: 100, color: "green", socket: null,passwd: "dat_sword_super", weapon: "pistol" },
	gwuigwui:  { score: 0, pseudo: "Gwuigwui", login: "gwuigwui",  x: 0, y: 0, r: 20, hp: 100, color: "grey", socket: null,passwd: "gwuigwui_conqueror", weapon: "pistol" },
	saml:  { score: 0, pseudo: "Saml74", login: "saml",  x: 0, y: 0, r: 20, hp: 100, color: "red", socket: null,passwd: "saml_stone", weapon: "pistol" },
	gadzouil:  { score: 0, pseudo: "Gad Zouil", login: "gadzouil",  x: 0, y: 0, r: 20, hp: 100, color: "blue", socket: null,passwd: "gadzouil_koukou", weapon: "pistol" },
	candyce:  { score: 0, pseudo: "Candyce", login: "candyce",  x: 0, y: 0, r: 20, hp: 100, color: "purple", socket: null,passwd: "cancandydyce", weapon: "pistol" },
	ricardo:  { score: 0, pseudo: "Ricardo", login: "ricardo",  x: 0, y: 0, r: 20, hp: 100, color: "red", socket: null,passwd: "ricardo_NE", weapon: "pistol" },
	robby:  { score: 0, pseudo: "Robby", login: "robby",  x: 0, y: 0, r: 20, hp: 100, color: "black", socket: null,passwd: "la_casa_de_memes", weapon: "pistol" },
	elimars:  { score: 0, pseudo: "Eli_mars74", login: "elimars",  x: 0, y: 0, r: 20, hp: 100, color: "red", socket: null,passwd: "eliasteroide", weapon: "pistol" },
	val:  { score: 0, pseudo: "Val", login: "val",  x: 0, y: 0, r: 20, hp: 100, color: "green", socket: null,passwd: "val_vador", weapon: "pistol" },
}

const beforeAfter = [
	{ before: "Dark", after: "74" },
	{ before: "", after: ".the.goat" },
	{ before: "XxX_", after: "_XxX" },
	{ before: "!!__", after: "__!!" },
	{ before: "Little_", after: "" },
	{ before: "", after: "TheBG!" },
	{ before: "Big-", after: "" },
	{ before: "Lord", after: "" },
	{ before: "Shadow", after: "!" },
	{ before: "Master", after: "_74" },
	{ before: "Master", after: "" },
	{ before: "_Moon_", after: "_" },
	{ before: "Tiger-", after: "" },
	{ before: "\\o/-", after: "-\\o/" },
	{ before: "Smart", after: "" },
	{ before: "Warrior", after: "" },
	{ before: "Killer-", after: "" },
	{ before: "", after: "Mooonster" },
	{ before: "Ugly", after: "!" },
	{ before: "Fluffy", after: "" },
	{ before: "Kawaiii", after: "" },
	{ before: ".Max.APM.", after: "." },
]

const CSS_COLOR_NAMES = {
  Aqua: '#00FFFF',
  Aquamarine: '#7FFFD4',
  Bisque: '#FFE4C4',
  Blue: '#0000FF',
  BlueViolet: '#8A2BE2',
  Brown: '#A52A2A',
  BurlyWood: '#DEB887',
  CadetBlue: '#5F9EA0',
  Chartreuse: '#7FFF00',
  Chocolate: '#D2691E',
  Coral: '#FF7F50',
  CornflowerBlue: '#6495ED',
  Crimson: '#DC143C',
  Cyan: '#00FFFF',
  DarkBlue: '#00008B',
  DarkCyan: '#008B8B',
  DarkGoldenRod: '#B8860B',
  DarkGreen: '#006400',
  DarkKhaki: '#BDB76B',
  DarkMagenta: '#8B008B',
  DarkOliveGreen: '#556B2F',
  DarkOrange: '#FF8C00',
  DarkOrchid: '#9932CC',
  DarkRed: '#8B0000',
  DarkSalmon: '#E9967A',
  DarkSlateBlue: '#483D8B',
  DarkTurquoise: '#00CED1',
  DarkViolet: '#9400D3',
  DeepPink: '#FF1493',
  DeepSkyBlue: '#00BFFF',
  DodgerBlue: '#1E90FF',
  FireBrick: '#B22222',
  ForestGreen: '#228B22',
  Fuchsia: '#FF00FF',
  Gold: '#FFD700',
  GoldenRod: '#DAA520',
  Green: '#008000',
  GreenYellow: '#ADFF2F',
  HotPink: '#FF69B4',
  IndianRed: '#CD5C5C',
  Khaki: '#F0E68C',
  LawnGreen: '#7CFC00',
  LightBlue: '#ADD8E6',
  LightCoral: '#F08080',
  LightGreen: '#90EE90',
  LightPink: '#FFB6C1',
  LightSalmon: '#FFA07A',
  LightSeaGreen: '#20B2AA',
  LightSkyBlue: '#87CEFA',
  LightSteelBlue: '#B0C4DE',
  Lime: '#00FF00',
  LimeGreen: '#32CD32',
  Magenta: '#FF00FF',
  Maroon: '#800000',
  MediumAquaMarine: '#66CDAA',
  MediumBlue: '#0000CD',
  MediumOrchid: '#BA55D3',
  MediumPurple: '#9370DB',
  MediumSeaGreen: '#3CB371',
  MediumSlateBlue: '#7B68EE',
  MediumSpringGreen: '#00FA9A',
  MediumTurquoise: '#48D1CC',
  MediumVioletRed: '#C71585',
  MidnightBlue: '#191970',
  Navy: '#000080',
  Olive: '#808000',
  OliveDrab: '#6B8E23',
  Orange: '#FFA500',
  OrangeRed: '#FF4500',
  Orchid: '#DA70D6',
  PaleGreen: '#98FB98',
  PaleTurquoise: '#AFEEEE',
  PaleVioletRed: '#DB7093',
  Peru: '#CD853F',
  Pink: '#FFC0CB',
  Plum: '#DDA0DD',
  PowderBlue: '#B0E0E6',
  Purple: '#800080',
  RebeccaPurple: '#663399',
  Red: '#FF0000',
  RosyBrown: '#BC8F8F',
  RoyalBlue: '#4169E1',
  SaddleBrown: '#8B4513',
  Salmon: '#FA8072',
  SandyBrown: '#F4A460',
  SeaGreen: '#2E8B57',
  Sienna: '#A0522D',
  SkyBlue: '#87CEEB',
  SlateBlue: '#6A5ACD',
  SpringGreen: '#00FF7F',
  SteelBlue: '#4682B4',
  Tan: '#D2B48C',
  Teal: '#008080',
  Thistle: '#D8BFD8',
  Tomato: '#FF6347',
  Turquoise: '#40E0D0',
  Violet: '#EE82EE',
  Wheat: '#F5DEB3',
  Yellow: '#FFFF00',
  YellowGreen: '#9ACD32',
};

const colorNames = Object.keys(CSS_COLOR_NAMES)


Object.keys(players).forEach( login => {
	if (login != "ldama" && login != "bdiard") {
		let player = players[login]
		code = 0
		for (let c of player.login.split(""))
			code += c.charCodeAt(0)
		let ba = beforeAfter[code % beforeAfter.length]
		player.pseudo = ba.before + player.pseudo + ba.after
		player.color = colorNames[code % colorNames.length]
	}
})

// Object.keys(players).forEach( login => {
// 	console.log( players[login].pseudo )
// })


function isAdmin(login) {
	return login == "ldama" || login =="bdiard"
}



exports.players = players
exports.isAdmin = isAdmin


