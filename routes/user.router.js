const router = require('express').Router();
const jwt = require('../config/jwt.config');
const UserController = require('../controllers/user.controller');

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/:mention?', UserController.mention);
router.get('/check-username/:username', UserController.checkUsername);


module.exports = router;