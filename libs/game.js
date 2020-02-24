const uuidv4 = require("uuid/v4");
const Player = require("./player.js");

class Game {
  constructor(name, password, maxPlayers, packs, players) {
    this._id = uuidv4();
    this._name = name;
    this._password = password;
    this._maxPlayers = maxPlayers;
    this._packs = packs;
    this._players = [];
  }

  get currentGame() {
    let json = {};
    json.id = this._id;
    json.name = this._name;
    json.maxPlayers = this._maxPlayers;
    json.players = this._players;
    json.packs = this._packs;

    return json;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get password() {
    return this._password;
  }

  get maxPlayers() {
    return this._maxPlayers;
  }

  get packs() {
    return this._packs;
  }

  get players() {
    return this._players;
  }

  createPlayer(name) {
    if (name === "") {
      return false;
    }
    if (this._players.size === this._maxPlayers) {
      return false;
    }
    let player = new Player(name);
    this._players.push(player);

    return player.id;
  }

  getPlayer(playerID) {
    for (const player of this._players) {
      if (player._id === playerID) {
        return player;
      }
    }
    return false;
  }

}

module.exports = Game;
