const uuidv4 = require('uuid/v4');
const express = require('express')
const Player = require('../libs/player.js')
const Game = require('../libs/game.js')
const router = express.Router()

let GameList = [];

router.get('/games/:id', function (req, res, next) {
	res.send("Your Game id is " + req.params.id)
})

router.get("/list", function (req, res, next) {
	let temp = []
	for (game of GameList)
		temp.push(game.currentGame)

	res.send(temp)
})

router.post('/create', function (req, res, next) {

	let name = req.body.name;
	let maxPlayers = req.body.maxPlayers || 0;
	let packs = req.body.packs;
	let players = [];
	let password = req.body.password;
	let gameID = uuidv4();

	console.log(name)
	if (name == null) {
		next("Please specify a name for the lobby")
		return
	}
	if (maxPlayers <= 1) {
		next("You have to have a lobby with more than 1 person")
		return
	}
	if (packs == []) {
		next("No packs selected please select some packs")
		return
	}
	let current = new Game(name, password, maxPlayers, packs, players);

	GameList.push(current)

	res.send(current.currentGame)

})

router.get('/players', function (req, res, next) {
	let gameID = req.body.gameID
	let game = getGameFromGames(gameID);

	res.send(game.players)
})

router.post('/join', function (req, res, next) {
	let userID = req.body.userID
	let userNick = req.body.nickname
	let gameID = req.body.gameID
	let pwd = req.body.password
	let score = 0;

	let game = getGameFromGames(gameID)

	if (!game) {
		res.status("401").send("Invalid Game")
		return
	}
	if (pwd != game.pwd) {
		res.status("401").send("Invalid Password")
		return
	}
	if (game.players.length == game.maxPlayers) {
		res.status("401").send("The game is full unable to join")
	}

	game.players.push({
		"userID": userID,
		"nickname": userNick,
		"score": score
	})
	res.send("Sucessfully joined game:" + gameID)
})

router.get("/:id/score", function (req, res, next) {
	let playerID = req.body.playerID

	let game = new Game(getGameFromGames(gameID));

	let player = game.getPlayer(playerID)
	if(!player) {
		next("Unable to find player")
	}
	res.send(player.score)
})

router.post('/scorepoint', function (req, res, next) {
	let gameID = req.body.gameID
	let playerID = req.body.playerID

	let game = new Game(getGameFromGames(gameID));

	let player = game.getPlayer(playerID)
	if(!player) {
		next("Unable to find player")
	}

	let newScore = player.score +=1

	player.score(newScore)

	return player


})

function getGameFromGames(GameID) {
	for (Game in GameList) {
		if (GameID == Game.id) {
			return Game
		}
	}
	return false
}

module.exports = router;