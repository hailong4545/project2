const express = require('express');
const router = express.Router();

const homeController = require('../controller/home.controller')
const authController = require('../controller/auth.controller');

// router.use(authController);

router.get('/', authController, homeController.index);
router.get('/creat', authController, homeController.creat);
router.get('/history', authController, homeController.history);
router.get('/join-game', authController, homeController.joinGame)


module.exports = router;