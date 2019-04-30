const router = require('express').Router();
const JweetController = require('../controllers/jweet.controller');
const jwt = require('../config/jwt.config');

router.post('/', jwt.authenticate, JweetController.postJweet);
router.get('/', JweetController.fetchJweets);
router.get('/my-jweets', jwt.authenticate, JweetController.myJweets);
router.get('/my-mentions', jwt.authenticate, JweetController.myMentions);

module.exports = router;