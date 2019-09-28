const router = require('express').Router();

const ctrl = require('../../controllers/profile');

router.get('/profile', ctrl.get);
// router.post('/profile', ctrl.createOrUpdate);

module.exports = router;
