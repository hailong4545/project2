const express = require('express');
const router = express.Router();

const gameController = require('../controller/game.controller');

router.get('/game&code=:code', gameController)

module.exports = router;