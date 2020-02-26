const express = require('express');
const router = express.Router();

const cards = require('../libs/db.js');

router.get('/white', async function (req, res, next) {
  let white_cards;
  try {
    white_cards = await cards.getAllWhiteCards();
    res.send(white_cards);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  }
});

router.get('/black', async function (req, res, next) {
  let black_cards;
  try {
    black_cards = await cards.getAllBlackCards();
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  };
  res.send(black_cards);

});

router.post('/white/pack', async function (req, res, next) {
  let pack = req.body.pack;

  if (pack == null) {
    res.status(500).send('Please specify a singular of pack in the format \"pack\":\' pack\'');
  }

  let white_cards;
  try {
    white_cards = await cards.getWhiteCardsByPack(pack);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  };
  res.send(white_cards);

});

router.post('/black/pack', async function (req, res, next) {
  let pack = req.body.pack;

  if (pack == null) {
    res.status(500).send('Please specify a singular of pack in the format \"pack\":\' pack\'');
  }
  let black_cards;
  try {
    black_cards = await cards.getBlackCardsByPack(pack);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  };
  res.send(black_cards);

});

router.post('/white/packs', async function (req, res, next) {
  let pack = req.body.packs;

  let array = [];
  for (item of pack) {
    array.push(item);
  }

  if (pack == null) {
    res.status(500).send('Please specify a array of packs in the format ["pack","pack2"]');
  }
  let white_cards;
  try {
    white_cards = await cards.getWhiteCardsByPacks(array);
    console.log(cards);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  };
  res.send(white_cards);

});

router.post('/black/packs', async function (req, res, next) {
  let pack = req.body.packs;

  let array = [];
  for (item of pack) {
    array.push(item);
  }

  if (pack == null) {
    res.status(500).send('Please specify a array of packs in the format ["pack","pack2"]');
  }
  let black_cards;
  try {
    black_cards = await cards.getBlackCardsByPacks(array);
  } catch (e) {
    console.error(e);
    res.status(500).send(e);
  };
  res.send(black_cards);

});

module.exports = router;