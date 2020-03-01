const uuidv4 = require('uuid/v4');
const express = require('express');
const Player = require('../libs/player.js');
const Game = require('../libs/game.js');
const router = express.Router();

let GameList = [];

router.get('/games/:id', function (req, res, next) {
  res.send('Your Game id is ' + req.params.id);
});

router.get('/list', function (req, res, next) {
  let temp = [];
  for (const game of GameList) {
    temp.push(game.currentGame);
  }

  res.send(temp);
});

router.post('/create', function (req, res, next) {
  console.log(req.body);
  let name = req.body.name;
  let maxPlayers = req.body.maxPlayers || 0;
  let packs = req.body.packs;
  let players = [];
  let password = req.body.password;
  let owner = req.body.owner;

  console.log(name);
  if (name == null) {
    res.status(500).send('Please specify a name for the lobby');
    return;
  }
  if (maxPlayers <= 1) {
    res.status(500).send('You have to have a lobby with more than 1 person');
    return;
  }
  if (packs === []) {
    res.status(500).send('No packs selected please select some packs');
    return;
  }
  let current = new Game(name, password, maxPlayers, packs, players, owner);

  GameList.push(current);

  res.send(current.currentGame);

});

router.get('/players', function (req, res, next) {
  let gameID = req.body.gameID;
  let game = getGameFromGames(gameID);

  res.send(game.players);
});

router.post('/join', function (req, res, next) {
  let userNick = req.body.nickname;
  let gameID = req.body.gameID;
  let pwd = req.body.password;

  console.log(getGameFromGames(gameID));

  let game = getGameFromGames(gameID);
  console.log('The current game is:' + game);

  if (!game) {
    res.status(400).json({'error': 'Invalid Game ID', 'errorID': 404});
    return;
  }
  console.log(pwd, game.password);
  if (pwd !== game.password) {
    res.status(400).json({'error': 'Invalid Password', 'errorID': 401});
    return;
  }
  console.log(game, game.players, game.maxPlayers);
  if (game.players.size === game.maxPlayers) {
    res.status(400).json({'error': 'The game is full unable to join', 'errorID': 413});
    return;
  }

  let response = game.createPlayer(userNick);
  if (!response) {
    res.status(400).json({'error': 'There was an error adding this person to the lobby', 'errorID': 400});
    return;
  }

  let owner = userNick === game._owner;

  res.json({'gameID': gameID, 'userID': response, 'gameName': game._name, 'owner': owner});
});

router.get('/:id/score', function (req, res, next) {
  let playerID = req.body.playerID;

  let game = new Game(getGameFromGames(gameID));

  let player = game.getPlayer(playerID);
  if (!player) {
    res.status(500).send('Unable to find player');
    return;
  }
  res.send(player.score);
});

router.post('/scorepoint', function (req, res, next) {
  let gameID = req.body.gameID;
  let playerID = req.body.playerID;

  let game = new Game(getGameFromGames(gameID));

  let player = game.getPlayer(playerID);
  if (!player) {
    res.status(500).send('Unable to find player');
    return;
  }

  let newScore = player.score += 1;

  player.score(newScore);

  return player;

});

function getGameFromGames(GameID) {
  for (const game of GameList) {
    console.log('Looking at game', game);
    if (GameID === game.id) {
      return game;
    }
  }
  return false;
}

module.exports = router;
