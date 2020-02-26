const {
  Pool
} = require('pg');
const config = require('../config');
const escape = require('pg-escape');

console.log(config.db);
const pool = new Pool(config.db);

pool.on('error', (err, client) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

async function getAllWhiteCards() {
  const client = await pool.connect();
  try {
    const res = await client.query('SElECT * FROM white_cards');
    return await res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

async function getAllBlackCards() {
  const client = await pool.connect();
  try {
    const res = await client.query('SElECT * FROM black_cards');
    return await res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

async function getWhiteCardsByPack(pack) {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM white_cards where pack = (select id from packs where pack_name = $1)', [pack]);
    return await res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}
async function getWhiteCardsByPacks(pack) {
  const client = await pool.connect();
  try {
    const query = escape('SELECT * FROM white_cards where pack = ANY (select id from packs where pack_name in %L)', pack)
    const res = await client.query(query);
    return await res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}
async function getBlackCardsByPack(pack) {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM black_cards where pack = (select id from packs where pack_name = $1)', [pack]);
    return await res.rows;

  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}
async function getBlackCardsByPacks(pack) {
  const client = await pool.connect();
  try {
    const query = escape('SELECT * FROM white_cards where pack = ANY (select id from packs where pack_name in %L)', pack)
    const res = await client.query(query);
    return await res.rows;
  } catch (err) {
    console.error(err);
  } finally {
    client.release();
  }
}

module.exports = {
  getAllWhiteCards,
  getAllBlackCards,
  getWhiteCardsByPack,
  getWhiteCardsByPacks,
  getBlackCardsByPack,
  getBlackCardsByPacks
};