const router = require('express').Router();

const auth = require('../../middleware/auth');

const ctrl = require('../../controllers/student');

const { requireAuth } = auth;

router.get('/:studentId', requireAuth, ctrl.get);

// router.get('/:studentId/vacancy');

// router.post('/:studentId/offer');

// router.get('/:studentId/offers');

module.exports = router;
