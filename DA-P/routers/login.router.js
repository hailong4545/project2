const express = require('express');
const router = express.Router();

const loginController = require('../controller/login.controller');
const homeController = require('../controller/home.controller')
const setCookie = require('../controller/setcookie.controller');

router.get('/login', loginController.login);
router.get('/register', loginController.register);
router.get('/introduce', homeController.introduce);
router.post('/set-cookie', setCookie);

module.exports = router;