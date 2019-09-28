const router = require('express').Router();

const ctrl = require('../../controllers/auth');

router.post('/login', ctrl.login);
router.post('/register', ctrl.register);

router.get('/roles', ctrl.getRoles);

router.get('/confirm', ctrl.confirm);

module.exports = router;
