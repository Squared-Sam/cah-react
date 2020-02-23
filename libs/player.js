const uuidv4 = require('uuid/v4');


class Player {
	constructor(nickname) {
		this._id = uuidv4();
		this._nickname = nickname;
		this._score = score
	}
	get id() {
		return this._id;
	}
	get nickname() {
		return this._nickname;
	}
	get score() {
		return this._score;
	}
	set score(score) {
		this._score = score
	}
}

module.exports = Player