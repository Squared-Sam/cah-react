const uuidv4 = require('uuid/v4');
const express = require('express')
const router = express.Router()

let GameList = {};

router.get('/:id', function (req, res, next) {
	res.send("Your Game id is " + req.params.id)
})

router.get("/list", function (req, res, next) {
	let SanitizedList = [];

	for (Game in GameList) {
		let temp = Game
		temp.pop(password)
		SanitizedList.push(temp)
	}
	req.send(SanitizedList)
})

router.post('/create', function (req, res, next) {
	let name = req.body.name;
	let maxPlayers = req.body.maxPlayers;
	let packs = req.body.packs;
	let players = [];
	let password = req.body.password;
	let gameID = uuidv4();

	let game = {
		"ID": gameID,
		"LobbyName": name,
		"LobbyPWD": password,
		"maxPlayers": maxPlayers,
		"Packs": packs,
		"players": players
	}
	GameList.push(game)

	res.send(game)

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
	let game = getGameFromGames = req.params.id;
	let player = getPlayerFromGame(playerID, game)

	res.send(player.score);
})

function getPlayerFromGame(playerID, game) {
	for (player in game.players) {
		if (player.id = playerID) {
			return player
		}
	}
	return false
}

function getGameFromGames(GameID) {
	for (Game in GameList) {
		if (GameID == Game.gameID) {
			return Game
		}
	}
	return false
}

module.exports = router;