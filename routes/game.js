const uuidv4 = require('uuid/v4');
const express = require('express')
const router = express.Router()

let GameList = [];

router.get('/:id', function (req, res, next) {
	res.send("Your Game id is " + req.params.id)
})

router.post('/create', function (req, res, next) {
	let maxPlayers = req.body.maxPlayers;
	let packs = req.body.packs;
	let players = [];
	let password = req.body.password;
	let gameID = uuidv4();

	let game = {
		gameID,
		password,
		maxPlayers,
		packs,
		players,
	}
	GameList.push(game)

	res.send(game)

})

router.get('/players', function(req,res,next) {
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
		res.status("505").send("Invalid Game")
		return
	}
	if (pwd != game.pwd) {
		res.status().send("Invalid Password")
		return
	}
	game.players.push({
		userID,
		userNick,
		score
	})
	res.send("Sucessfully joined game:" + gameID)
})



function getGameFromGames(GameID) {
	for (Game in GameList) {
		if (GameID == Game.gameID) {
			return Game
		}
	}
	return false
}

module.exports = router;