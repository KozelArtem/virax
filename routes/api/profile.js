const router = require('express').Router();

const auth = require('../../middleware/auth');
const ctrl = require('../../controllers/profile');

const { requireAuth } = auth;

router.get('/profile', requireAuth, ctrl.get);
// router.post('/profile', ctrl.createOrUpdate);

module.exports = router;
